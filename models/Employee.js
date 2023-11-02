const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
    name: String,
    age: Number,
    role: String,
    salary: Number,
    active: Boolean
})

module.exports = Employee