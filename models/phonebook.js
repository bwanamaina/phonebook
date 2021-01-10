const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('PhoneBook', phoneSchema)