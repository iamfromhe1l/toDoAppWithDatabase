const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const mainRouter = require('./routes/main')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', mainRouter)

const PORT = process.env.PORT || 3000
async function start() {
  try {
    const url = `mongodb+srv://<username>:<password>cluster0.isk5mrn.mongodb.net/tasks`
    await mongoose.connect(url, {useNewUrlParser: true})

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
