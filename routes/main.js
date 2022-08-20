const {Router} = require('express')
const router = Router()
const Task = require('../models/task')
const auth = require('../middlewares/auth')


router.get('/', auth, async (req, res) => {
  const tasks = await req.user.tasks
  res.render('index', {
    tasks
  })
})

router.post('/', auth, async (req, res) => {
  await req.user.addTask(req.body.title)
  res.redirect('/')
})

router.delete('/remove/:id', auth, async (req, res) => {
  const id = req.params.id
  await req.user.deleteTask(id)
  res.status(200).json(await req.user.tasks)
})

module.exports = router