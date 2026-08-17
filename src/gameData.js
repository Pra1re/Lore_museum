import arcaneBg from './assets/bg_wide.jpg';
import valorantBg from './assets/valorant_bg.jpg';
import darkSoulsBg from './assets/dark_souls_bg.jpg';
import eldenRingBg from './assets/elden_ring_bg.jpg';
import godOfWarBg from './assets/god_of_war_bg.jpg';
import hollowKnightBg from './assets/hollow_knight_bg.jpg';

// Section backgrounds
import valorant1 from './assets/valorant_1.jpg';
import valorant2 from './assets/valorant_2.jpg';
import valorant3 from './assets/valorant_3.jpg';

const navSymbols = [
  'Home', 'Lore Archive', 'About', 'Merch', 'Contact Us', 'Gallery', 'Timeline', 'Characters', 'Maps', 'Community'
];

export const GAMES = {
  'arcane': {
    id: 'arcane',
    name: 'Arcane',
    quote: 'Magic is not a tool to be controlled, but a force to be understood. The past whispers its secrets to those willing to listen.',
    quoteAuthor: 'Heimerdinger',
    bgImage: arcaneBg,
    accentColor: '#b026ff',
    navSymbols: navSymbols,
    sections: [
      {
        key: 'arcane-bridge',
        tone: 'dark',
        align: 'left',
        eyebrow: 'The Divide',
        title: 'The Bridge of\nProgress',
        body: [
          "The Bridge of Progress stands as the physical and ideological divide between the shining city of Piltover and the undercity of Zaun. A marvel of engineering, it represents both the heights of human ingenuity and the crushing weight of inequality.",
          "For the people of Piltover, it is a monument to their forward march. For the trenchers of Zaun, it is a constant reminder of the sky they are denied. Enforcers patrol its span, ensuring that the grime of the lower levels never stains the pristine streets above."
        ],
        linkText: 'Read More'
      },
      {
        key: 'arcane-hextech',
        tone: 'light',
        align: 'right',
        eyebrow: 'The Discovery',
        title: 'Hextech',
        body: [
          "Born from the collision of magic and science, Hextech revolutionized Piltover. Discovered by Jayce Talis and Viktor, these shimmering blue crystals channel arcane energy into usable, controlled power. It was heralded as the dawn of a new era.",
          "From hexgates that span the globe to simple automated tools, the technology reshaped the world's economy. Yet, tampering with arcane forces is never without risk, and the unchecked pursuit of progress threatens to unravel the very fabric of society."
        ],
        linkText: 'Read More'
      },
      {
        key: 'arcane-cost',
        tone: 'dark',
        align: 'left',
        eyebrow: 'The Cost',
        title: 'What It Asks\nIn Return',
        body: [
          "The proliferation of Hextech above was mirrored by the rise of Shimmer below. As Piltover grew wealthier, Zaun grew more desperate. The chemical augmentations of the undercity were a crude, violent reflection of the clean magic of the topside.",
          "Every advancement carried a hidden price. Friendships shattered, families were torn apart, and the blood spilled on the cobblestones proved that true power always exacts a heavy toll from those least able to pay it."
        ],
        linkText: 'Read More'
      }
    ]
  },
  'valorant': {
    id: 'valorant',
    name: 'Valorant',
    quote: 'In every life, there is a line you cross that changes everything. For us, that line is drawn in radianite.',
    quoteAuthor: 'Brimstone',
    bgImage: valorantBg,
    accentColor: '#ff4655',
    navSymbols: navSymbols,
    sections: [
      {
        key: 'valorant-first-light',
        tone: 'dark',
        align: 'left',
        bgImage: valorant1,
        eyebrow: 'First Light',
        title: 'The Radianite\nAwakening',
        body: [
          "The event known as First Light changed Earth forever. Unprecedented global phenomena shifted the very laws of physics and introduced a mysterious new resource: Radianite. The world scrambled to understand and control this impossible substance.",
          "In the wake of First Light, certain individuals began to manifest extraordinary abilities. These 'Radiants' were feared, worshipped, and hunted. As governments fractured and corporations vied for power, the true potential of Radianite remained dangerously untapped."
        ],
        linkText: 'Read More'
      },
      {
        key: 'valorant-protocol',
        tone: 'dark',
        align: 'right',
        bgImage: valorant2,
        eyebrow: 'Protocol',
        title: 'VALORANT\nProtocol',
        body: [
          "Founded in secret to combat existential threats, the VALORANT Protocol gathered the world's most capable fighters, both Radiant and human alike. Operating above the jurisdiction of any single nation, they serve as Earth's first and last line of defense.",
          "Led by Brimstone and founded by a shadowy benefactor, the agents of VALORANT utilize cutting-edge technology and supernatural abilities. Their missions are classified, their existence a rumor, but their impact on the world's survival is absolute."
        ],
        linkText: 'Read More'
      },
      {
        key: 'valorant-mirror',
        tone: 'dark',
        align: 'center',
        bgImage: valorant3,
        eyebrow: 'The Mirror',
        title: 'Earth-2 and\nThe Rift',
        body: [
          "The greatest threat to Earth didn't come from the stars, but from the mirror. Earth-2, an alternate dimension facing a catastrophic Radianite crisis, began sending their own agents across the dimensional rift to steal our resources.",
          "These 'mirror agents' look like us, fight like us, but are driven by the desperate survival of their own world. The secret war fought across these rifts is a battle for the very future of both planets, where victory means someone else's apocalypse."
        ],
        linkText: 'Read More'
      }
    ]
  },
  'dark-souls': {
    id: 'dark-souls',
    name: 'Dark Souls',
    quote: 'In this land of Undead, the weights of past sins drag the living into the dark. Only fire can reveal what lurks within.',
    quoteAuthor: 'Firekeeper',
    bgImage: darkSoulsBg,
    accentColor: '#d4a03c',
    navSymbols: navSymbols,
    sections: [
      {
        key: 'ds-fire',
        tone: 'light',
        align: 'right',
        eyebrow: 'The Age of Fire',
        title: 'The First\nFlame',
        body: [
          "In the Age of Ancients, the world was unformed, shrouded by fog. But then there was Fire, and with Fire came disparity. Heat and cold, life and death, and of course, Light and Dark. From the dark, they came, and found the Souls of Lords within the flame.",
          "Gwyn, the Lord of Sunlight, challenged the Everlasting Dragons alongside the other Lords. They claimed victory and ushered in the Age of Fire. But flames will fade, and only Dark will remain. Now, the First Flame dwindles, and the world is plunged into twilight."
        ],
        linkText: 'Read More'
      },
      {
        key: 'ds-undead',
        tone: 'dark',
        eyebrow: 'The Undead Curse',
        title: 'Hollowing\nand the Darksign',
        body: [
          "As the fire fades, the Darksign appears on the flesh of the living. Those branded by it are cursed with undeath. They cannot die, but instead lose their memories and their sanity with each revival, eventually becoming mindless Hollows.",
          "The undead are corralled and led to the north, locked away in the Undead Asylum to await the end of the world. It is said that a Chosen Undead will eventually escape this fate, make a pilgrimage to Lordran, and ring the Bells of Awakening."
        ],
        linkText: 'Read More'
      },
      {
        key: 'ds-abyss',
        tone: 'dark',
        eyebrow: 'The Abyss',
        title: 'Manus and\nthe Dark',
        body: [
          "Deep beneath Oolacile lies the Abyss, a primordial darkness born from corrupted humanity. It was awakened by the toothy serpent Kaathe, who urged the citizens to unearth the grave of Primeval Man, Manus.",
          "Manus, Father of the Abyss, was twisted by his own humanity going wild. The Abyss spread, consuming Oolacile and mutating its inhabitants. Knight Artorias traversed the Abyss to stop it, but even he fell to the encroaching dark."
        ],
        linkText: 'Read More'
      }
    ]
  },
  'elden-ring': {
    id: 'elden-ring',
    name: 'Elden Ring',
    quote: 'Rise, Tarnished. The Elden Ring has been shattered. Its fragments reside within the demigods — and you must claim them.',
    quoteAuthor: 'Melina',
    bgImage: eldenRingBg,
    accentColor: '#c8a83e',
    navSymbols: navSymbols,
    sections: [
      {
        key: 'er-shattering',
        tone: 'dark',
        align: 'center',
        eyebrow: 'The Shattering',
        title: 'The Elden\nRing',
        body: [
          "The Elden Ring was the source of the Erdtree's golden grace and the foundation of the Golden Order. For an age, Queen Marika the Eternal ruled over the Lands Between, until the Night of the Black Knives, when Godwyn the Golden was slain.",
          "Driven to the brink, Marika shattered the Elden Ring. In her absence, her offspring, demigods all, claimed the shards of the Ring known as the Great Runes. The mad taint of their newfound strength triggered a war that meant abandonment by the Greater Will."
        ],
        linkText: 'Read More'
      },
      {
        key: 'er-demigods',
        tone: 'dark',
        eyebrow: 'Demigods',
        title: 'The Children\nof Marika',
        body: [
          "The war of the Shattering devastated the Lands Between. Malenia, Blade of Miquella, and General Radahn clashed in Caelid, ending in a stalemate that unleashed the Scarlet Rot. Morgott the Omen King fiercely defended the capital of Leyndell.",
          "Each demigod retreated to their domain, corrupted by the power of their Great Runes. Now, they wait in their ruined strongholds, holding onto fragments of a broken world, defying the inevitable return of the Tarnished."
        ],
        linkText: 'Read More'
      },
      {
        key: 'er-erdtree',
        tone: 'light',
        eyebrow: 'The Erdtree',
        title: 'Golden Order\nand Beyond',
        body: [
          "The Erdtree's glowing branches stretch across the sky, a towering monument to the Greater Will's influence. It bestows its blessings upon those deemed worthy, while shunning those who exist outside the Golden Order, like the Omen and the Misbegotten.",
          "But the Erdtree is not the only power in the Lands Between. Outer Gods vie for influence in the shadows—the Frenzied Flame, the Formless Mother, the dark moon. The fate of the world hinges on which order a new Elden Lord will establish."
        ],
        linkText: 'Read More'
      }
    ]
  },
  'god-of-war': {
    id: 'god-of-war',
    name: 'God of War',
    quote: 'The cycle ends here. We must be better than this. Close your heart to their desperation. Close your heart to their suffering.',
    quoteAuthor: 'Kratos',
    bgImage: godOfWarBg,
    accentColor: '#5ba3c9',
    navSymbols: navSymbols,
    sections: [
      {
        key: 'gow-journey',
        tone: 'light',
        align: 'left',
        eyebrow: 'A New Beginning',
        title: 'The Journey\nNorth',
        body: [
          "Many years after his vengeance against the Gods of Olympus, Kratos lives as a man in the realm of Norse Gods and monsters. After the death of his wife Faye, Kratos and his son Atreus must fulfill her final wish: to spread her ashes at the highest peak in all the realms.",
          "This deeply personal journey forces Kratos to confront the monstrous past he thought he had left behind. He must master his rage and teach his son to survive in a harsh, unforgiving world filled with Draugr, Trolls, and vengeful Aesir gods."
        ],
        linkText: 'Read More'
      },
      {
        key: 'gow-ragnarok',
        tone: 'dark',
        eyebrow: 'Ragnarök',
        title: 'The Twilight\nof the Gods',
        body: [
          "Fimbulwinter has arrived, signaling the fast approach of Ragnarök, the prophesied end of the Norse world. As the biting cold grips Midgard, Kratos and Atreus find themselves entangled in the machinations of Odin and the wrath of Freya.",
          "The realms prepare for a war that will tear Yggdrasil apart. Atreus, seeking to understand his identity as Loki, searches for the lost giant Tyr. Kratos, determined to protect his son, must decide whether to be bound by prophecy or forge a new destiny."
        ],
        linkText: 'Read More'
      },
      {
        key: 'gow-legacy',
        tone: 'dark',
        eyebrow: 'Legacy',
        title: 'Father\nand Son',
        body: [
          "The true conflict lies not just with the Aesir, but within the bond between father and son. Kratos struggles with the fear that his violent legacy will be inherited by Atreus. He hides his past, inadvertently pushing his son toward the very hubris he fears.",
          "Through trials and bloodshed, their relationship is tested. They must learn to trust one another, and Kratos must accept that he cannot shield Atreus from the harsh realities of godhood. They are stronger together, forging a new path forward."
        ],
        linkText: 'Read More'
      }
    ]
  },
  'hollow-knight': {
    id: 'hollow-knight',
    name: 'Hollow Knight',
    quote: 'An ancient kingdom lies beneath the fading town of Dirtmouth. It calls to those with courage enough to descend into its depths.',
    quoteAuthor: 'Elderbug',
    bgImage: hollowKnightBg,
    accentColor: '#4ecdc4',
    navSymbols: navSymbols,
    sections: [
      {
        key: 'hk-infection',
        tone: 'dark',
        eyebrow: 'The Infection',
        title: 'The Radiance\nReturns',
        body: [
          "A sickly orange glow permeates the caverns of Hallownest. This is the Infection, a plague of the mind brought about by the return of the Radiance, a forgotten moth goddess of light. It robbed the bugs of their free will, driving them into a mindless, violent frenzy.",
          "The Pale King, ruler of Hallownest, attempted to seal the Infection away, but his efforts were ultimately in vain. Now, the ruins of his once-great kingdom are overrun by husks of former citizens, their eyes glowing with the blinding light of their unseen master."
        ],
        linkText: 'Read More'
      },
      {
        key: 'hk-vessels',
        tone: 'dark',
        eyebrow: 'The Vessels',
        title: 'Sealed Away\nin Darkness',
        body: [
          "To combat the Radiance, the Pale King utilized the Void, an abyssal substance found deep beneath the kingdom. He created the Vessels, beings born of god and void, devoid of a mind to think or a will to break. They were meant to contain the Infection entirely.",
          "The 'purest' of these was chosen as the Hollow Knight and sealed inside the Black Egg Temple. Yet, the plan failed. The Hollow Knight was not entirely hollow, and the Infection seeped out. Now, another Vessel wanders the wastes, returning to finish the task."
        ],
        linkText: 'Read More'
      },
      {
        key: 'hk-hallownest',
        tone: 'light',
        eyebrow: 'Hallownest',
        title: 'A Kingdom\nForgotten',
        body: [
          "Hallownest was once the eternal kingdom, a sprawling labyrinth of distinct ecologies and civilizations. From the lush greenery of Greenpath to the mournful rain of the City of Tears, it was a marvel of the insectoid world, unified under the Pale King.",
          "Today, it is a vast tomb. Explorers and scavengers brave its depths for geo and ancient relics, but few return. Its history is scattered on ancient lore tablets, its secrets hidden behind locked gates, waiting for a silent wanderer to uncover the truth."
        ],
        linkText: 'Read More'
      }
    ]
  }
};

export const DEFAULT_GAME = 'arcane';
