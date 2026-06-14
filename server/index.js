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

// Friendly welcome route for server root
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Tip2Trip Backend API Server',
    message: 'Welcome! The backend service is running successfully. Access the frontend app on http://localhost:5173',
    endpoints: {
      buddies: '/api/buddies',
      posts: '/api/posts',
      tripDetails: '/api/trips/:destination'
    }
  });
});

// ------------------- HELPERS & SEED DATA GENERATORS -------------------

// Predefined landmark itineraries for popular destinations
const landmarkDict = {
  Goa: {
    weather: { temp: '31°C', condition: 'Sunny' },
    safety: { status: 'Clear', desc: 'No active weather warnings. Standard tides.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Sunset Shack Party & Chill', activity: 'Arrive in North Goa, check in, check out shacks. Splitting taxi with Kabir.', time: '04:00 PM', alert: null },
      { day: 'Day 2', title: 'Panaji Spice Plantation Crawl', activity: 'Trek around local spice gardens and eat local traditional vindaloo. Dress code: light cotton.', time: '09:00 AM', alert: null },
      { day: 'Day 3', title: 'Dudhsagar Waterfall Hike', activity: 'Adventure trek through forest paths and high streams. Waterproof shoes required.', time: '08:00 AM', alert: 'High water warning: Stick to marked trails!' }
    ]
  },
  Kasol: {
    weather: { temp: '16°C', condition: 'Cloudy' },
    safety: { status: 'Caution', desc: 'Heavy rains expected tomorrow evening. Avoid riverbed campsites.', type: 'warn' },
    timeline: [
      { day: 'Day 1', title: 'Chalal Trail Walk', activity: 'Walk along the Parvati River, local pine forest paths. Splitting café tab with Riya.', time: '02:00 PM', alert: null },
      { day: 'Day 2', title: 'Kheerganga Trek Ascent', activity: 'Climb 12km through alpine meadows and local hot water springs.', time: '07:00 AM', alert: 'Trail warning: Wet slippery rocks near the falls' },
      { day: 'Day 3', title: 'Tosh Valley Exploration', activity: 'Visit the high-altitude remote wooden village and cafés.', time: '10:00 AM', alert: null }
    ]
  },
  Leh: {
    weather: { temp: '14°C', condition: 'Clear Skies' },
    safety: { status: 'Clear', desc: 'Khardung La Pass is open. Border permits operating normally.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Leh Market Walk & Acclimatization', activity: 'Wander old palace fort districts. Look for local sketch artists. Ride with Aarav.', time: '06:00 PM', alert: null },
      { day: 'Day 2', title: 'Pangong Lake Bike Ride', activity: 'Ride 140km through high mountain passes. Keep hydrated at all times.', time: '06:30 AM', alert: 'Altitude alert: Rest if feeling dizzy or short of breath' },
      { day: 'Day 3', title: 'Magnetic Hill & Confluence Vibe', activity: 'Explore local monasteries, Magnetic Hill, and Indus-Zanskar confluence.', time: '09:00 AM', alert: null }
    ]
  },
  Manali: {
    weather: { temp: '19°C', condition: 'Cool Breeze' },
    safety: { status: 'Clear', desc: 'Solang Valley roads clear. Paragliding active.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Old Manali Cafe Crawl', activity: 'Check in, rent scooters, head to lazy cafes by the river. Met local traveler Rohit.', time: '03:00 PM', alert: null },
      { day: 'Day 2', title: 'Solang Valley Adventure', activity: 'Try zorbing, paragliding, and short treks to Jogini Waterfalls.', time: '09:00 AM', alert: null },
      { day: 'Day 3', title: 'Atal Tunnel & Sissu Day Trip', activity: 'Drive through the engineering marvel Atal Tunnel to explore Sissu waterfall in Lahaul Valley.', time: '08:30 AM', alert: 'Keep warm: Temperature drops below 5°C in Sissu' }
    ]
  },
  Udaipur: {
    weather: { temp: '34°C', condition: 'Sunny' },
    safety: { status: 'Clear', desc: 'Lake water levels normal. Boat rides operating.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Lake Pichola Sunset Boat Ride', activity: 'Arrive in Udaipur, head to Ambrai Ghat, take a sunset boat tour around Lake Palace.', time: '05:00 PM', alert: null },
      { day: 'Day 2', title: 'City Palace & Monsoon Palace Tour', activity: 'Explore Mewar heritage museum and drive up Bansdara hill for panoramic lake views.', time: '10:00 AM', alert: null },
      { day: 'Day 3', title: 'Sajjangarh Wildlife Sanctuary Walk', activity: 'Walk around the foothill sanctuary paths, check local arts markets.', time: '09:00 AM', alert: null }
    ]
  },
  Munnar: {
    weather: { temp: '22°C', condition: 'Misty' },
    safety: { status: 'Clear', desc: 'Misty roads in the mornings. Drive safely.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Tea Museum & Plantation Tour', activity: 'Walk through lush tea estates, check out local tea processing.', time: '02:00 PM', alert: null },
      { day: 'Day 2', title: 'Anamudi Peak Trek', activity: 'Trek up the highest peak in South India. Keep an eye out for Nilgiri Tahr.', time: '07:30 AM', alert: 'Eco-reserve: Do not litter, fines apply' },
      { day: 'Day 3', title: 'Mattupetty Dam Boating', activity: 'Boat ride in the reservoir, visit Kundala lake and Echo point.', time: '10:00 AM', alert: null }
    ]
  },
  Paris: {
    weather: { temp: '21°C', condition: 'Light Rain' },
    safety: { status: 'Clear', desc: 'Standard metro lines active. Keep belongings secure.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Eiffel Tower & Seine Cruise', activity: 'Check in, head to Trocadéro for photos, take a late evening river cruise.', time: '06:00 PM', alert: null },
      { day: 'Day 2', title: 'Louvre Museum & Montmartre Tour', activity: 'Pre-book Louvre tickets, visit Mona Lisa, and walk up to Sacré-Cœur basilica for sunset.', time: '09:30 AM', alert: 'Crowded area warning: Watch out for pickpockets near Montmartre stairs' },
      { day: 'Day 3', title: 'Champs-Élysées & Arc de Triomphe', activity: 'Walk the famous avenue, climb Arc de Triomphe, eat French macarons at Ladurée.', time: '10:00 AM', alert: null }
    ]
  },
  Tokyo: {
    weather: { temp: '24°C', condition: 'Sunny' },
    safety: { status: 'Clear', desc: 'Trains operating on time. Volcano alerts green.', type: 'ok' },
    timeline: [
      { day: 'Day 1', title: 'Shibuya Crossing & Harajuku Vibe', activity: 'Check in, cross the busiest intersection, eat crepes in Takeshita Street.', time: '03:00 PM', alert: null },
      { day: 'Day 2', title: 'Senso-ji Temple & Akihabara Electric Town', activity: 'Visit Tokyo\'s oldest temple in Asakusa, followed by arcade gaming in Akiba.', time: '09:00 AM', alert: null },
      { day: 'Day 3', title: 'Shinjuku Gyoen National Garden', activity: 'Quiet walk through traditional tea houses, then head to Shinjuku observation deck.', time: '10:00 AM', alert: null }
    ]
  }
};

// Generates a fully custom fallback itinerary if a custom destination name is not matched
function generateCustomItinerary(destination) {
  return {
    weather: { temp: '23°C', condition: 'Partly Cloudy' },
    safety: { status: 'Clear', desc: `Welcome to ${destination}. Local advisories are clear.`, type: 'ok' },
    timeline: [
      { day: 'Day 1', title: `Arrival in ${destination}`, activity: `Check in to your local accommodation, meet travel buddies in the lobby, and head out to try local street food.`, time: '02:00 PM', alert: null },
      { day: 'Day 2', title: `${destination} Landmark Crawl`, activity: `Explore the absolute best sights, museums, and viewpoint hills in ${destination}. Use public transport to save costs.`, time: '09:00 AM', alert: null },
      { day: 'Day 3', title: 'Hidden Gems Tour', activity: `Discover off-the-beaten-path paths, local cafes, and grab souvenirs before heading to the station/airport.`, time: '10:00 AM', alert: null }
    ]
  };
}

// Random elements for dynamic travel buddies generator
const buddyFirstNames = ['Rahul', 'Priya', 'Aditya', 'Sneha', 'Vikram', 'Neha', 'Arjun', 'Anjali', 'Karan', 'Simran'];
const buddyLastNames = ['Sharma', 'Mehta', 'Sen', 'Goel', 'Iyer', 'Das', 'Gill', 'Verma', 'Roy', 'Patel'];
const buddyAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
];
const interestsList = [['Trekking', 'Campfires', 'Photography'], ['Vlogging', 'Surfing', 'Nightlife'], ['Heritage', 'Sketching', 'Street Food'], ['Yoga', 'Shacks', 'Scuba Diving'], ['Roadtrips', 'Biking', 'Hiking']];

// Helper to generate a random travel buddy profile
function generateMockBuddy(destination) {
  const firstName = buddyFirstNames[Math.floor(Math.random() * buddyFirstNames.length)];
  const lastName = buddyLastNames[Math.floor(Math.random() * buddyLastNames.length)];
  const avatar = buddyAvatars[Math.floor(Math.random() * buddyAvatars.length)];
  const interests = interestsList[Math.floor(Math.random() * interestsList.length)];
  const age = Math.floor(Math.random() * 6) + 21; // 21 to 26
  const match = Math.floor(Math.random() * 15) + 85; // 85% to 99%
  
  return {
    name: `${firstName} ${lastName}`,
    age,
    avatar,
    destination,
    match,
    bio: `Heading to ${destination}! Looking for chill buddies to split cafe tabs, rent transport, and explore offbeat viewpoints. Let's make memories!`,
    interests,
    liked: false,
    connected: false
  };
}

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
  const budgetStyle = req.query.budget || 'Standard';
  const db = await readDB();
  
  if (!db.trips) db.trips = {};
  
  // Calculate budget limits based on selected style
  let defaultBudgetLimit = 40000;
  if (budgetStyle === 'Backpacker') defaultBudgetLimit = 15000;
  if (budgetStyle === 'Luxury') defaultBudgetLimit = 120000;

  // Create/Update trip itinerary dynamically
  if (!db.trips[destination]) {
    const preset = landmarkDict[destination] || generateCustomItinerary(destination);
    
    db.trips[destination] = {
      budgetLimit: defaultBudgetLimit,
      budgetSpent: 0,
      vibeMood: 'Chill',
      weather: preset.weather,
      safety: preset.safety,
      timeline: preset.timeline,
      recentExpenses: []
    };

    // Spawn 2 travel buddies heading to this new destination if none exist
    const hasBuddies = db.buddies.some(b => b.destination.toLowerCase() === destination.toLowerCase());
    if (!hasBuddies) {
      const buddy1 = generateMockBuddy(destination);
      const buddy2 = generateMockBuddy(destination);
      const maxId = db.buddies.length > 0 ? Math.max(...db.buddies.map(b => b.id)) : 0;
      
      buddy1.id = maxId + 1;
      buddy2.id = maxId + 2;
      db.buddies.push(buddy1, buddy2);
    }

    await writeDB(db);
  } else {
    // If the trip already exists but the budget query parameter is explicitly provided, update the limit to reflect the new search selection
    if (req.query.budget && db.trips[destination].budgetLimit !== defaultBudgetLimit) {
      db.trips[destination].budgetLimit = defaultBudgetLimit;
      await writeDB(db);
    }
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
