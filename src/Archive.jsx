import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGame } from './GameContext.jsx'
import { GAMES } from './gameData.js'
import './Archive.css'

export default function Archive() {
  const { currentGame, setCurrentGame } = useGame()
  const [archives, setArchives] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    setLoading(true)
    setSelectedRecord(null)
    fetch(`http://127.0.0.1:5000/api/archives/${currentGame}`)
      .then(res => res.json())
      .then(data => {
        setArchives(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch archives:', err)
        setLoading(false)
      })
  }, [currentGame])

  return (
    <div className="archive-page">
      <header className="archive-header">
        <Link to="/" className="back-link">&larr; Return to Museum</Link>
        <h1 className="archive-title">The Lore Archives</h1>
        <div className="game-filter">
          <label htmlFor="game-select">Filter by Realm:</label>
          <select
            id="game-select"
            value={currentGame}
            onChange={(e) => setCurrentGame(e.target.value)}
          >
            {Object.entries(GAMES).map(([key, g]) => (
              <option key={key} value={key}>{g.name}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="archive-content">
        {loading ? (
          <div className="archive-loading">Consulting the ancient texts...</div>
        ) : archives.length === 0 ? (
          <div className="archive-empty">No records found for this realm.</div>
        ) : (
          <>
            <div className="archive-grid">
              {archives.map((item, index) => (
                <div 
                  key={item._id || index} 
                  className={`archive-card ${selectedRecord?._id === item._id ? 'selected' : ''}`}
                  onClick={() => setSelectedRecord(item)}
                >
                  <h3 className="archive-card-title">{item.title}</h3>
                  <div className="archive-card-meta">
                    <span className="meta-type">{item.type || 'Document'}</span>
                    {item.author && <span className="meta-author">by {item.author}</span>}
                    {item.date && <span className="meta-date">{item.date}</span>}
                  </div>
                </div>
              ))}
            </div>

            {selectedRecord && (
              <div className="archive-console">
                <button 
                  className="console-close" 
                  onClick={() => setSelectedRecord(null)}
                  title="Close Terminal"
                >
                  X
                </button>
                <div className="console-line console-prompt">
                  <span className="prompt-arrow">&gt;</span>
                  <span className="prompt-text">DECRYPTING RECORD: {selectedRecord._id}...</span>
                </div>
                <div className="console-line console-header">
                  === {selectedRecord.title.toUpperCase()} ===
                </div>
                <div className="console-line console-meta">
                  AUTHOR: {selectedRecord.author || 'UNKNOWN'} | DATE: {selectedRecord.date || 'UNKNOWN'} | CLASSIFICATION: {selectedRecord.type}
                </div>
                <div className="console-line console-body">
                  {selectedRecord.content || '[NO DATA AVAILABLE FOR THIS RECORD]'}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
