const chai= require('chai');
const chaiHttp= require('chai-http');

const {app, runServer, closeServer}= require('../server');
const should=chai.should();
chai.use(chaiHttp);

describe('BlogPosts',function(){
    before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    it('should list blogs on GET', function(){
        return chai.request(app)
        .get('/blog-posts').then(function(res){
            res.should.have.status(200);
            // res.should.be.json;
            // res.should.be.a('array');
            // const expectedKeys=['title', 'content', 'author', 'publishDate'];
            // res.body.forEach(function(item){
            //     item.should.include.keys(expectedKeys);
            //     item.should.be.a(object);
            })
            .catch(function(error) { console.log(error); })

        });
    });

//     it('should create a new blog on POST', function(){

//     });

//     it('should delete a blog on DELETE',function(){

//     });

//     it('should replace/update the blog on PUT' function(){

//     });
 //})