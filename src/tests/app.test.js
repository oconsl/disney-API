import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app.js'
import dotenv from 'dotenv'
dotenv.config()

const { TEST_TOKEN } = process.env

chai.should()
chai.use(chaiHttp)

const testId = 'aaaaa'

describe('Disney API - Movies', () => {
  //test GET
  describe('GET /movies', () => {
    it('It should GET all the movies', (done) => {
      chai
        .request(server)
        .get('/movies')
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  //test GET by ID - Invalid ID
  describe('GET /movies/:id', () => {
    it('It should NOT GET a movie - Invalid ID', (done) => {
      chai
        .request(server)
        .get(`/movies/${testId}`)
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  //test POST - Missing field
  describe('POST /movies', () => {
    it('It should NOT POST a movie - Missing field', (done) => {
      chai
        .request(server)
        .post('/movies')
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .send({
          title: 'title Placeholder',
          rate: 3,
          creation: '2000-01-01',
          characters: ['CharacterPlaceholder'],
          genres: ['GenrePlaceholder']
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.error.text.should.be.eq(
            'Error validating request body. "imageUrl" is required.'
          )
          done()
        })
    })
  })

  // test POST - Invalid values
  describe('POST /movies', () => {
    it('It should NOT POST a movie - Invalid values', (done) => {
      chai
        .request(server)
        .post('/movies')
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .send({
          imageUrl: 'ImagePlaceholder.png',
          title: 123456789,
          creation: '2000-01-01',
          rate: 3,
          characters: ['CharacterPlaceholder'],
          genres: ['GenrePlaceholder']
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.error.text.should.be.eq(
            'Error validating request body. "title" must be a string.'
          )
          done()
        })
    })
  })
})

describe('Disney API - Characters', () => {
  //test GET
  describe('GET /characters', () => {
    it('It should GET all the characters', (done) => {
      chai
        .request(server)
        .get('/characters')
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  //test GET by ID - Invalid ID
  describe('GET /characters/:id', () => {
    it('It should NOT GET a character - Invalid ID', (done) => {
      chai
        .request(server)
        .get(`/characters/${testId}`)
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  //test POST - Missing field
  describe('POST /characters', () => {
    it('It should NOT POST a character - Missing field', (done) => {
      chai
        .request(server)
        .post('/characters')
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .send({
          name: 'Name Placeholder',
          weight: 75,
          history: 'History Placeholder.',
          movies: ['MoviePlaceholder']
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.error.text.should.be.eq(
            'Error validating request body. "imageUrl" is required. "age" is required.'
          )
          done()
        })
    })
  })

  // test POST - Invalid values
  describe('POST /characters', () => {
    it('It should NOT POST a character - Invalid values', (done) => {
      chai
        .request(server)
        .post('/characters')
        .set({ Authorization: TEST_TOKEN, Accept: 'application/json' })
        .send({
          imageUrl: 'ImagePlaceholder.png',
          name: 'Name Placeholder',
          age: 'WRONG VALUE - INTEGER EXPECTED',
          weight: 75,
          history: 'History Placeholder.',
          movies: ['MoviePlaceholder']
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.error.text.should.be.eq(
            'Error validating request body. "age" must be a number.'
          )
          done()
        })
    })
  })
})
