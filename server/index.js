const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let client = null;
if (process.env.DB_USER && process.env.DB_PASS) {
  const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@cluster0.krow6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
}

const DUMMY_ARCHIVES = [
  // Arcane
  { _id: '1', game: 'arcane', title: 'The Fall of Shurima', author: 'Nasus', date: '2023-10-12', type: 'Historical Record' },
  { _id: '2', game: 'arcane', title: 'Hextech Field Notes', author: 'Jayce Talis', date: '2023-11-05', type: 'Research' },
  { _id: '3', game: 'arcane', title: 'Chem-baron Treaties', author: 'Silco', date: '2024-01-20', type: 'Document' },
  { _id: '4', game: 'arcane', title: 'Demacian Penal Code', author: 'Garen Crownguard', date: '2022-04-18', type: 'Law' },
  { _id: '5', game: 'arcane', title: 'Targon Celestial Alignments', author: 'Diana', date: '2023-08-30', type: 'Observation' },
  { _id: '6', game: 'arcane', title: 'Shimmer Extraction Logs', author: 'Singed', date: '2024-02-15', type: 'Research' },
  { _id: '7', game: 'arcane', title: 'Enforcer Patrol Routes', author: 'Marcus', date: '2024-02-20', type: 'Document' },
  { _id: '8', game: 'arcane', title: 'Firelight Manifesto', author: 'Ekko', date: '2024-03-01', type: 'Manifesto' },
  // Valorant
  { _id: '9', game: 'valorant', title: 'Omen Origins', author: 'Viper', date: '2024-01-10', type: 'Dossier' },
  { _id: '10', game: 'valorant', title: 'Spike Defusal Protocol', author: 'Brimstone', date: '2024-01-12', type: 'Manual' },
  { _id: '11', game: 'valorant', title: 'Icebox Incident Report', author: 'Sova', date: '2024-02-14', type: 'Mission Report' },
  { _id: '12', game: 'valorant', title: 'Radianite Properties', author: 'Killjoy', date: '2024-03-21', type: 'Research' },
  { _id: '13', game: 'valorant', title: 'Omega Earth Analysis', author: 'Cypher', date: '2024-04-05', type: 'Intelligence' },
  // Dark Souls
  { _id: '14', game: 'dark-souls', title: 'Rite of Kindling', author: 'Pinwheel', date: 'Age of Fire', type: 'Scroll' },
  { _id: '15', game: 'dark-souls', title: 'Logan\'s Research', author: 'Big Hat Logan', date: 'Age of Fire', type: 'Research' },
  { _id: '16', game: 'dark-souls', title: 'Way of White Doctrine', author: 'Lloyd', date: 'Age of Fire', type: 'Tome' },
  { _id: '17', game: 'dark-souls', title: 'Abyssal Corruption', author: 'Artorias', date: 'Age of Fire', type: 'Observation' },
  { _id: '18', game: 'dark-souls', title: 'Dragon Scale Records', author: 'Seath', date: 'Age of Ancients', type: 'Research' },
  // Elden Ring
  { _id: '19', game: 'elden-ring', title: 'Two Fingers Missive', author: 'Enia', date: 'The Shattering', type: 'Prophecy' },
  { _id: '20', game: 'elden-ring', title: 'Golden Order Principia', author: 'Radagon', date: 'The Shattering', type: 'Incantation' },
  { _id: '21', game: 'elden-ring', title: 'Carian Royal Family Lineage', author: 'Rennala', date: 'The Shattering', type: 'Record' },
  { _id: '22', game: 'elden-ring', title: 'Scarlet Rot Progression', author: 'Gowry', date: 'The Shattering', type: 'Research' },
  { _id: '23', game: 'elden-ring', title: 'Frenzied Flame Visions', author: 'Shabriri', date: 'The Shattering', type: 'Visions' },
  // God of War
  { _id: '24', game: 'god-of-war', title: 'Jötnar Shrines', author: 'Faye', date: 'Fimbulwinter', type: 'Shrine' },
  { _id: '25', game: 'god-of-war', title: 'Aesir War Tactics', author: 'Tyr', date: 'Fimbulwinter', type: 'Tactics' },
  { _id: '26', game: 'god-of-war', title: 'Dwarven Forge Schematics', author: 'Brok & Sindri', date: 'Fimbulwinter', type: 'Schematics' },
  { _id: '27', game: 'god-of-war', title: 'Seiðr Magic Primer', author: 'Freya', date: 'Fimbulwinter', type: 'Primer' },
  { _id: '28', game: 'god-of-war', title: 'Valkyrie Imprisonment Log', author: 'Sigrun', date: 'Fimbulwinter', type: 'Log' },
  // Hollow Knight
  { _id: '29', game: 'hollow-knight', title: 'Hunter\'s Journal', author: 'The Hunter', date: 'Pre-Infection', type: 'Journal' },
  { _id: '30', game: 'hollow-knight', title: 'Pale King\'s Decree', author: 'Pale King', date: 'Pre-Infection', type: 'Decree' },
  { _id: '31', game: 'hollow-knight', title: 'Soul Sanctum Experiments', author: 'Soul Master', date: 'Pre-Infection', type: 'Notes' },
  { _id: '32', game: 'hollow-knight', title: 'Deepnest Treaties', author: 'Herrah', date: 'Pre-Infection', type: 'Treaty' },
  { _id: '33', game: 'hollow-knight', title: 'Void Construct Blueprints', author: 'Monomon', date: 'Pre-Infection', type: 'Blueprints' }
];

// Auto-generate some dummy content for the archives so the console isn't empty
DUMMY_ARCHIVES.forEach(archive => {
  archive.content = `[ENCRYPTION LIFTED] // ACCESS GRANTED

FILE REF: ${archive._id}-${archive.game.toUpperCase()}
SUBJECT: ${archive.title.toUpperCase()}
COMPILED BY: ${archive.author}

Detailed analysis of the ${archive.title} indicates significant anomalies. 
Field operatives have reported unusual energy fluctuations corresponding with the dates of this record (${archive.date}). 
All personnel are advised to review the ${archive.type} protocols before engaging. 

End of Line.`;
});

const DUMMY_LORE_SECTIONS = [
  { _id: 'l1', game: 'arcane', sectionKey: 'arcane-bridge', tone: 'dark', eyebrow: 'The Divide', title: 'The Bridge of Progress', fullStory: 'The Bridge of Progress stands as the physical and ideological divide between the shining city of Piltover and the undercity of Zaun. A marvel of engineering, it represents both the heights of human ingenuity and the crushing weight of inequality.\n\nFor the people of Piltover, it is a monument to their forward march. For the trenchers of Zaun, it is a constant reminder of the sky they are denied. Enforcers patrol its span, ensuring that the grime of the lower levels never stains the pristine streets above.\n\nIn recent years, the bridge has become a focal point of conflict. Skirmishes between Enforcers and Zaunite rebels often take place in its shadows. The grand arches and gleaming brass, once symbols of unity, now serve as barricades in a simmering civil war.' },
  { _id: 'l2', game: 'arcane', sectionKey: 'arcane-hextech', tone: 'light', eyebrow: 'The Discovery', title: 'Hextech', fullStory: 'Born from the collision of magic and science, Hextech revolutionized Piltover. Discovered by Jayce Talis and Viktor, these shimmering blue crystals channel arcane energy into usable, controlled power. It was heralded as the dawn of a new era.\n\nFrom hexgates that span the globe to simple automated tools, the technology reshaped the world\'s economy. Yet, tampering with arcane forces is never without risk, and the unchecked pursuit of progress threatens to unravel the very fabric of society.\n\nHeimerdinger, a brilliant yordle scientist and the dean of the Academy, long warned against the dangers of unregulated magic. But the allure of progress proved too strong for the ruling council, and Hextech was deployed far faster than its creators could ensure its safety.' },
  { _id: 'l3', game: 'arcane', sectionKey: 'arcane-cost', tone: 'dark', eyebrow: 'The Cost', title: 'What It Asks In Return', fullStory: 'The proliferation of Hextech above was mirrored by the rise of Shimmer below. As Piltover grew wealthier, Zaun grew more desperate. The chemical augmentations of the undercity were a crude, violent reflection of the clean magic of the topside.\n\nEvery advancement carried a hidden price. Friendships shattered, families were torn apart, and the blood spilled on the cobblestones proved that true power always exacts a heavy toll from those least able to pay it.\n\nSilco\'s vision for an independent Zaun was built on the backs of shimmer addicts and child soldiers. His ruthless pragmatism clashed with the idealism of those who still hoped for peaceful reconciliation. In the end, the cost was exacted not just in gold or blood, but in innocence and trust.' },

  { _id: 'l4', game: 'valorant', sectionKey: 'valorant-first-light', tone: 'dark', eyebrow: 'First Light', title: 'The Radianite Awakening', fullStory: 'The event known as First Light changed Earth forever. Unprecedented global phenomena shifted the very laws of physics and introduced a mysterious new resource: Radianite. The world scrambled to understand and control this impossible substance.\n\nIn the wake of First Light, certain individuals began to manifest extraordinary abilities. These \'Radiants\' were feared, worshipped, and hunted. As governments fractured and corporations vied for power, the true potential of Radianite remained dangerously untapped.\n\nKingdom Corporation was among the first to successfully harness Radianite, developing advanced energy solutions and weaponry. Their monopoly granted them unprecedented geopolitical influence, fundamentally altering the balance of power across the globe.' },
  { _id: 'l5', game: 'valorant', sectionKey: 'valorant-protocol', tone: 'light', eyebrow: 'Protocol', title: 'VALORANT Protocol', fullStory: 'Founded in secret to combat existential threats, the VALORANT Protocol gathered the world\'s most capable fighters, both Radiant and human alike. Operating above the jurisdiction of any single nation, they serve as Earth\'s first and last line of defense.\n\nLed by Brimstone and founded by a shadowy benefactor, the agents of VALORANT utilize cutting-edge technology and supernatural abilities. Their missions are classified, their existence a rumor, but their impact on the world\'s survival is absolute.\n\nThe roster includes individuals from diverse backgrounds, each bringing unique expertise. From tactical geniuses like Cypher to raw powerhouses like Phoenix, the agents must put aside personal differences to face threats that could annihilate the planet.' },
  { _id: 'l6', game: 'valorant', sectionKey: 'valorant-mirror', tone: 'dark', eyebrow: 'The Mirror', title: 'Earth-2 and The Rift', fullStory: 'The greatest threat to Earth didn\'t come from the stars, but from the mirror. Earth-2, an alternate dimension facing a catastrophic Radianite crisis, began sending their own agents across the dimensional rift to steal our resources.\n\nThese \'mirror agents\' look like us, fight like us, but are driven by the desperate survival of their own world. The secret war fought across these rifts is a battle for the very future of both planets, where victory means someone else\'s apocalypse.\n\nThe emergence of Omega Earth (Earth-2) forced the VALORANT Protocol to re-evaluate their entire mission. No longer just defending against rogue Radiants or corporate greed, they are now engaged in a complex interdimensional conflict with counterparts who possess their exact skillsets and intimately know their strategies.' },

  { _id: 'l7', game: 'dark-souls', sectionKey: 'ds-fire', tone: 'light', eyebrow: 'The Age of Fire', title: 'The First Flame', fullStory: 'In the Age of Ancients, the world was unformed, shrouded by fog. But then there was Fire, and with Fire came disparity. Heat and cold, life and death, and of course, Light and Dark. From the dark, they came, and found the Souls of Lords within the flame.\n\nGwyn, the Lord of Sunlight, challenged the Everlasting Dragons alongside the other Lords. They claimed victory and ushered in the Age of Fire. But flames will fade, and only Dark will remain. Now, the First Flame dwindles, and the world is plunged into twilight.\n\nGwyn\'s ultimate sacrifice, offering his own soul to kindle the First Flame, temporarily staved off the darkness. He became the first Lord of Cinder, forever burning in the Kiln of the First Flame. This desperate act established a cycle of sacrifice that would curse the world for eons.' },
  { _id: 'l8', game: 'dark-souls', sectionKey: 'ds-undead', tone: 'dark', eyebrow: 'The Undead Curse', title: 'Hollowing and the Darksign', fullStory: 'As the fire fades, the Darksign appears on the flesh of the living. Those branded by it are cursed with undeath. They cannot die, but instead lose their memories and their sanity with each revival, eventually becoming mindless Hollows.\n\nThe undead are corralled and led to the north, locked away in the Undead Asylum to await the end of the world. It is said that a Chosen Undead will eventually escape this fate, make a pilgrimage to Lordran, and ring the Bells of Awakening.\n\nThe prophecy of the Chosen Undead is largely a fabrication created by Kingseeker Frampt and Gwyndolin to manipulate undead into sacrificing themselves to the First Flame. Most undead inevitably fail, their souls consumed, contributing to the endless cycle of suffering.' },
  { _id: 'l9', game: 'dark-souls', sectionKey: 'ds-abyss', tone: 'dark', eyebrow: 'The Abyss', title: 'Manus and the Dark', fullStory: 'Deep beneath Oolacile lies the Abyss, a primordial darkness born from corrupted humanity. It was awakened by the toothy serpent Kaathe, who urged the citizens to unearth the grave of Primeval Man, Manus.\n\nManus, Father of the Abyss, was twisted by his own humanity going wild. The Abyss spread, consuming Oolacile and mutating its inhabitants. Knight Artorias traversed the Abyss to stop it, but even he fell to the encroaching dark.\n\nArtorias\' legacy was preserved by his faithful wolf companion, Sif, and a mysterious figure from the future who ultimately vanquished Manus. Yet, the remnants of the Abyss continued to linger, its dark fragments manifesting in various forms, waiting for an opportunity to consume the world once more.' },

  { _id: 'l10', game: 'elden-ring', sectionKey: 'er-shattering', tone: 'dark', eyebrow: 'The Shattering', title: 'The Elden Ring', fullStory: 'The Elden Ring was the source of the Erdtree\'s golden grace and the foundation of the Golden Order. For an age, Queen Marika the Eternal ruled over the Lands Between, until the Night of the Black Knives, when Godwyn the Golden was slain.\n\nDriven to the brink, Marika shattered the Elden Ring. In her absence, her offspring, demigods all, claimed the shards of the Ring known as the Great Runes. The mad taint of their newfound strength triggered a war that meant abandonment by the Greater Will.\n\nThe Shattering was a war without a victor. The demigods fought to a standstill, their lands ruined, their minds twisted. The once-unified Lands Between became a fractured realm, with each demigod fiercely defending their meager territory while the world slowly rotted around them.' },
  { _id: 'l11', game: 'elden-ring', sectionKey: 'er-demigods', tone: 'dark', eyebrow: 'Demigods', title: 'The Children of Marika', fullStory: 'The war of the Shattering devastated the Lands Between. Malenia, Blade of Miquella, and General Radahn clashed in Caelid, ending in a stalemate that unleashed the Scarlet Rot. Morgott the Omen King fiercely defended the capital of Leyndell.\n\nEach demigod retreated to their domain, corrupted by the power of their Great Runes. Now, they wait in their ruined strongholds, holding onto fragments of a broken world, defying the inevitable return of the Tarnished.\n\nTheir ambitions vary wildly. Rykard sought immortality through consumption by the great serpent. Godrick grafted appendages to himself in a pathetic bid for strength. Ranni cast aside her flesh to pursue a dark path. Together, they represent the fractured ideals of a fallen empire.' },
  { _id: 'l12', game: 'elden-ring', sectionKey: 'er-erdtree', tone: 'light', eyebrow: 'The Erdtree', title: 'Golden Order and Beyond', fullStory: 'The Erdtree\'s glowing branches stretch across the sky, a towering monument to the Greater Will\'s influence. It bestows its blessings upon those deemed worthy, while shunning those who exist outside the Golden Order, like the Omen and the Misbegotten.\n\nBut the Erdtree is not the only power in the Lands Between. Outer Gods vie for influence in the shadows—the Frenzied Flame, the Formless Mother, the dark moon. The fate of the world hinges on which order a new Elden Lord will establish.\n\nThe Two Fingers serve as envoys to the Greater Will, interpreting its desires for the Tarnished. However, their guidance is increasingly erratic and contradictory. Some, like the eccentric Goldmask, strive to perfect the Golden Order, while others, like the Loathsome Dung Eater, seek its absolute defilement.' },

  { _id: 'l13', game: 'god-of-war', sectionKey: 'gow-journey', tone: 'light', eyebrow: 'A New Beginning', title: 'The Journey North', fullStory: 'Many years after his vengeance against the Gods of Olympus, Kratos lives as a man in the realm of Norse Gods and monsters. After the death of his wife Faye, Kratos and his son Atreus must fulfill her final wish: to spread her ashes at the highest peak in all the realms.\n\nThis deeply personal journey forces Kratos to confront the monstrous past he thought he had left behind. He must master his rage and teach his son to survive in a harsh, unforgiving world filled with Draugr, Trolls, and vengeful Aesir gods.\n\nAlong the way, they encounter allies like the Huldra brothers, Brok and Sindri, who aid them with forged weapons, and Mimir, the smartest man alive. They also attract the attention of Baldur, Odin\'s son, who relentlessly pursues them, believing Kratos to be the key to understanding a cryptic prophecy.' },
  { _id: 'l14', game: 'god-of-war', sectionKey: 'gow-ragnarok', tone: 'dark', eyebrow: 'Ragnarök', title: 'The Twilight of the Gods', fullStory: 'Fimbulwinter has arrived, signaling the fast approach of Ragnarök, the prophesied end of the Norse world. As the biting cold grips Midgard, Kratos and Atreus find themselves entangled in the machinations of Odin and the wrath of Freya.\n\nThe realms prepare for a war that will tear Yggdrasil apart. Atreus, seeking to understand his identity as Loki, searches for the lost giant Tyr. Kratos, determined to protect his son, must decide whether to be bound by prophecy or forge a new destiny.\n\nOdin, desperate to avert his predicted demise, utilizes deception and manipulation to gather information. He seeks the mask, an artifact tied to a rift in reality, hoping it holds the answers to surviving Ragnarök. The conflict escalates, dragging in all the realms and culminating in a battle that will shape the fate of the nine worlds.' },
  { _id: 'l15', game: 'god-of-war', sectionKey: 'gow-legacy', tone: 'dark', eyebrow: 'Legacy', title: 'Father and Son', fullStory: 'The true conflict lies not just with the Aesir, but within the bond between father and son. Kratos struggles with the fear that his violent legacy will be inherited by Atreus. He hides his past, inadvertently pushing his son toward the very hubris he fears.\n\nThrough trials and bloodshed, their relationship is tested. They must learn to trust one another, and Kratos must accept that he cannot shield Atreus from the harsh realities of godhood. They are stronger together, forging a new path forward.\n\nUltimately, Kratos realizes that true strength lies not merely in physical power, but in wisdom and restraint. He learns to guide Atreus without dominating him, allowing the boy to make his own choices and embrace his destiny as Loki, a champion of the Jötnar rather than a destroyer.' },

  { _id: 'l16', game: 'hollow-knight', sectionKey: 'hk-infection', tone: 'dark', eyebrow: 'The Infection', title: 'The Radiance Returns', fullStory: 'A sickly orange glow permeates the caverns of Hallownest. This is the Infection, a plague of the mind brought about by the return of the Radiance, a forgotten moth goddess of light. It robbed the bugs of their free will, driving them into a mindless, violent frenzy.\n\nThe Pale King, ruler of Hallownest, attempted to seal the Infection away, but his efforts were ultimately in vain. Now, the ruins of his once-great kingdom are overrun by husks of former citizens, their eyes glowing with the blinding light of their unseen master.\n\nThe Infection manifests physical changes as well, causing grotesque orange cysts to erupt on the bodies of the afflicted. It thrives on dreams and forgotten memories, seeping through the cracks of Hallownest and corrupting everything it touches.' },
  { _id: 'l17', game: 'hollow-knight', sectionKey: 'hk-vessels', tone: 'dark', eyebrow: 'The Vessels', title: 'Sealed Away in Darkness', fullStory: 'To combat the Radiance, the Pale King utilized the Void, an abyssal substance found deep beneath the kingdom. He created the Vessels, beings born of god and void, devoid of a mind to think or a will to break. They were meant to contain the Infection entirely.\n\nThe \'purest\' of these was chosen as the Hollow Knight and sealed inside the Black Egg Temple. Yet, the plan failed. The Hollow Knight was not entirely hollow, and the Infection seeped out. Now, another Vessel wanders the wastes, returning to finish the task.\n\nThe creation of the Vessels was a tragic undertaking. Countless imperfect Vessels were discarded into the Abyss, their silent shades haunting the dark depths. The Knight, one such discarded Vessel, must traverse the ruins, confronting its brethren and uncovering the horrific truth of its origin.' },
  { _id: 'l18', game: 'hollow-knight', sectionKey: 'hk-hallownest', tone: 'light', eyebrow: 'Hallownest', title: 'A Kingdom Forgotten', fullStory: 'Hallownest was once the eternal kingdom, a sprawling labyrinth of distinct ecologies and civilizations. From the lush greenery of Greenpath to the mournful rain of the City of Tears, it was a marvel of the insectoid world, unified under the Pale King.\n\nToday, it is a vast tomb. Explorers and scavengers brave its depths for geo and ancient relics, but few return. Its history is scattered on ancient lore tablets, its secrets hidden behind locked gates, waiting for a silent wanderer to uncover the truth.\n\nRemnants of the old kingdom still linger. The mantis tribe in the Fungal Wastes maintains their fierce independence. The scholars in the Soul Sanctum still pursue their twisted experiments. And in the Resting Grounds, the Dreamers sleep, maintaining the fragile seals that hold back the encroaching Infection.' }
];

async function run() {
  let dbConnected = false;
  let archiveCollection;
  let loreSectionCollection;

  try {
    if (process.env.DB_USER && process.env.DB_PASS) {
      await client.connect();
      const database = client.db('lore_museum');
      archiveCollection = database.collection('archives');
      loreSectionCollection = database.collection('lore_sections');
      dbConnected = true;
      console.log("Successfully connected to MongoDB!");

      const archiveCount = await archiveCollection.countDocuments();
      console.log("Archive count:", archiveCount);
      // Force seed for showcase
      await archiveCollection.deleteMany({});
      await archiveCollection.insertMany(DUMMY_ARCHIVES);
      console.log("Seeded archives.");
      
      const loreCount = await loreSectionCollection.countDocuments();
      console.log("Lore count:", loreCount);
      // Force seed for showcase
      await loreSectionCollection.deleteMany({});
      await loreSectionCollection.insertMany(DUMMY_LORE_SECTIONS);
      console.log("Seeded lore sections.");
    } else {
      console.log("No MongoDB credentials found. Using dummy data for API.");
    }

    // Existing /api/archives endpoint (returns all archives)
    app.get('/api/archives', async (req, res) => {
      try {
        if (dbConnected) {
          const data = await archiveCollection.find({}).toArray();
          return res.json(data);
        } else {
          return res.json(DUMMY_ARCHIVES);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    });

    // New /api/archives/:game endpoint
    app.get('/api/archives/:game', async (req, res) => {
      try {
        const gameId = req.params.game;
        if (dbConnected) {
          const data = await archiveCollection.find({ game: gameId }).toArray();
          return res.json(data);
        } else {
          const data = DUMMY_ARCHIVES.filter(a => a.game === gameId);
          return res.json(data);
        }
      } catch (err) {
        console.error('Error fetching archives by game:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    });

    // New /api/lore/:game endpoint
    app.get('/api/lore/:game', async (req, res) => {
      try {
        const gameId = req.params.game;
        if (dbConnected) {
          const data = await loreSectionCollection.find({ game: gameId }).toArray();
          return res.json(data);
        } else {
          const data = DUMMY_LORE_SECTIONS.filter(l => l.game === gameId);
          return res.json(data);
        }
      } catch (err) {
        console.error('Error fetching lore sections by game:', err);
        res.status(500).json({ error: 'Failed to fetch lore' });
      }
    });

    // New /api/lore/:game/:sectionKey endpoint
    app.get('/api/lore/:game/:sectionKey', async (req, res) => {
      try {
        const { game, sectionKey } = req.params;
        if (dbConnected) {
          const data = await loreSectionCollection.findOne({ game, sectionKey });
          if (!data) return res.status(404).json({ error: 'Lore section not found' });
          return res.json(data);
        } else {
          const data = DUMMY_LORE_SECTIONS.find(l => l.game === game && l.sectionKey === sectionKey);
          if (!data) return res.status(404).json({ error: 'Lore section not found' });
          return res.json(data);
        }
      } catch (err) {
        console.error('Error fetching lore section:', err);
        res.status(500).json({ error: 'Failed to fetch lore section' });
      }
    });

    app.get('/', (req, res) => {
      res.send('Lore Museum API is running');
    });

  } catch (err) {
    console.error('Error during server setup:', err);
  }
}

run().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(console.error);
