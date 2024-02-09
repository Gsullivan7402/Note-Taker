// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

let notes = []; // In-memory storage for notes

// API to get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// API to create a new note
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote = { id: uuidv4(), title, text };
    notes.push(newNote);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
