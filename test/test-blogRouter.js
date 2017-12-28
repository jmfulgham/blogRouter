const chai= require('chai');
const chaiHttp= require('chai-http');

const {app, runServer, closeServer}= require('../server');
const should=chai.should();
chai.use(chaiHttp);

const blog= require('../models')


blog.create('Hi I am a blog post. Sup?');
blog.create(`Hey, I am another blog post. What\'\s 
happenin?`);


describe('blog',function(){
    before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    it('should list blogs on GET', () => chai.request(app)
        .get('/blog-posts').then((res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.an('object');
            const expectedKeys = ['id', 'title'];
            res.body.forEach((item) => {
                item.should.include.keys(expectedKeys);
                item.should.be.a('object');
                console.log(item);
            });
    
        }));

    it('should create a new blog on POST', () => {
        const newPost = { title: 'Smalls Biggie', content: 'Smalls Biggie\'s favorite rapper is Biggie Smalls' };
        return chai.request(app)
            .post('/blog-posts').send(newPost)
            .then((res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
            });
    });

    it('should delete a blog on DELETE', () => chai.request(app)
        .get('/blog-posts/')
        .then(res => chai.request(app)
            .delete(`/blog-posts/${res.body[0].id}`)
            .then((res) => {
                res.should.have.status(204);
            })));

    it('should update on PUT', () => chai.request(app)
        .get('/blog-posts/')
        .then(res => chai.request(app)
            .put(`/blog-posts/${res.body[0].id}`)
            .send({ id: res.body[0].id, 'title': "No Biggie", "content": "There will be no Biggie tonight" })
            .then((res) => {
                res.should.have.status(204);
            })));
     });
