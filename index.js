const express = require('express')
const path = require('path')
const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mainRouter = require('./routes/main')
const userM = require('./middlewares/user')
const authRouter = require('./routes/auth')
const vars = require('./middlewares/vars')
const keys = require('./keys')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const tasks = new MongoSession({
  collection: 'session',
  uri: keys.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.secretKey,
  resave: false,
  saveUninitialized: false,
  tasks
}))
app.use(vars)

app.use(userM)
app.use('/', mainRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
async function start() {
  try {
    const url = keys.MONGODB_URI
    await mongoose.connect(url, {useNewUrlParser: true})

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
