const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://localhost/recipieAPI');
const port = process.env.PORT || 3000;

const Recipie = require('./models/recipieModel')
const recipieRouter = require('./routes/recipieRouter')(Recipie);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/recipies', recipieRouter);
//app.use('/api', recipieRouter);  


app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
