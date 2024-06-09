import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { database } from './firebaseConfig';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    const notesRef = ref(database, 'notes');
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedNotes = [];
      for(let id in data) {
        loadedNotes.push({ id, ...data[id] });
      }
      setNotes(loadedNotes);
    });
  }, []);

  const handleInputChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    const notesRef = ref(database, 'notes');
    const newNoteRef = push(notesRef);
    set(newNoteRef, newNote);
    setNewNote({ title: '', content: '' });
  };

  const handleUpdate = (note) => {
    const noteRef = ref(database, `notes/${note.id}`);
    set(noteRef, note);
  };

  const handleDelete = (id) => {
    const noteRef = ref(database, `notes/${id}`);
    remove(noteRef);
  };

  return (
    <div>
      <input name="title" value={newNote.title} onChange={handleInputChange} placeholder="Title" />
      <textarea name="content" value={newNote.content} onChange={handleInputChange} placeholder="Content" />
      <button onClick={handleCreate}>Create</button>
      {notes.map(note => (
        <div key={note.id}>
          <input name="title" value={note.title} onChange={e => handleUpdate({ ...note, title: e.target.value })} />
          <textarea name="content" value={note.content} onChange={e => handleUpdate({ ...note, content: e.target.value })} />
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;