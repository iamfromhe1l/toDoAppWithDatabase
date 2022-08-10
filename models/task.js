const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Task', taskSchema)