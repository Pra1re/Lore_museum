import Landing from './Landing.jsx'
import Chapter from './Chapter.jsx'
import Backdrop from './Backdrop.jsx'
import Sections from './Sections.jsx'
import { useScrub } from './useScrub.js'
import { STAGE_VH } from './timeline.js'
import './App.css'

export default function App() {
  useScrub()

  return (
    <>
      {/* Fixed, behind everything, spanning the whole document. */}
      <Backdrop />

      {/*
        The spacer gives the wipe somewhere to happen. The stage is sticky, so it
        holds still while that scroll is consumed and then releases into the rest
        of the document on its own. No scroll locking, no handoff to get wrong.
      */}
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
