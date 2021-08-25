const router = require('express').Router();
//const uniqid = require('uniqid'); 
const { filterByQuery, findById, createNewNotes, validateNotes } = require('../../lib/notes');

const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    console.log(results);
    if (req.query) {
      results = filterByQuery(req.query, results);
      //console.log(results);
    }
    res.json(results);
  });


  router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

  router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    console.log(notes);
    req.body.id = notes.length.toString();
  
    if (!validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
      } else {
        //   console.log('Test NewNote');
        //   console.log(req.body)
        const note = createNewNotes(req.body, notes);

        res.json(note);
      }
    });
    

  module.exports = router;