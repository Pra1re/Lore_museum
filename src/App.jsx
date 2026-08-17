import { Routes, Route } from 'react-router-dom'
import Landing from './Landing.jsx'
import Chapter from './Chapter.jsx'
import Backdrop from './Backdrop.jsx'
import Sections from './Sections.jsx'
import Archive from './Archive.jsx'
import GenericPage from './GenericPage.jsx'
import { RUNES } from './Runes.jsx'
import { useScrub } from './useScrub.js'
import { useGame } from './GameContext.jsx'
import { STAGE_VH } from './timeline.js'
import './App.css'

function Home() {
  useScrub()
  const { currentGame, game } = useGame()
  const isArcane = currentGame === 'arcane'

  return (
    <>
      {/* Arcane gets the full layered backdrop; other games get their own bg */}
      {isArcane ? (
        <Backdrop />
      ) : (
        <div className="backdrop backdrop--game" aria-hidden="true"
          style={{
            backgroundImage: `url(${game.bgImage})`,
            '--accent': game.accentColor
          }}
        >
          <div className="backdrop__vignette" />
          <div className="backdrop__grain" />
        </div>
      )}
      <div className="stage-space" style={{ height: `${STAGE_VH * 100}vh` }}>
        <div className="stage">
          <Landing />
          {/* Only Arcane gets the Jinx chapter wipe */}
          {isArcane && <Chapter />}
        </div>
      </div>
      <Sections />
    </>
  )
}

import ArcaneMap from './ArcaneMap.jsx'

function MapsRoute({ title, summary }) {
  const { currentGame } = useGame()
  if (currentGame === 'arcane') return <ArcaneMap />
  return <GenericPage title={title} summary={summary} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      {RUNES.filter(r => r.key !== 'home' && r.key !== 'archive').map((rune) => (
        <Route 
          key={rune.key} 
          path={rune.link} 
          element={
            rune.key === 'maps' 
              ? <MapsRoute title={rune.title} summary={rune.summary} />
              : <GenericPage title={rune.title} summary={rune.summary} />
          } 
        />
      ))}
    </Routes>
  )
}
