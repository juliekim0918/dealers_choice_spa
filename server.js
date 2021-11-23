const express = require('express')
const app = express();
const path = require('path')
const {
    db,
    syncAndSeed,
    models: {
        Animal,
        Trainer
    }
} = require('./db')
app.use('/dist', express.static('dist'))
app.use('/api', require('./routes/api'))
app.use('/trainers', require('./routes/trainers'))
app.use(express.static('static'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

const init = async() => {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening in on ${port}`))
}

init()