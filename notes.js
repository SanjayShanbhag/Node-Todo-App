const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateString = notes.filter((note) => {
    return note.title === title;
  });

  if(duplicateString.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getList = () => {
  console.log('Geting all the notes!');
  var allNotes = fetchNotes();
  return allNotes;
};

var getNote = (title) => {
  console.log(`Getting ${title}`);
  var items = fetchNotes();
  var requiredNote = items.filter((item) => {
    return item.title === title;
  });
  return requiredNote[0];
};

var removeNote = (title) => {
  console.log(`Removing ${title}`);
  var items = fetchNotes();
  var newNoteObject = items.filter((item) => {
    return item.title != title;
  });
  saveNotes(newNoteObject);
  return items.length != newNoteObject.length;
};

var logOutput = (note) => {
  console.log("---");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getList,
  getNote,
  removeNote,
  logOutput
};
