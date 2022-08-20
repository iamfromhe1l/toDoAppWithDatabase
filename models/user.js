const {Schema, model} = require('mongoose')

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [
    {
      title: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

user.methods.addTask = function(title) {
  const tasks = this.tasks
  tasks.push({title, date: Date.now()})
  this.tasks = tasks
  return this.save()
}

user.methods.deleteTask = function(id) {
  let tasks = []
  this.tasks.forEach(e => {
    if (e._id != id) {
      tasks.push(e)
    }
  })
  console.log(tasks)
  this.tasks = tasks
  return this.save()
}

module.exports = model('User', user)