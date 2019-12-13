const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipieModel = new Schema(
  {
    title: { type: String },
    dishType: { type: String },
    genre: { type: String },
    made: { type: Boolean, default: false },
  }
);

module.exports = mongoose.model('Recipie', recipieModel);
