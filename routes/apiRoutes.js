//Dependencies
const router = require('express').Router();
const fs = require('fs');

//routes

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        dbEntry = JSON.parse(data);
        res.send(dbEntry);
    });
});


router.post('/notes', (req,res) => {
    const createNote = req.body;
    
    fs.readFile('./db/db.json', (err,data) => {
        if (err) throw err;
        dbEntry = JSON.parse(data);
        dbEntry.push(createNote);

        let num = 1;
        dbEntry.forEach((note, index) => {
            note.id = num;
            num++;
            return dbEntry;
        });
        stringNotes = JSON.stringify(dbEntry);

        fs.writeFile('./db/db.json', stringNotes, (err, data) => {
            if (err) throw err;
        });
    });
    res.send('Note Added!');
});


router.delete('/notes/:id', (req, res) => {
    const deleteNote = req.params.id;

    fs.readFile ('./db/db.json', (err, data) => {
        if (err) throw err;

        dbEntry = JSON.parse(data);

        for (let i = 0; i < dbEntry.length; i++) {
            if (dbEntry[i].id === Number(deleteNote)) {
                dbEntry.splice([i], 1);
            }
        }
        stringNotes = JSON.stringify(dbEntry);

        fs.writeFile('./db/db.json', stringNotes, (err, data) => {
            if (err) throw err;
        });
    });

    res.status(204).send();
});

module.exports = router;