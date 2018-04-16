const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const artist = require('./controllers/Artist.js');

console.log(artist);

require('dotenv').config({
  path: path.join(__dirname, './settings.env'),
});

const app = express();
mongoose.connect(process.env.DATABASE_CONN);
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello MongoDb!'));
app.post('/Artist', artist.post);

app.listen(3000, () => console.log('It works!'));
