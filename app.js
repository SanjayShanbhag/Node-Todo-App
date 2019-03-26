const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
  describe: 'Title of The New Node',
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: 'Body of The New Note',
  demand: true,
  alias: 'b'
}

var args = yargs
.command('add', 'Adding a New Note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List All The Notes')
.command('read', 'Read a Particular Note', {
  title: titleOptions
})
.command('remove', 'Remove a Particular Note', {
  title: titleOptions
})
.help()
.argv;
var command = args._[0];

if (command === 'add') {
  var note = notes.addNote(args.title, args.body);
  if(note === undefined){
    console.log(`${args.title} is already in use! Change to another title!`);
  }else{
    console.log(`${note.title} was added successfully!`);
    notes.logOutput(note);
  }
} else if (command === 'list') {
  var allNotes = notes.getList();
  allNotes.forEach((note) => {
    notes.logOutput(note);
  });
} else if (command === 'read') {
  var requiredNote = notes.getNote(args.title);
  if(requiredNote){
    console.log("Note Found");
    notes.logOutput(requiredNote);
  } else {
    console.log("Note Does Not Exist");
  }
} else if (command == 'remove') {
  var notesRemoved = notes.removeNote(args.title);
  var message = notesRemoved ? 'Note Was Removed!' : 'Note Was Not Found';
  console.log(message);
} else {
  console.log('Command is unrecognised!');
}
