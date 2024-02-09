// Get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Create a new note
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote = { id: uuidv4(), title, text };
    notes.push(newNote);
    res.json(newNote);
});

// Get a single note by id
app.get('/api/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === req.params.id);
    res.json(note);
});
