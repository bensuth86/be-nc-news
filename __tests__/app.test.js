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
                response.body.articles.forEach((artcle) => {
                    expect(typeof artcle.title).toBe('string')
                    expect(typeof artcle.topic).toBe('string')
                    expect(typeof artcle.author).toBe('string')
                    expect(typeof artcle.body).toBe('string')
                    expect(typeof artcle.created_at).toBe('string')
                    expect(typeof artcle.votes).toBe('number')
                    expect(typeof artcle.article_img_url).toBe('string')                    
                    expect(typeof artcle.comments).toBe('string')
                })          

        })
    })

})

describe('/api/articles/:article_id/comments', () => {
    test('GET: 200 response with an array of comments for given article_id- sorted by date created', () => {
        
        return request(app)        
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {                  
                expect(response.body.comments).toBeSortedBy('created_at', { descending: true })              
                response.body.comments.forEach((comment) => {                    
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.body).toBe('string')
                    expect(typeof comment.article_id).toBe('number')
                })
        })
    })
    test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .get('/api/articles/one/comments')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
      });
    test('GET:404 for id requested out of range', () => {
        return request(app)
            .get('/api/articles/9999/comments')
            .expect(404)
            .then((response) => {                
                expect(response.body.msg).toBe('Not found')
            })
    })
    test.skip('GET:for existing article with no comments return 200 with an empty array', () => {
        return request(app)
            .get('/api/articles/2/comments')
            .expect(200)            
            .then((response) => {
                const expected = []         
                expect(response.body.article).toEqual(expect.arrayContaining(expected))
            })
    })
    test('POST:201 add a new comment to comments.js and return back to the client', () => {
        const newComment = {          
          body: 'I love trolls',
          username: 'rogersop',
        }
        
        return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(201)
          .then((response) => {                   
              expect(response.body.comment.author).toBe('rogersop');
              expect(response.body.comment.body).toBe('I love trolls');
          });
        });
    test('POST:400 responds with 400 error message when comment provided in invalid data type or (no object)', () => {

        return request(app)       
            .post('/api/articles/2/comments')      
            .send({
                username: 'Bob'
            })
            .expect(400)      
            .then((response) => {
            
            expect(response.body.msg).toBe('Bad request');
            });
        });
    
})

describe('/api/articles/:article_id/comments', () => {


  });