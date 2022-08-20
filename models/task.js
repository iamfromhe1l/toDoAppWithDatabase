const {Schema, model} = require('mongoose')

const taskSchema = new Schema()

module.exports = model('Task', taskSchema)