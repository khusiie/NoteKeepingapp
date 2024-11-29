import React, { useState, useEffect } from 'react';
import { addNote, getNotes, updateNote, deleteNote, logOut } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Save, X, Edit2, Trash2, LogOut } from 'lucide-react';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userNotes = await getNotes();
        setNotes(userNotes);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = async () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    
    try {
      await addNote(newNoteTitle, newNoteContent);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAddingNote(false);
      const userNotes = await getNotes();
      setNotes(userNotes);
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleUpdateNote = async (noteId) => {
    try {
      if (!editingNoteId) return;
      
      await updateNote(noteId, {
        title: editedTitle,
        content: editedContent
      });
      
      const userNotes = await getNotes();
      setNotes(userNotes);
      
      setEditingNoteId(null);
      setEditedTitle('');
      setEditedContent('');
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await deleteNote(id);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login'); 
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

       
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        
        {isAddingNote && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transform transition-all duration-200 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Create New Note</h2>
              <button
                onClick={() => setIsAddingNote(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Note Content"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setIsAddingNote(false)}
              >
                Cancel
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                onClick={handleAddNote}
              >
                <Plus size={18} />
                Add Note
              </button>
            </div>
          </div>
        )}

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div 
              key={note.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              {editingNoteId === note.id ? (
                <div className="p-6">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                      onClick={() => {
                        setEditingNoteId(null);
                        setEditedTitle('');
                        setEditedContent('');
                      }}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                      onClick={() => handleUpdateNote(note.id)}
                    >
                      <Save size={16} />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                  <p className="text-gray-600 mb-4">{note.content}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                      onClick={() => {
                        setEditingNoteId(note.id);
                        setEditedTitle(note.title);
                        setEditedContent(note.content);
                      }}
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

       
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;