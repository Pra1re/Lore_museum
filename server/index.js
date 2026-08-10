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

// Dummy data fallback
const DUMMY_ARCHIVES = [
  { _id: '1', title: 'The Fall of Shurima', author: 'Nasus', date: '2023-10-12', type: 'Historical Record' },
  { _id: '2', title: 'Hextech Field Notes', author: 'Jayce Talis', date: '2023-11-05', type: 'Research' },
  { _id: '3', title: 'Chem-baron Treaties', author: 'Silco', date: '2024-01-20', type: 'Document' },
  { _id: '4', title: 'Demacian Penal Code', author: 'Garen Crownguard', date: '2022-04-18', type: 'Law' },
  { _id: '5', title: 'Targon Celestial Alignments', author: 'Diana', date: '2023-08-30', type: 'Observation' }
];

async function run() {
  let dbConnected = false;
  let archiveCollection;

  try {
    // Only attempt to connect if credentials are provided
    if (process.env.DB_USER && process.env.DB_PASS) {
      await client.connect();
      const database = client.db('lore_museum');
      archiveCollection = database.collection('archives');
      dbConnected = true;
      console.log("Successfully connected to MongoDB!");

      // MongoDB creates databases lazily. We insert data here if it's empty so it actually appears in Atlas!
      const count = await archiveCollection.countDocuments();
      if (count === 0) {
        console.log("Collection is empty. Seeding database to create it in Atlas...");
        await archiveCollection.insertMany(DUMMY_ARCHIVES);
      }
    } else {
      console.log("No MongoDB credentials found. Using dummy data for /api/archives.");
    }

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
