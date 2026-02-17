import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const addNote = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newNote = {
      id: Date.now(),
      title,
      createdAt: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-2">📒 Notes App</h1>
        <p className="text-gray-400 mb-6">
          Catatan sederhana React + Tailwind (auto save localStorage)
        </p>

        {/* Form */}
        <form
          onSubmit={addNote}
          className="flex gap-2 bg-gray-900 p-4 rounded-xl shadow-md mb-6"
        >
          <input
            type="text"
            placeholder="Tulis catatan..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </form>

        {/* Notes List */}
        <div className="space-y-3">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Belum ada catatan 😴
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-900 p-4 rounded-xl flex justify-between items-start shadow-md"
              >
                <div>
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {note.createdAt}
                  </p>
                </div>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-400 hover:text-red-500 font-semibold"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
