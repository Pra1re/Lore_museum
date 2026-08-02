import bridgeFar from './assets/bridge-far.webp'
import bridgeNear from './assets/bridge-near.webp'
import bridgeJinx from './assets/bridge-jinx.webp'
import hex from './assets/hex.webp'
import ascendBg from './assets/ascend-bg.webp'
import ascendNear from './assets/ascend-near.webp'
import './Backdrop.css'

/*
 * One continuous environment behind the whole document.
 *
 * Chapters cross-dissolve on deliberately overlapping windows of --g (global
 * scroll progress, which never resets), so the outgoing chapter is still moving
 * while the incoming one arrives and motion never stops at a seam. --d is a
 * chapter's signed distance from its own centre: its local camera clock.
 *
 * Layers use 2D parallax via scale and translate3d based on --d.
 */

export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="bd bd--dawn" style={{ '--c': 0 }}>
        <div className="bd__sky" />
        <div className="bd__glow" />
      </div>

      {/*
        Jinx was matted out by hue (the only cool-toned thing in a crimson
        frame) and the plate behind her rebuilt. She stands against the bridge
        arch rather than open sky, so that patch is structured, not smooth. Her
        plate sits between the other two, which keeps her divergence from the
        far plate small enough to stay covered.
      */}
      <div className="bd bd--bridge" style={{ '--c': 0.36 }}>
        <img className="bd__far" src={bridgeFar} alt="" />
        <img className="bd__focal" src={bridgeJinx} alt="" />
        <img className="bd__near" src={bridgeNear} alt="" />
      </div>

      <div className="bd bd--hex" style={{ '--c': 0.66 }}>
        <img className="bd__far" src={hex} alt="" />
        <div className="bd__glow" />
      </div>

      <div className="bd bd--ascend" style={{ '--c': 0.95 }}>
        <img className="bd__far" src={ascendBg} alt="" />
        <img className="bd__near" src={ascendNear} alt="" />
        <div className="bd__glow" />
      </div>

      {/* Never cross-fades, so something in frame is always in motion carrying
          the eye from one chapter into the next. */}
      <div className="backdrop__motes" />
      <div className="backdrop__grain" />
      <div className="backdrop__vignette" />
    </div>
  )
}
