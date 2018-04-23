const Artist = require('../models/Artist');

exports.post = (req, res) => {
  const artist = new Artist({ name: req.body.name, genre: req.body.genre });
  artist.save((err, artistCreated) => {
    res.json(artistCreated);
  });
};

exports.put = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
      if (err)
        res.send('Something went wrong');
      artist.name = req.body.name;
      artist.genre = req.body.genre;
      artist.save(function(err) {
        if (err)
          res.send(err);
          res.json({ message: 'Artist Updated!' });
      });
  });
};

exports.list = (req, res) => {
  Artist.find({}, (err, artists) => {
    if (err) {
      res.json('Something went wrong');
    }
    res.json(artists);
  });
};

exports.get = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    if (err) {
      res.json('Something went wrong');
    }
    res.json(artist);
  });
};

exports.delete = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    artist.remove;
    if (err) {
      res.json('Something went wrong');
    }
    res.json('Deleted');
  });
};
