//Dependencies
const router = require('express').Router();
const fs = require('fs');
const data = JSON.parse(fs.readFileSync("./db/db.json", 'utf8'));

//routes

router.get('api/notes', (req, res) => {
    res.json(data);

});

router.get('/api/notes/:id', (req, res) => {
    res.json(data[Number(req.params.id)]);
});

router.post('/api/notes', (req,res) => {
    let createNote = req.body;
    let uniqueId = (data.length).toString();

    createNote.id = uniqueId;
    data.push(createNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(data), (err) => {
        if (err) throw (err);

    });

    res.json(data);
});

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let newId = 0;

    console.log("Currently deleting with id ${noteId}");
    data.data.filter(currentNote => {
        return currentNote.id !== noteId;
    });
    for (currentNote of data) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(data), (err) => {
        if (err) throw (err);
    });

    res.json(data);
});

module.exports = router;