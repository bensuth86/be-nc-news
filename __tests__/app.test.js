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

describe('/api/users', () => {
    test('GET: 200 sends an array of users to the client', () => {
        
        return request(app)        
            .get('/api/users')
            .expect(200)
            .then((response) => {                
                expect(response.body.users.length).toBe(4)
                response.body.users.forEach((user) => {                    
                    expect(typeof user.username).toBe('string')
                    expect(typeof user.name).toBe('string')
                    expect(typeof user.avatar_url).toBe('string')
                })
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
    test('PATCH:200 updates the votes property', () => {
        updateVotes = { inc_votes: 1 }
        return request(app)
            .patch('/api/articles/1')
            .send(updateVotes)
            .expect(200)
            .then((response)=>{
                                
                expect(response.body.articles.votes).toBe(101)
            })
    })
    test('PATCH:400 bad article_id', () => {
        updateVotes = { inc_votes: 1 }
        return request(app)
            .patch('/api/articles/ONE')
            .send(updateVotes)
            .expect(400)

    })
    test('PATCH:400 inc_votes not a number', () => {
        updateVotes = { inc_votes: 'ten' }
        return request(app)
            .patch('/api/articles/1')
            .send(updateVotes)
            .expect(400)

    })
    test('PATCH:404 for id requested out of range', () => {
        return request(app)
            .patch('/api/articles/9999')
            .send(updateVotes)
            .expect(404)
            .then((response) => {                
                expect(response.body.msg).toBe('Not found')
            })
    })
})

describe.skip('/api/articles/:article_id/comment_count', () => {
    test('GET: 200 sends an array of articles filtered by topic query', () => {
// 
        return request(app)
            .get('/api/articles/:article_id?comment_count')
            .expect(200)
            .then((response) => {
                
                expect(response.body.articles.length).toBe(1)
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

describe('/api/articles/topic', () => {
    test('GET: 200 sends an array of articles filtered by topic (cats) query', () => {

        return request(app)
            .get('/api/articles?topic=cats')
            .expect(200)
            .then((response) => {
                
                expect(response.body.articles.length).toBe(1)
            })
    })
    test('GET: 200 sends an array of articles filtered by topic (mitch) query', () => {

        return request(app)
            .get('/api/articles?topic=mitch')
            .expect(200)
            .then((response) => {
                
                expect(response.body.articles.length).toBe(12)
            })
    })
    test('GET: 200 when a topic exists however no articles associated with the topic currently ', () => {

        return request(app)
            .get('/api/articles?topic=paper')
            .expect(200)
            .then((response) => {
                
                expect(response.body.articles.length).toBe(0)
            })
    })
    test.skip('GET:404 if non-existent topic queried', () => {
        return request(app)
            .get('/api/articles?topic=dogs')
            .expect(404)
            .then((response) => {                
                expect(response.body.msg).toBe('Not found')
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
    test('GET:for existing article with no comments return 200 with an empty array', () => {
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
    // testing for 404 error- user posts to comment out of range
})
describe('/api/comments/:comment_id', () => {
    
    test('DELETE 204 status- delete comment by comment_id with no response body', () => {

        return request(app)
            .delete('/api/comments/1')
            .expect(204)
    })
    test('DELETE:404 responds with an appropriate status and error message when given a non-existent id', () => {
        return request(app)
          .delete('/api/comments/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not found');
          });
      });
      test('DELETE:400 responds with an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .delete('/api/comments/one')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
      });

})

