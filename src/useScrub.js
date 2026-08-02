import { useEffect } from 'react'
import { WIPE_VH, STAGE_VH } from './timeline.js'

/*
 * Drives the scroll timeline.
 *
 * Progress is derived from window.scrollY, not from intercepted input. So the
 * site rides on native scrolling: momentum, trackpads, touch, the scrollbar and
 * keyboard paging all work for free, reversing is automatic, and there is no
 * scroll lock to get stuck in. Swipe-right and the arrow keys are mapped onto
 * the same scroll position so every input agrees.
 *
 * scrollY is smoothed once with a spring and everything is derived from the
 * smoothed figure, so no two values can disagree by a frame. The smoothing
 * exists because a mouse wheel arrives in ~100px jumps and stepping straight
 * from raw scrollY looks notchy.
 *
 * Published as CSS custom properties, so animating them costs no React renders
 * and every consumer animates transform/opacity only.
 *   on <html>:  --p wipe progress · --v speed · --bloom wipe-edge light
 *               --enter, --jinx  eased arrivals for the chapter
 *   per section: --s  progress through the viewport, 0 when centred
 */

const clamp01 = (n) => Math.min(1, Math.max(0, n))
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// slight overshoot, so the incoming panel settles rather than stopping dead
const BACK = 1.70158
const easeOutBack = (t) =>
  1 + (BACK + 1) * Math.pow(t - 1, 3) + BACK * Math.pow(t - 1, 2)

const SMOOTH = 0.14          // spring follow factor per frame
const KEY_RATE = 1500        // px/sec while an arrow key is held
const WHEEL_X_GAIN = 1.6     // horizontal wheel is coarser than vertical
const TOUCH_X_GAIN = 1.4

export function useScrub() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const held = new Set()
    let y = window.scrollY
    let prev = y
    let last = performance.now()
    let phase = ''
    let raf = 0

    // Camera look. Smoothed hard, because raw pointer deltas are jittery and a
    // 3D scene magnifies that jitter across its depth range.
    let mx = 0
    let my = 0
    let tmx = 0
    let tmy = 0
    let pointerFine = window.matchMedia('(pointer: fine)').matches

    /*
     * Section geometry is measured up front and on resize rather than read every
     * frame. getBoundingClientRect in a rAF loop forces a synchronous layout on
     * every section, every frame, which is exactly the thing that makes
     * scroll-linked animation janky.
     */
    let sections = []
    let gStart = 0
    let gEnd = 1
    const measure = () => {
      sections = [...document.querySelectorAll('[data-parallax]')].map((el) => {
        const r = el.getBoundingClientRect()
        return { el, mid: r.top + window.scrollY + r.height / 2 }
      })
      // --g spans from the moment the stage starts scrolling away to the bottom
      // of the document, so the backdrop's journey is one unbroken run.
      gStart = (STAGE_VH - 1) * window.innerHeight
      gEnd = Math.max(gStart + 1, document.body.scrollHeight - window.innerHeight)
    }

    const frame = (now) => {
      const dt = Math.min(64, now - last) / 1000
      last = now

      // held arrow keys feed the same scroll position as the wheel
      let dir = 0
      if (held.has('ArrowRight')) dir += 1
      if (held.has('ArrowLeft')) dir -= 1
      if (dir !== 0) window.scrollBy(0, dir * KEY_RATE * dt)

      const vh = window.innerHeight
      const target = window.scrollY
      y = reduced ? target : y + (target - y) * SMOOTH
      if (Math.abs(target - y) < 0.3) y = target

      const p = clamp01(y / (WIPE_VH * vh))
      const v = Math.min(1, (Math.abs(y - prev) / vh) * 14)
      prev = y

      root.style.setProperty('--p', p.toFixed(4))
      root.style.setProperty('--v', v.toFixed(4))
      root.style.setProperty('--bloom', (1 - Math.abs(p - 0.5) * 2).toFixed(4))
      root.style.setProperty('--enter', easeOutCubic(clamp01((p - 0.5) / 0.42)).toFixed(4))
      root.style.setProperty('--jinx', easeOutBack(clamp01((p - 0.44) / 0.5)).toFixed(4))

      root.style.setProperty('--g', clamp01((y - gStart) / (gEnd - gStart)).toFixed(4))

      if (pointerFine && !reduced) {
        mx += (tmx - mx) * 0.06
        my += (tmy - my) * 0.06
        root.style.setProperty('--mx', mx.toFixed(4))
        root.style.setProperty('--my', my.toFixed(4))
      }

      const centre = y + vh / 2
      for (const s of sections) {
        s.el.style.setProperty('--s', ((centre - s.mid) / vh).toFixed(4))
      }

      const next = p > 0.9 ? 'chapter' : 'landing'
      if (next !== phase) {
        phase = next
        root.dataset.phase = next
      }

      raf = requestAnimationFrame(frame)
    }

    // trackpad swipe-right / tilt wheel -> forward
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        window.scrollBy(0, e.deltaX * WHEEL_X_GAIN)
      }
    }

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        held.add(e.key)
      }
    }
    const onKeyUp = (e) => held.delete(e.key)
    const onBlur = () => held.clear()

    let tx = 0
    let ty = 0
    const onTouchStart = (e) => {
      tx = e.touches[0].clientX
      ty = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      const dx = tx - e.touches[0].clientX
      const dy = ty - e.touches[0].clientY
      // only claim horizontal-dominant swipes, so vertical touch stays native
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault()
        window.scrollBy(0, dx * TOUCH_X_GAIN)
        tx = e.touches[0].clientX
        ty = e.touches[0].clientY
      }
    }

    const onPointerMove = (e) => {
      tmx = (e.clientX / window.innerWidth) * 2 - 1
      tmy = (e.clientY / window.innerHeight) * 2 - 1
    }
    // a touch drag should not leave the camera stuck off-axis
    const onPointerLeave = () => { tmx = 0; tmy = 0 }

    measure()
    const onResize = () => {
      pointerFine = window.matchMedia('(pointer: fine)').matches
      measure()
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onResize)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])
}
