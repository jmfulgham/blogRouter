const express= require ('express');
const router= express.Router();
const morgan= require('morgan');
const bodyParser= require('body-parser');
const jsonParser=bodyParser.json();
const app= express();
router.use(morgan('common'));
const blog= require('./models');
const uuid = require('uuid');

//handle the initial requests

router.get('/blog-posts', (req, res)=>{
    blog
        .find((error, blog) => {
            if (error) {
                next(error);
            }
            else { console.log(blog) };

        })
        .then(blog => {
            res.json({
                blog: blog.map(function(blog){
                    return blog;
                })
                   
            });
        })
   
    .catch (err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/blog-posts/:id', (req, res)=>{
    blog
    .findById(req.params.id)
    .then(blog =>
    res.json(blog.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
    });

router.post('/blog-posts', jsonParser, (req, res)=>{
    const requiredFields=['title', 'content','author'];
    for (let i=0; i<requiredFields.length; i++){
        const field=requiredFields[i];
        if (!(field in req.body)){
            const message = `Missing ${field} in blog post request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
        const newBlog= new  blog ({
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            created: req.body.create
        });

        newBlog.save((error) => { 
            if (error) { console.log(error); }
             else { console.log('success'); 
                  }
        }); 
});

router.put('/blog-posts/:id', jsonParser, (req,res)=>{
    const requiredFields=['id'];
    for (let i=0; i < requiredFields.length; i++){
        const field=requiredFields[i];
        if (!(field in req.body)) {
            const message= `Missing ${field} in your request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id){
        const message=`Request path id ${req.params.id} must match
        ${req.body.id}`;
        console.error(message);
        return res.status(400).send(message);
    }

    console.log(`Updating the blog post ${req.params.id} now`)
    blog.update({
        id: req.params.id,
        title:req.body.title,
        content:req.body.content,
        created:req.body.created
    });
    res.status(204).end();
});

router.delete('/blog-posts/:id', (req,res)=>{

blog.delete(req.params.id);
console.log(`I, ${req.params.id} have been deleted`);
res.status(204).end();

});


module.exports= router;
