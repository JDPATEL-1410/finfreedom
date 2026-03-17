const express = require('express');
const cors = require('cors');
const blogRoutes = require('../server/routes/blog');
const contactRoutes = require('../server/routes/contact');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// Note: Vercel routes everything in /api to this function, 
// so we should match the paths accordingly.
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
