// Floating rune glyphs and the region lore they open.

const Rune1 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 20 20 L 80 20 L 40 50 L 80 80 L 20 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
  </svg>
)

const Rune2 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 30 20 L 70 80 M 70 20 L 30 80 M 50 10 L 50 90" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
  </svg>
)

const Rune3 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 20 80 L 20 30 C 20 10, 80 10, 80 30 L 80 80 M 40 40 L 60 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
  </svg>
)

const Rune4 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 50 20 A 30 30 0 1 0 50 80 A 30 30 0 1 0 50 20 M 50 20 L 50 80 M 20 50 L 80 50" fill="none" stroke="currentColor" strokeWidth="6" />
  </svg>
)

const Rune5 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 20 50 L 50 20 L 80 50 L 50 80 Z M 35 50 L 65 50 M 50 35 L 50 65" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
  </svg>
)

const Rune6 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 50 15 L 85 85 L 15 85 Z M 50 15 L 50 85" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
  </svg>
)

const Rune7 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z M 35 50 L 65 50 M 50 35 L 50 65" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
  </svg>
)

const Rune8 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 15 50 Q 50 15 85 50 Q 50 85 15 50 Z M 50 50 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0" fill="none" stroke="currentColor" strokeWidth="6" />
  </svg>
)

const Rune9 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 30 15 L 15 55 L 55 55 L 35 85 L 85 45 L 45 45 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
  </svg>
)

const Rune10 = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 M 20 20 L 80 80" fill="none" stroke="currentColor" strokeWidth="8" />
  </svg>
)

export const RUNES = [
  { Glyph: Rune1, key: 'home', title: 'Home', summary: 'Return to the front gate of the museum.', link: '/' },
  { Glyph: Rune2, key: 'archive', title: 'Lore Archive', summary: 'Browse the collected records, dossiers, and classified documents.', link: '/archive' },
  { Glyph: Rune3, key: 'about', title: 'About', summary: 'The story behind the Lore Museum and its keepers.', link: '/about' },
  { Glyph: Rune4, key: 'merch', title: 'Merch', summary: 'Artifacts and relics available for acquisition.', link: '/merch' },
  { Glyph: Rune5, key: 'contact', title: 'Contact Us', summary: 'Send a message through the ether to the archivists.', link: '/contact' },
  { Glyph: Rune6, key: 'gallery', title: 'Gallery', summary: 'Visual records from across the realms and dimensions.', link: '/gallery' },
  { Glyph: Rune7, key: 'timeline', title: 'Timeline', summary: 'A chronological record of events across all worlds.', link: '/timeline' },
  { Glyph: Rune8, key: 'characters', title: 'Characters', summary: 'Dossiers on the heroes, villains, and legends who shaped history.', link: '/characters' },
  { Glyph: Rune9, key: 'maps', title: 'Maps', summary: 'Cartographic records of every known realm and territory.', link: '/maps' },
  { Glyph: Rune10, key: 'community', title: 'Community', summary: 'Join fellow lorekeepers and share your discoveries.', link: '/community' },
]
