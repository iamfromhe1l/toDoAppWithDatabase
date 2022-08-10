const {Router} = require('express')
const router = Router()
const Task = require('../models/task')

router.get('/', async (req, res) => {
  const tasks = await Task.find().lean()
  res.render('index', {
    tasks
  })
})

router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    date: Date.now()
  })
  try {
    await task.save()
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
})

router.delete('/remove/:id', async (req, res) => {
  const id = req.params.id
  await Task.findByIdAndRemove(id)
  const tasks = await Task.find().lean()
  res.status(200).json(tasks)
})

module.exports = router