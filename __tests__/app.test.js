const app = require('../app.js')
const request = require('supertest')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index.js')

beforeEach(() => seed({ articleData, commentData, topicData, userData }))
afterAll(() => db.end())

describe('/api/topics', () => {
    test('GET: 200 sends an array of topics to the client', () => {
        
        return request(app)        
            .get('/api/topics')
            .expect(200)
            .then((response) => {                
                expect(response.body.topics.length).toBe(3)
                response.body.topics.forEach((topic) => {                    
                    expect(typeof topic.description).toBe('string')
                    expect(typeof topic.slug).toBe('string')
                })
            })
    })
    test.skip('GET: 404 responds with status: error when non-existant dataset requested', () => {
        return request(app)
            .get('/api/tropics')
            .expect(404)
            .then((response) => {                
                expect(response.body.msg).toBe('Not found')
            })
    })
})
