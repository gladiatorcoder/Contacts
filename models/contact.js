const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    job: {
        type: String
    }
}) 

module.exports = mongoose.model('Contact', ContactSchema);