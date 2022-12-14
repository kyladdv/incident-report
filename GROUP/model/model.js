const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },

    incidentnumber : {
        type: String,
        required: true,
        unique: true
},
    employeeID : {
        type: String,
        required: true,
        unique: true
},
    location : {
        type: String,
        required: true,
},

    description : {
        type: String,
        required: true,
},

    status : String
});

module.exports = mongoose.model('Incident Report', schema);