const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('auth/login')
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  const candidate = await User.findOne({email})

  if (candidate) {
    const areSame = password === candidate.password
    
    if (areSame) {
      const user = candidate
      req.session.user = user
      req.session.isAuthenticated = true
      req.session.save(err => {
        if (err) {
          throw err
        }
        res.redirect('/')
      })
    } else {
      res.redirect('/login#login')
    }
  } else {
    res.redirect('/login#login')
  }
})

router.post('/register', async (req, res) => {
  const {name, email, password} = req.body
  const candidate = await User.findOne({email})
  if (candidate) {
    res.redirect('/auth#register')
  } else {
    const user = new User({
      name,
      email,
      password,
      tasks: []
    })
    user.save()
    res.redirect('/auth#login')
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth#login')
  })
})

module.exports = router