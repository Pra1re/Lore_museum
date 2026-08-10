import cast from './assets/cast.webp'
import { Link } from 'react-router-dom'
import './Sections.css'

/*
 * Sections carry text only. Every background belongs to Backdrop, which is one
 * continuous environment behind the whole document, so nothing here cuts at a
 * boundary. Each section still gets its own --s for a local reveal.
 */

const SECTIONS = [
  {
    key: 'bridge',
    tone: 'dark',
    eyebrow: 'The Divide',
    title: 'The Bridge of\nProgress',
    body: [
      'One span of stone holds the whole arrangement together. Above it, a city that calls itself the future. Below it, the one paying for that future in fumes and shift work.',
      'Everyone crosses it. Almost nobody crosses it twice in the same direction.',
    ],
  },
  {
    key: 'hex',
    tone: 'dark',
    eyebrow: 'The Discovery',
    title: 'Hextech',
    body: [
      'Magic held still, fitted into a housing, and handed to anyone with the coin. It was meant to be the great equaliser, and for a few brilliant years it looked like one.',
      'The men who built it disagreed about what it was for. That argument is still the shape of both cities.',
    ],
  },
  {
    key: 'ascend',
    tone: 'light',
    eyebrow: 'The Cost',
    title: 'What It Asks\nIn Return',
    body: [
      'Every refinement demanded a little more, and each time the price seemed reasonable set against what was on offer.',
      'By the end nobody could point to the moment the trade stopped being worth it.',
    ],
  },
]

export default function Sections() {
  return (
    <main className="sections">
      {SECTIONS.map(({ key, tone, eyebrow, title, body }) => (
        <section className={`sec sec--${tone}`} data-parallax key={key}>
          <div className="sec__scrim" aria-hidden="true" />
          <div className="sec__content">
            <p className="sec__eyebrow" style={{ '--i': 0 }}>{eyebrow}</p>
            <h2 className="sec__title" style={{ '--i': 1 }}>
              {title.split('\n').map((l, i) => <span key={i}>{l}</span>)}
            </h2>
            {body.map((line, i) => (
              <p className="sec__body" key={i} style={{ '--i': 2 + i }}>{line}</p>
            ))}
            <a className="sec__link" href={`/${key}`} style={{ '--i': 4 }}>Open the file</a>
          </div>
        </section>
      ))}

      <footer className="outro" data-parallax>
        <img className="outro__art" src={cast} alt="" aria-hidden="true" />
        <div className="outro__scrim" aria-hidden="true" />
        <div className="outro__inner">
          <p className="outro__kicker">Ten regions. One archive.</p>
          <h2 className="outro__title">Keep reading</h2>
          <Link className="outro__link" to="/archive">Enter the archive</Link>
        </div>
      </footer>
    </main>
  )
}
