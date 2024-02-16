document.addEventListener('DOMContentLoaded', function() {
    const notesList = document.getElementById('notes-list');
    const newNoteButton = document.getElementById('new-note');
    const saveNoteButton = document.getElementById('save-note');
    // const deleteNoteButton = document.getElementById('delete-note'); // Commented out as it's not used
    const noteForm = document.getElementById('note-form');
    const titleInput = document.getElementById('note-title');
    const textInput = document.getElementById('note-text');
    let editingNoteId = null; // Track the id of the note being edited but not used currently

    function loadNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(data => {
                notesList.innerHTML = ''; // Clear existing notes
                data.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.innerHTML = `
                        <h4>${note.title}</h4>
                        <p>${note.text}</p>
                        <button class="delete-note" data-id="${note.id}">Delete</button>
                    `;
                    notesList.appendChild(noteElement);
                });
                attachDeleteEventListeners(); // Attach event listeners to the delete buttons
            });
    }
    
    function attachDeleteEventListeners() {
        document.querySelectorAll('.delete-note').forEach(button => {
            button.addEventListener('click', function(event) {
                const noteId = this.getAttribute('data-id');
                deleteNote(noteId);
                event.stopPropagation();
            });
        });
    }
    
    function deleteNote(noteId) {
        fetch(`/api/notes/${noteId}`, {
            method: 'DELETE',
        })
        .then(() => {
            loadNotes(); // Reload the notes to reflect the deletion
        });
    }

    function saveNote() {
        const title = titleInput.value;
        const text = textInput.value;
        const note = { title, text };

        // If editingNoteId is null, it's a new note; otherwise, it's an update (but update logic is not implemented here)
        fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        })
        .then(response => response.json())
        .then(() => {
            titleInput.value = '';
            textInput.value = '';
            loadNotes(); // Reload the notes to show the new note
            noteForm.style.display = 'none'; // Hide the form after saving
        });
    }

    newNoteButton.onclick = function() {
        noteForm.style.display = 'block'; // Show the form for a new note
        titleInput.value = '';
        textInput.value = '';
        editingNoteId = null; // Reset editing note ID
    };

    saveNoteButton.onclick = saveNote;

    loadNotes(); // Initial load of notes
});
