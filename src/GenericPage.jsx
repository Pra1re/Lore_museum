import { useGame } from './GameContext.jsx'
import { Link } from 'react-router-dom'
import './GenericPage.css'

export default function GenericPage({ title, summary }) {
  const { game } = useGame()
  const renderContent = () => {
    switch (title.toLowerCase()) {
      case 'about':
        return (
          <div className="page-content about-content">
            <p>The Lore Museum is a centralized repository dedicated to preserving the history, artifacts, and stories of countless realms. From the neon-lit streets of Zaun to the dying embers of Lordran, we archive the echoes of these worlds so they are never forgotten.</p>
            <p>Our archivists tirelessly venture across dimensions to gather primary sources, secure volatile artifacts, and translate forgotten texts. This museum is a neutral ground—a place where the past is respected, and the truth is preserved without bias.</p>
          </div>
        )
      case 'contact us':
        return (
          <div className="page-content contact-content">
            <p>Need to report an anomalous artifact or suggest a correction to our archives? Send a transmission to the curators.</p>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Designation / Name" className="contact-input" />
              <input type="email" placeholder="Comm-link / Email" className="contact-input" />
              <textarea placeholder="Your message..." rows="4" className="contact-input"></textarea>
              <button type="submit" className="contact-submit" style={{ borderColor: game.accentColor, color: game.accentColor }}>TRANSMIT</button>
            </form>
          </div>
        )
      case 'merch':
        return (
          <div className="page-content merch-content">
            <p>Procure physical manifestations of the realms. All proceeds fund the continued operations of the Archives.</p>
            <div className="merch-grid">
              <div className="merch-item"><div className="merch-placeholder" style={{borderColor: game.accentColor}}>Apparel</div><h3>Realm Wanderer Cloak</h3><p>50.00 Credits</p></div>
              <div className="merch-item"><div className="merch-placeholder" style={{borderColor: game.accentColor}}>Art Print</div><h3>Piltover Skyline Poster</h3><p>25.00 Credits</p></div>
              <div className="merch-item"><div className="merch-placeholder" style={{borderColor: game.accentColor}}>Artifact</div><h3>Replica Hextech Core</h3><p>120.00 Credits</p></div>
            </div>
          </div>
        )
      case 'gallery':
        return (
          <div className="page-content gallery-content">
            <p>Visual records of the realms. (Data streams currently syncing...)</p>
            <div className="gallery-grid">
              <div className="gallery-img" style={{backgroundImage: `url(${game.bgImage})`}}></div>
              <div className="gallery-img" style={{backgroundColor: 'rgba(255,255,255,0.05)'}}></div>
              <div className="gallery-img" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
            </div>
          </div>
        )
      case 'timeline':
        return (
          <div className="page-content timeline-content">
            <p>A sequential ordering of recorded events in this realm.</p>
            <ul className="timeline-list">
              <li><span style={{color: game.accentColor}}>Event Alpha:</span> The founding of the primary civilizations.</li>
              <li><span style={{color: game.accentColor}}>The Schism:</span> A major conflict that divided the populace.</li>
              <li><span style={{color: game.accentColor}}>Current Era:</span> The ongoing struggle for power and survival.</li>
            </ul>
          </div>
        )
      case 'characters':
        return (
          <div className="page-content characters-content">
            <p>Dossiers on key figures of historical significance.</p>
            <div className="characters-grid">
              <div className="character-card"><h4>The Architect</h4><p>Visionary creator who laid the foundation.</p></div>
              <div className="character-card"><h4>The Rebel</h4><p>Fought against the established order.</p></div>
              <div className="character-card"><h4>The Scholar</h4><p>Archived the truths others tried to hide.</p></div>
            </div>
          </div>
        )
      case 'community':
        return (
          <div className="page-content community-content">
            <p>Join the collective of archivists and share your own discoveries.</p>
            <div className="community-links">
              <button className="comm-btn" style={{backgroundColor: game.accentColor}}>Join Discord</button>
              <button className="comm-btn" style={{backgroundColor: game.accentColor}}>Visit Forums</button>
            </div>
          </div>
        )
      default:
        return <p className="generic-page__placeholder">The archivists are currently compiling records for this section. Please check back later.</p>
    }
  }

  return (
    <div className="generic-page" style={{ 
      backgroundImage: `url(${game.bgImage})`,
      '--accent': game.accentColor
    }}>
      <div className="generic-page__vignette" />
      <div className="generic-page__content">
        <Link to="/" className="generic-page__back">&larr; Back to Realms</Link>
        <h1 className="generic-page__title">{title}</h1>
        <p className="generic-page__summary">{summary}</p>
        <div className="generic-page__divider" style={{ backgroundColor: game.accentColor }} />
        {renderContent()}
      </div>
    </div>
  )
}
