const express= require ('express');
const router= express.Router();
const morgan= require('morgan');
const bodyParser= require('body-parser');
const jsonParser=bodyParser.json();
const app= express();
app.use(morgan('common'));//should this be router.use?
const {Blog}= require('./models')
const uuid = require('uuid');

//handle the initial requests

router.get('/blog-posts', (req, res)=>{
    Blog
    .find()
    .then(blog=>{
        res.json({
            blog: blog.map(
                (blog)=>blog.serialize())
        });
    })
   
    .catch (err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/blog-posts/:id', (req, res)=>{
    Blog
    .findById(req.params.id)
    .then(blog =>
    res.json(blog.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
    });

router.post('/blog-posts', jsonParser, (req, res)=>{
    const requiredFields=['title', 'content'];
    for (let i=0; i<requiredFields.length; i++){
        const field=requiredFields[i];
        if (!(field in req.body)){
            const message = `Missing ${field} in blog post request body`;
            console.error(message);
            return res.status(400).send(message);
        }
        Blog.create({
            id: uuid.v4(),
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            created: req.body.create
        });
    }
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
    Blog.update({
        id: req.params.id,
        title:req.body.title,
        content:req.body.content,
        created:req.body.created
    });
    res.status(204).end();
});

router.delete('/blog-posts/:id', (req,res)=>{

BlogPosts.delete(req.params.id);
console.log(`I, ${req.params.id} have been deleted`);
res.status(204).end();

});


module.exports= router;
