import express from 'express';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import methodsRouter from './routes/methods.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.use('/api/methods', methodsRouter);

// Serve method detail page
app.get('/methods/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'method.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Coffee server running on http://localhost:${PORT}`);
});
