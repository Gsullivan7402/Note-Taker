const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path'); // Include the path module
const app = express();
const PORT = 3000;

// Path to the JSON file where notes will be stored
const NOTES_FILE = './notes.json';

// Use Express's built-in middleware for parsing application/json
app.use(express.json());
// Serve static files from 'public' directory
app.use(express.static('./'));


app.get('/', (req, res) => {
    // Corrected to sendFile and properly use path.join to reference index.html
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to read notes from file
function readNotes() {
    try {
        const data = fs.readFileSync(NOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return []; // Return an empty array if there's an error (e.g., file doesn't exist)
    }
}
// Function to write notes to file
function writeNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf8');
}
// GET endpoint to fetch all notes
app.get('/api/notes', (req, res) => {
    res.json(readNotes());
});
// POST endpoint to create a new note
app.post('/api/notes', (req, res) => {
    const notes = readNotes();
    const newNote = { id: uuidv4(), title: req.body.title, text: req.body.text };
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
});
// DELETE endpoint to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
    let notes = readNotes();
    notes = notes.filter(note => note.id !== req.params.id);
    writeNotes(notes);
    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
