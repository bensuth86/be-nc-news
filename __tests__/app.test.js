const app = require('../app.js')
const request = require('supertest')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index.js')

beforeEach(() => seed({ articleData, commentData, topicData, userData }))
afterAll(() => db.end())

describe('/api/topics', () => {
    test('GET: 200 sends an array of topics to the client', () => {
        // console.log(testData)
        return request(app)        
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                console.log('----> res', response.body)
                expect(response.body.topics.length).toBe(3)
                response.body.topics.forEach((topic) => {                    
                    expect(typeof topic.description).toBe('string')
                    expect(typeof topic.slug).toBe('string')
                })
            })
    })
})
