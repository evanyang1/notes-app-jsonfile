const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded( {extended: true }))
app.use(express.json())



app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, notes) => {
        if (err) console.log(err)
        
        
        const notesArr = JSON.parse(notes)
        
        console.log(notesArr)
        notesArr.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(notesArr), err => {
            if(err) console.log(err)

            res.sendStatus(200)
        })
    })
})

app.delete('/api/notes/:id', (req, res) => {
    console.log('hi')
    fs.readFile('./db/db.json', 'utf8', (err, notes) => {
        if (err) console.log(err)
        
        let notesArr = JSON.parse(notes)
        notesArr = notesArr.filter(note => note.title !== req.params.id)
        
        fs.writeFile('./db/db.json', JSON.stringify(notesArr), err => {
            if(err) console.log(err)

            res.sendStatus(200)
        })
    })
})

/// HTML Routes

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})





/// API Routes

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, notes) => {
        if (err) console.log(err)
        res.json(JSON.parse(notes))
    })
})


// BOTTOM
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(3000)