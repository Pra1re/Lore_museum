import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGame } from './GameContext.jsx'
import cast from './assets/cast.webp'
import valFooterBg from './assets/enter_archive_section_bg_for_valorant.jpg'
import './Sections.css'

export default function Sections() {
  const { currentGame, game } = useGame()
  const [activeSection, setActiveSection] = useState(null)
  const [loreText, setLoreText] = useState('')
  const [loreTitle, setLoreTitle] = useState('')
  const [isClosing, setIsClosing] = useState(false)

  const openLore = (e, section) => {
    e.preventDefault()
    setActiveSection(section.key)
    setLoreTitle(section.title.replace('\\n', ' '))
    setIsClosing(false)
    setLoreText('Loading archives...')
    fetch(`http://127.0.0.1:5000/api/lore/${currentGame}/${section.key}`)
      .then(res => res.json())
      .then(data => setLoreText(data.fullStory || data.content || data.story || 'No records found.'))
      .catch(() => setLoreText('The archives are currently unreachable.'))
  }

  const closeLore = () => {
    setIsClosing(true)
    setTimeout(() => {
      setActiveSection(null)
      setLoreText('')
      setLoreTitle('')
      setIsClosing(false)
    }, 600)
  }

  // Determine footer image based on game
  const footerImage = currentGame === 'valorant' ? valFooterBg : cast;

  return (
    <main className="sections" style={{ '--accent': game.accentColor }}>
      {game.sections.map(({ key, tone, align, bgImage, eyebrow, title, body, linkText }, idx) => (
        <section
          className={`sec sec--${tone || 'dark'} ${align ? `sec--align-${align}` : ''}`}
          data-parallax
          key={`${currentGame}-${key}`}
        >
          {bgImage && (
            <img className="sec__bg" src={bgImage} alt="" aria-hidden="true" />
          )}
          <div className="sec__scrim" aria-hidden="true" />
          <div className="sec__content">
            <p className="sec__eyebrow" style={{ '--i': 0, color: game.accentColor }}>
              {eyebrow}
            </p>
            <h2 className="sec__title" style={{ '--i': 1 }}>
              {title.split('\n').map((l, i) => <span key={i}>{l}</span>)}
            </h2>
            {Array.isArray(body) ? body.map((line, i) => (
              <p className="sec__body" key={i} style={{ '--i': 2 + i }}>{line}</p>
            )) : (
              <p className="sec__body" style={{ '--i': 2 }}>{body}</p>
            )}
            <button
              className="sec__link"
              style={{ '--i': 4, color: game.accentColor }}
              onClick={(e) => openLore(e, { key, title })}
            >
              {linkText || 'Open the file'}
            </button>
          </div>
        </section>
      ))}

      <footer className="outro" data-parallax>
        <img className="outro__art" src={footerImage} alt="" aria-hidden="true" />
        <div className="outro__scrim" aria-hidden="true" />
        <div className="outro__inner">
          <p className="outro__kicker">All worlds. One archive.</p>
          <h2 className="outro__title">Keep reading</h2>
          <Link className="outro__link" to="/archive">Enter the archive</Link>
        </div>
      </footer>

      {activeSection && (
        <div className="lore-modal-overlay" onClick={closeLore}>
          <div
            className={`lore-modal ${isClosing ? 'lore-modal-close' : 'lore-modal-open'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="lore-modal-content">
              <button className="lore-modal-close-btn" onClick={closeLore}>&times;</button>
              <h2 className="lore-modal-title">{loreTitle}</h2>
              <div className="lore-modal-text">
                {loreText.split('\n').map((para, i) => (
                  para.trim() ? <p key={i}>{para}</p> : null
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
