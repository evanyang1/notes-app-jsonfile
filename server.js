const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded( {extended: true }))
app.use(express.json())



app.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, notes) => {
        if (err) console.log(err)
        
        const notesArr = JSON.parse(notes)
        notesArr.push(req.body)
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})




/// API Routes

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, notes) => {
        if (err) console.log(err)
        res.json(JSON.parse(notes))
    })
})


app.listen(3000)