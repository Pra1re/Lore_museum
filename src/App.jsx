import { Routes, Route } from 'react-router-dom'
import Landing from './Landing.jsx'
import Chapter from './Chapter.jsx'
import Backdrop from './Backdrop.jsx'
import Sections from './Sections.jsx'
import Archive from './Archive.jsx'
import { useScrub } from './useScrub.js'
import { STAGE_VH } from './timeline.js'
import './App.css'

function Home() {
  useScrub()

  return (
    <>
      <Backdrop />
      <div className="stage-space" style={{ height: `${STAGE_VH * 100}vh` }}>
        <div className="stage">
          <Landing />
          <Chapter />
        </div>
      </div>
      <Sections />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  )
}
