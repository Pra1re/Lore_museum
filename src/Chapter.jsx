import jinx from './assets/jinx.png'
import './Chapter.css'

const BODY = [
  'Below Piltover\'s gleaming promenades, the air turns green and the law turns thin. Zaun was never built so much as accumulated, level upon level, each generation sealing the last one under its floor.',
  'What the undercity lacks in daylight it repays in invention. Chemtech bloomed here first, in back rooms and rented cellars, long before the academies upstairs agreed to give it a name.',
]

export default function Chapter() {
  return (
    <section className="chapter" aria-label="Chapter one, Zaun">
      {/* The wipe: a white sheet with a curved leading edge sweeps across, and
          the blue panel follows it in and settles on the right. The curve that
          sweeps past is the same curve that ends up dividing the page. */}
      <div className="sheet sheet--white" aria-hidden="true" />
      <div className="edge-bloom" aria-hidden="true" />
      <div className="sheet sheet--blue" aria-hidden="true">
        <span className="sheet__glow" />
      </div>

      {/* Sized to its native 422px so it stays sharp. To go larger, run the PNG
          through an upscaler, drop in jinx@2x.png and add:
          srcSet={`${jinx} 1x, ${jinx2x} 2x`} */}
      <img className="jinx" src={jinx} alt="Jinx, of Zaun" />

      <div className="chapter__content">
        <p className="chapter__eyebrow" style={{ '--i': 0 }}>Chapter One</p>
        <h2 className="chapter__title" style={{ '--i': 1 }}>The City<br />Beneath</h2>
        {BODY.map((line, i) => (
          <p className="chapter__body" key={i} style={{ '--i': 2 + i }}>{line}</p>
        ))}
        <a className="chapter__link" href="/zaun" style={{ '--i': 4 }}>Read the record</a>
      </div>
    </section>
  )
}
