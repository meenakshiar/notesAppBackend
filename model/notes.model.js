const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userID: { type: String, required: true },
  },
  { versionKey: false }
);

const NotesModel = mongoose.model("note", notesSchema);

module.exports = NotesModel;
