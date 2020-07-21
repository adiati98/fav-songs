const express     = require('express')
const bodyParser  = require('body-parser')
const hbs         = require('hbs')
const path        = require('path')

require('./db/mongoose')
const songRouter = require('./routers/song')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(publicDirectoryPath))

// Import Routes
app.use(songRouter)


// homepage
app.get('/', (req, res) => {
  res.render('landing', {
    title: 'Song List',
    content: 'A list of my favorite songs of all time',
    name: 'Ayu Adiati'
  })
})


app.listen(port, () => console.log(`App listening on port ${port}!`))