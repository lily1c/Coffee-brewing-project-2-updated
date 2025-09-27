import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

console.log("Starting server...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

const coffeeGuides = {
  'espresso': {
    id: 'espresso',
    name: 'Espresso',
    type: 'Pressure Brewing',
    difficulty: 'Intermediate',
    brewTime: '25-30 seconds',
    description: 'The foundation of many coffee drinks.',
    equipment: ['Espresso machine', 'Grinder', 'Tamper'],
    grindSize: 'Fine',
    coffeeToWater: '1:2 ratio',
    steps: ['Grind coffee fine', 'Tamp evenly', 'Extract for 25-30 seconds'],
    tips: 'Adjust grind size for timing',
    taste: 'Intense and concentrated'
  },
  'pour-over': {
    id: 'pour-over',
    name: 'Pour Over',
    type: 'Manual Brewing',
    difficulty: 'Beginner',
    brewTime: '3-4 minutes',
    description: 'Clean and bright coffee.',
    equipment: ['V60', 'Filters', 'Kettle'],
    grindSize: 'Medium-fine',
    coffeeToWater: '1:15 ratio',
    steps: ['Heat water', 'Wet filter', 'Pour slowly'],
    tips: 'Pour in circles',
    taste: 'Clean and bright'
  },
  'french-press': {
    id: 'french-press',
    name: 'French Press',
    type: 'Immersion',
    difficulty: 'Beginner',
    brewTime: '4 minutes',
    description: 'Full-bodied coffee.',
    equipment: ['French press', 'Grinder'],
    grindSize: 'Coarse',
    coffeeToWater: '1:12 ratio',
    steps: ['Add coffee', 'Pour water', 'Wait 4 minutes', 'Press'],
    tips: 'Use coarse grind',
    taste: 'Full-bodied'
  },
  'cold-brew': {
    id: 'cold-brew',
    name: 'Cold Brew',
    type: 'Cold extraction',
    difficulty: 'Beginner',
    brewTime: '12-24 hours',
    description: 'Smooth cold coffee.',
    equipment: ['Jar', 'Strainer'],
    grindSize: 'Coarse',
    coffeeToWater: '1:4 ratio',
    steps: ['Mix coffee and water', 'Steep overnight', 'Strain'],
    tips: 'Store in fridge',
    taste: 'Smooth and sweet'
  },
  'aeropress': {
    id: 'aeropress',
    name: 'AeroPress',
    type: 'Pressure',
    difficulty: 'Beginner',
    brewTime: '1-2 minutes',
    description: 'Clean and smooth.',
    equipment: ['AeroPress', 'Filters'],
    grindSize: 'Medium-fine',
    coffeeToWater: '1:14 ratio',
    steps: ['Add coffee', 'Add water', 'Stir', 'Press'],
    tips: 'Try inverted method',
    taste: 'Clean and smooth'
  }
};

console.log("Setting up routes...");

app.get('/', (req, res) => {
  console.log("Homepage requested");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/methods/:id', (req, res) => {
  const methodId = req.params.id;
  console.log("Method detail requested:", methodId);
  const method = coffeeGuides[methodId];
  if (!method) {
    return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
  res.sendFile(path.join(__dirname, 'public', 'method.html'));
});

app.get('/api/methods', (req, res) => {
  console.log("API methods requested");
  res.json(Object.values(coffeeGuides));
});

app.get('/api/methods/:id', (req, res) => {
  const methodId = req.params.id;
  console.log("API method detail requested:", methodId);
  const method = coffeeGuides[methodId];
  if (!method) {
    return res.status(404).json({ error: 'Method not found' });
  }
  res.json(method);
});

app.use((req, res) => {
  console.log("404 for:", req.url);
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

console.log("Starting Express server...");

app.listen(PORT, () => {
  console.log(`✅ Coffee server running on http://localhost:${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

console.log("Server setup complete!");