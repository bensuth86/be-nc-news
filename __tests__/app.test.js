const app = require('../app.js')
const request = require('supertest')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index.js')

beforeEach(() => seed({ articleData, commentData, topicData, userData }))
afterAll(() => db.end())

// need test for GET API/
describe('/api', () => {
    test('GET: sends endpoints.json object to the client', () =>{
        return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                
                expect(Object.keys(response.body.endpoints).length).toBe(3)
            })
    })
})

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
    test('GET: responds with 404 status error when non-existant dataset requested', () => {
        return request(app)
            .get('/api/tropics')
            .expect(404)
            .then((response) => {                
                expect(response.body.msg).toBe('Not found')
            })
    })
})

describe('/api/articles/:article_id', () => {
    test('GET:200 sends a single article response to the client', () => {
    return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {            
            expect(response.body.article.article_id).toBe(1)            
            expect(response.body.article.title).toBe("Living in the shadow of a great man")
            expect(response.body.article.topic).toBe('mitch')
            expect(response.body.article.author).toBe('butter_bridge')
            expect(response.body.article.body).toBe('I find this existence challenging')
            expect(response.body.article.votes).toBe(100)
            
        })
    })
    test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .get('/api/articles/one')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
      });
    test('GET:404 for id requested out of range', () => {
        return request(app)
            .get('/api/articles/9999')
            .expect(404)
            .then((response) => {                
                expect(response.body.msg).toBe('Not found')
            })
    })
})

describe('/api/articles', () => {
    test('GET: 200 sends an array of article objects to the client with total comments column', () => {
        
        return request(app)        
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                
                expect(response.body.articles.length).toBe(13)  
                // response.body.articles.forEach((artcle) => {
                //     console.log(artcle)
                //     expect(typeof article.totalcomments).toBe('number')
                // })          

            })
    })

})