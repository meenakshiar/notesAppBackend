const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NotesModel = require("../model/notes.model");
const { auth } = require("../middleware/auth.middleware");
const notesRouter = express.Router();


// particular user data
notesRouter.get("/", auth, async (req, res) => {
  const { userID } = req.body;
  try {
    const notes = await NotesModel.find({ userID })
    res.send(notes);
  } catch (err) {
    res.send({
      msg: "somthing went wrong! cannot Get notes details",
      error: err.message,
    });
  }
});

// add notes details 
notesRouter.post("/add", auth, async (req, res) => {
  //   res.send(req.body);
  try {
    const notes = new NotesModel(req.body);
    await notes.save();
    res.send({ msg: "Notes has been added successfully" });
  } catch (err) {
    res.send({
      msg: "something went wrong! cannot add the notes",
      error: err.message,
    });
  }
});

// update
notesRouter.patch("/update/:id", auth, async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await NotesModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ msg: `Notes with ID: ${ID} has been updated successfully` });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot update", error: err.message });
  }
});

// delete
notesRouter.delete("/delete/:id", auth, async (req, res) => {
  const ID = req.params.id;
  try {
    await NotesModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: `Notes with ID: ${ID} has been deleted successfully` });
  } catch (err) {
    res.send({ msg: "Something went wrong! cannot delete", error: err.message });
  }
});

module.exports = notesRouter;
