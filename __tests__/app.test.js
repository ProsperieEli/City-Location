require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async () => {
      execSync('npm run setup-db');
  
      //   await client.connect();
      //   const signInData = await fakeRequest(app)
      //     .post('/auth/signup')
      //     .send({
      //       email: 'jon@user.com',
      //       password: '1234'
      //     });
      
      //   token = signInData.body.token; // eslint-disable-line
      // }, 10000);
  
    // afterAll(done => {
    //   return client.end(done);
    });

    test('returning locations', async() => {

      const expectation = {
        'formatted_query': 'Seattle, King County, Washington, USA',
        'latitude': '47.6038321',
        'longitude': '-122.3300624'
      };

      const data = await fakeRequest(app)
        .get('/location?search=Seattle')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('Weather forecast', async() => {

      const expectation = [
        {
          'forecast': expect.any(String),
          'valid_date': expect.any(String)
        }];
        
      

      const data = await fakeRequest(app)
        .get('/weather?latitude=47.6062&longitude=122.3321')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });
    test('Reviews', async() => {

      const expectation = [{
        'name': expect.any(String),
        'image_url':  expect.any(String),
        'price':  expect.any(String),
        'rating': expect.any(Number),
        'url':  expect.any(String)
      }];

      
      const data = await fakeRequest(app)
        .get('/reviews?latitude=47.6062&longitude=-122.3321')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });
  });
});