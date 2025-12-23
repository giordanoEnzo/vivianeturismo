import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { setupDb, openDb } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, Date.now() + '-' + basename + ext)
    }
})
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize DB
setupDb().then(() => {
    console.log('Database initialized');
});

// Routes

// Promotions
app.get('/api/promotions', async (req, res) => {
    const db = await openDb();
    try {
        const promotions = await db.all('SELECT * FROM promotions ORDER BY created_at DESC');
        res.json(promotions);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/promotions', upload.single('image'), async (req, res) => {
    const db = await openDb();
    const { title, description, price, duration, hotel, flight_info, services_info, people_count } = req.body;

    // Checkbox handling: req.body.has_breakfast need to be checked if 'true' or 'on'
    const has_breakfast = req.body.has_breakfast === 'true' || req.body.has_breakfast === true;
    const has_lunch = req.body.has_lunch === 'true' || req.body.has_lunch === true;
    const has_dinner = req.body.has_dinner === 'true' || req.body.has_dinner === true;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        await db.run(
            'INSERT INTO promotions (title, description, price, duration, image, hotel, has_breakfast, has_lunch, has_dinner, flight_info, services_info, people_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, price, duration, image, hotel, has_breakfast, has_lunch, has_dinner, flight_info, services_info, people_count]
        );
        res.json({ message: 'Promotion created' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.delete('/api/promotions/:id', async (req, res) => {
    const db = await openDb();
    try {
        await db.run('DELETE FROM promotions WHERE id = ?', [req.params.id]);
        res.json({ message: 'Promotion deleted' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


// Blog
app.get('/api/posts', async (req, res) => {
    const db = await openDb();
    try {
        const posts = await db.all('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/posts', upload.single('image'), async (req, res) => {
    const db = await openDb();
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        await db.run(
            'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)',
            [title, content, image]
        );
        res.json({ message: 'Post created' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    const db = await openDb();
    try {
        const post = await db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    const db = await openDb();
    try {
        await db.run('DELETE FROM posts WHERE id = ?', [req.params.id]);
        res.json({ message: 'Post deleted' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Admin login (Simple hardcoded)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
