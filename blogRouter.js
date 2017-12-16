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

BlogPosts.create('Hi I am a blog post. Sup?');
BlogPosts.create(`Hey, I am another blog post. What's 
happenin?`);


//handle the initial requests

app.get('/blog-posts', (req, res)=>{
    res.json(BlogPosts.get());
});

app.post('/blog-posts', (req, res)=>{
    
});

app.put('/blog-posts/:id', (req,res)=>{

});

app.delete('/blog-posts/:id', (req,res)=>{

});

app.listen(process.env.PORT || 8080, process.env.IP);