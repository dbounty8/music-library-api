const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const artistController = require('./controllers/Artist.js');


require('dotenv').config({
  path: path.join(__dirname, './settings.env'),
});

const app = express();
mongoose.connect(process.env.DATABASE_CONN);
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello MongoDb!'));
app.post('/Artist', artistController.post);
app.get('/Artist', artistController.list);
app.get('/Artist/:artistId', artistController.get);

app.listen(3000, () => console.log('It works!'));
