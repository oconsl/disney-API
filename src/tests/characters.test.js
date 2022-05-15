import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app.js'
import dotenv from 'dotenv'
dotenv.config()

const { TEST_TOKEN } = process.env

chai.should()
chai.use(chaiHttp)

const testId = 'aaaaa'

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
