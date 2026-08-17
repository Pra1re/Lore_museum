import { createContext, useContext, useState } from 'react'
import { GAMES, DEFAULT_GAME } from './gameData.js'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(DEFAULT_GAME)
  const game = GAMES[currentGame] || GAMES[DEFAULT_GAME]
  return (
    <GameContext.Provider value={{ currentGame, setCurrentGame, game }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}
