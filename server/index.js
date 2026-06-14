import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper function to read the database
async function readDB() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return { buddies: [], posts: [], trips: {} };
  }
}

// Helper function to write to the database
async function writeDB(data) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// Helper to normalize destination keys (e.g. "goa" -> "Goa")
function normalizeDestName(name) {
  if (!name) return 'Goa';
  return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
}

// ------------------- TRAVEL BUDDIES ENDPOINTS -------------------

// Get all buddies
app.get('/api/buddies', async (req, res) => {
  const db = await readDB();
  res.json(db.buddies || []);
});

// Toggle buddy like state
app.post('/api/buddies/:id/like', async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await readDB();
  const index = db.buddies.findIndex(b => b.id === id);
  if (index !== -1) {
    db.buddies[index].liked = !db.buddies[index].liked;
    await writeDB(db);
    return res.json(db.buddies[index]);
  }
  res.status(404).json({ error: 'Buddy not found' });
});

// Toggle buddy connect state
app.post('/api/buddies/:id/connect', async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await readDB();
  const index = db.buddies.findIndex(b => b.id === id);
  if (index !== -1) {
    db.buddies[index].connected = !db.buddies[index].connected;
    await writeDB(db);
    return res.json(db.buddies[index]);
  }
  res.status(404).json({ error: 'Buddy not found' });
});


// ------------------- COMMUNITY POSTS ENDPOINTS -------------------

// Get all posts (newest first)
app.get('/api/posts', async (req, res) => {
  const db = await readDB();
  res.json(db.posts || []);
});

// Create new post
app.post('/api/posts', async (req, res) => {
  const { content, location } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Post content is required' });
  }

  const db = await readDB();
  const newPost = {
    id: db.posts.length > 0 ? Math.max(...db.posts.map(p => p.id)) + 1 : 1,
    name: 'You (Traveler)',
    handle: '@current_user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120',
    time: 'Just now',
    content,
    location: location || 'Everywhere',
    image: null,
    likes: 0,
    comments: 0,
    liked: false
  };

  db.posts.unshift(newPost); // Add to beginning of array
  await writeDB(db);
  res.status(201).json(newPost);
});

// Toggle post like state
app.post('/api/posts/:id/like', async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await readDB();
  const index = db.posts.findIndex(p => p.id === id);
  if (index !== -1) {
    const post = db.posts[index];
    if (post.liked) {
      post.likes = Math.max(0, post.likes - 1);
      post.liked = false;
    } else {
      post.likes += 1;
      post.liked = true;
    }
    await writeDB(db);
    return res.json(post);
  }
  res.status(404).json({ error: 'Post not found' });
});


// ------------------- TRIP Timeline & Widgets ENDPOINTS -------------------

// Get trip details for destination
app.get('/api/trips/:destination', async (req, res) => {
  const destination = normalizeDestName(req.params.destination);
  const db = await readDB();
  
  if (!db.trips) db.trips = {};
  
  // Create a default dynamic trip itinerary if destination does not exist
  if (!db.trips[destination]) {
    db.trips[destination] = {
      budgetLimit: 40000,
      budgetSpent: 0,
      vibeMood: 'Chill',
      weather: { temp: '25°C', condition: 'Clear' },
      safety: { status: 'Clear', desc: 'No active weather warnings.', type: 'ok' },
      timeline: [
        { day: 'Day 1', title: `Welcome to ${destination}`, activity: `Arrive in ${destination}, check into your accommodation, and meet local travelers.`, time: '02:00 PM', alert: null },
        { day: 'Day 2', title: 'Local Sightseeing & Trekking', activity: 'Explore the highlights of the area, cafe crawl, and capture scenery.', time: '10:00 AM', alert: null },
        { day: 'Day 3', title: 'Departing Journey', activity: 'Pack up, grab souvenirs, and head back home with memories.', time: '11:00 AM', alert: null }
      ],
      recentExpenses: []
    };
    await writeDB(db);
  }
  
  res.json(db.trips[destination]);
});

// Add a new expense for a trip
app.post('/api/trips/:destination/expenses', async (req, res) => {
  const destination = normalizeDestName(req.params.destination);
  const { title, amount, category } = req.body;
  
  if (!title || !amount || isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: 'Title and valid amount are required' });
  }

  const db = await readDB();
  if (!db.trips || !db.trips[destination]) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  const trip = db.trips[destination];
  const expenseAmount = parseFloat(amount);
  
  const newExpense = {
    title,
    amount: expenseAmount,
    category: category || 'Extra'
  };

  trip.recentExpenses.unshift(newExpense);
  trip.budgetSpent += expenseAmount;
  
  await writeDB(db);
  res.json(trip);
});

// Update vibe mood for a trip
app.post('/api/trips/:destination/mood', async (req, res) => {
  const destination = normalizeDestName(req.params.destination);
  const { vibeMood } = req.body;

  if (!vibeMood) {
    return res.status(400).json({ error: 'Vibe mood is required' });
  }

  const db = await readDB();
  if (!db.trips || !db.trips[destination]) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  db.trips[destination].vibeMood = vibeMood;
  await writeDB(db);
  res.json(db.trips[destination]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
