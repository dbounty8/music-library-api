const mongoose = require('mongoose');
const path = require('path');
const httpMocks = require('node-mocks-http');
const events = require('events');
const { post } = require('../../controllers/Artist');
const Artist = require('../../models/Artist');

require('dotenv').config({
  path: path.join(__dirname, '../../settings.env'),
});

beforeAll((done) => {
  mongoose.connect(process.env.TEST_DATABASE_CONN, done);
});

describe('Artist POST Endpoint', () => {
  it('should create a new Artist', (done) => {
    expect.assertions(2);
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/Artist',
      body: {
        name: 'Gold Panda',
        genre: 'Ambient',
      },
    });
    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter,
    });

    post(request, response);

    response.on('end', () => {
      let artistCreated = JSON.parse(response._getData()); //eslint-disable-line
      expect(artistCreated.name).toBe('Gold Panda');
      expect(artistCreated.genre).toBe('Ambient');
      done();
    });
  });
});

afterEach((done) => {
  Artist.collection.drop((e) => {
    if (e) {
      console.log(e);
    }
    done();
  });
});

afterAll(() => {
  mongoose.connection.close();
});

