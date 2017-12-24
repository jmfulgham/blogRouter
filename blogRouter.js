const express= require ('express');
const router= express.Router();
const morgan= require('morgan');
const bodyParser= require('body-parser');
const jsonParser=bodyParser.json();
const app= express();


//need to figure out how the include models
const {BlogPosts}= require('./models')
// log the http layer
app.use(morgan('common'));

//create a couple blog posts

BlogPosts.create('Hi I am a blog post. Sup?',"We need more testing","So here it is");
BlogPosts.create(`Hey, I am another blog post. What's happenin?`, 'You good?', "Yup, we chillin");
//console.log(BlogPosts);

//handle the initial requests

router.get('/blog-posts', (req, res)=>{
    res.json(BlogPosts.get());
    
});

router.post('/blog-posts', jsonParser, (req, res)=>{
    const requiredFields=['title'];
    for (let i=0; i<requiredFields.length; i++){
        const field=requiredFields[i];
        if (!(field in req.body)){
            const message = `Missing ${field} in blog post request body`;
            console.error(message);
            return res.status(400).send(message);
        }

        console.log(`Creating your blog!`);
        const newPost= BlogPosts.create(req.body.title, req.body.content, 
            req.body.author, req.body.publishDate);
        res.status(201).json(newPost);
    }

   
});

router.put('/blog-posts/:id', jsonParser, (req,res)=>{
    const requiredFields=['id', 'title'];
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
    BlogPosts.update({
        id: req.params.id,
        title:req.body.title,
        publishDate:req.body.publishDate
    });
    res.status(204).end();
});

router.delete('/blog-posts/:id', (req,res)=>{

BlogPosts.delete(req.params.id);
console.log(`I, ${req.params.id} have been deleted`);
res.status(204).end();

});



module.exports= router;
