const fs = require('fs');
const path = require('path');

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNotes(body, notes) {
  notes.push(body);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'), 
    JSON.stringify(notes, null, 2)
  );
  return notes;
}

function deleteNotes(notes) {
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'), 
    JSON.stringify(notes, null, 2)
  );
  return notes;
}

function validateNotes(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewNotes,
  validateNotes,
  deleteNotes
};
