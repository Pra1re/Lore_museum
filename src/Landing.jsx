import { useState, useEffect } from 'react'
import { RUNES } from './Runes.jsx'
import SearchBar from './SearchBar.jsx'
import { useGame } from './GameContext.jsx'
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
  const { currentGame, game } = useGame()

  // Arcane uses the original 3-layer parallax; other games use a single bg
  const isArcane = currentGame === 'arcane'

  return (
    <div className="landing">
      <SearchBar />

      {isArcane ? (
        <>
          {/* Original 3-layer parallax for Arcane */}
          <img className="layer layer--bg" src={layerBg} alt="" aria-hidden="true" />
          <img className="layer layer--figure" src={layerFigure} alt="" aria-hidden="true" />
          <img className="layer layer--fore" src={layerFore} alt="" aria-hidden="true" />
        </>
      ) : (
        /* Single background for other games with crossfade */
        <div
          className="landing__bg-single"
          style={{ backgroundImage: `url(${game.bgImage})` }}
          aria-hidden="true"
        />
      )}

      <div className="landing__grade" aria-hidden="true" />

      {isArcane ? (
        /* Original scattered rune positions for Arcane */
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
      ) : (
        /* Arc/grid layout for other games */
        <div className="runes runes--arc" aria-hidden={false}>
          {RUNES.map((rune) => {
            const { Glyph } = rune
            return (
              <button
                key={rune.key}
                type="button"
                className="rune rune--arc-item"
                aria-label={`Open link for ${rune.title}`}
                onClick={() => setLore(rune)}
              >
                <Glyph />
              </button>
            )
          })}
        </div>
      )}

      {isArcane ? (
        <div className="quote-section">
          <p className="quote-text">
            {game.quote}
          </p>
        </div>
      ) : (
        <div className="game-hero">
          <h1 className="game-hero__title" style={{
            textShadow: `0 4px 25px ${game.accentColor}66`,
            '--accent': game.accentColor
          }}>
            {game.name}
          </h1>
          <p className="game-hero__quote" style={{ color: game.accentColor }}>
            "{game.quote}"
          </p>
          <button 
            className="game-hero__btn" 
            style={{ 
              backgroundColor: game.accentColor,
              boxShadow: `0 4px 15px ${game.accentColor}44`
            }}
            onClick={() => {
              const el = document.querySelector('.sections');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            EXPLORE LORE
          </button>
        </div>
      )}

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
