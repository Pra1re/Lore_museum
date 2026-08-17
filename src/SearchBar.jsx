import { useState, useRef } from 'react'
import { useGame } from './GameContext.jsx'
import { GAMES } from './gameData.js'
import './SearchBar.css'

export default function SearchBar() {
  const { game, setCurrentGame } = useGame()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [flash, setFlash] = useState(false)
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      const q = query.toLowerCase()
      // fuzzy match
      const matchedKey = Object.keys(GAMES).find(k => k.includes(q) || GAMES[k].name.toLowerCase().includes(q))
      
      if (matchedKey) {
        setCurrentGame(matchedKey)
        setQuery('')
        setFlash(true)
        setTimeout(() => setFlash(false), 500)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        inputRef.current?.blur()
      }
    }
  }

  return (
    <div className={`search-bar-container ${flash ? 'flash' : ''}`}>
      <input
        ref={inputRef}
        className="search-bar-input"
        type="text"
        placeholder="Search the realms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          boxShadow: isFocused ? `0 0 15px ${game.accentColor}, inset 0 0 5px ${game.accentColor}` : 'none',
          borderColor: isFocused ? game.accentColor : 'rgba(255, 255, 255, 0.15)'
        }}
      />
    </div>
  )
}
