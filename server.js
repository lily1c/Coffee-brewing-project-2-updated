import express from 'express';
import './config/dotenv.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import methodsRouter from './routes/methods.js';

console.log("Starting server...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

console.log("Setting up routes...");

// Serve homepage
app.get('/', (req, res) => {
    console.log("Homepage requested");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes for coffee methods
app.use('/api/methods', methodsRouter);

// Serve method detail page
app.get('/methods/:id', (req, res) => {
    const methodId = req.params.id;
    console.log("Method detail requested:", methodId);
    res.sendFile(path.join(__dirname, 'public', 'method.html'));
});

// 404 handler
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