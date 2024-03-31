const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use the cors middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/cities', async (req, res) => {
    try {
        const response = await fetch('https://api.npoint.io/7bbd3a59c401f616bb89');
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data.places || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
