import { useState } from 'react'
import { RUNES } from './Runes.jsx'
import layerBg from './assets/layer-bg.webp'
import layerFigure from './assets/layer-figure.webp'
import layerFore from './assets/layer-fore.webp'
import './Landing.css'

// Scatter direction per rune, fixed so the drift is deterministic across renders.
const SCATTER = [
  [-1.4, -0.6], [-0.8, 0.9], [-1.9, 0.3], [-1.1, -1.0], [-0.6, 0.7],
  [-1.6, 0.5], [-1.0, -0.8], [-2.1, -0.2], [-0.7, 1.1], [-1.3, 0.4],
]

export default function Landing() {
  const [lore, setLore] = useState(null)

  return (
    <div className="landing">
      {/* Three plates cut from the original artwork. They move at different
          rates, which is what reads as depth. */}
      <img className="layer layer--bg" src={layerBg} alt="" aria-hidden="true" />
      <img className="layer layer--figure" src={layerFigure} alt="" aria-hidden="true" />
      <img className="layer layer--fore" src={layerFore} alt="" aria-hidden="true" />

      <div className="landing__grade" aria-hidden="true" />

      <div className="runes" aria-hidden={false}>
        {RUNES.map((rune, i) => {
          const { Glyph } = rune
          return (
            <button
              key={rune.key}
              type="button"
              className="rune"
              style={{ '--sx': SCATTER[i][0], '--sy': SCATTER[i][1] }}
              aria-label={`Open lore for ${rune.title}`}
              onClick={() => setLore(rune)}
            >
              <Glyph />
            </button>
          )
        })}
      </div>

      <div className="quote-section">
        <p className="quote-text">
          "Magic is not a tool to be controlled, but a force to be understood.
          The past whispers its secrets to those willing to listen."
        </p>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint__label">Scroll or swipe right</span>
        <span className="scroll-hint__rail"><i /></span>
      </div>

      {lore && (
        <div className="scroll-overlay" onClick={() => setLore(null)}>
          <div className="scroll-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="scroll-content">
              <button
                type="button"
                className="close-btn"
                aria-label="Close"
                onClick={() => setLore(null)}
              >
                &times;
              </button>
              <h3>{lore.title}</h3>
              <p>{lore.summary}</p>
              <a className="scroll-link" href={lore.link}>Venture Forth</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
