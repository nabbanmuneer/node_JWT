const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type:String,
    require:true
  },
    coordinates: [{
        latitude:Number,
        logitude:Number
    }]
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;