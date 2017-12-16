const express= require ('express');
const router= express.Router();
const morgan= require('morgan');
const bodyParser= require('body-parser');
const jsonParser=bodyParser.json();
const app= express();

//need to figure out how the include models
const { }= require('./models')
// log the http layer
app.use(morgan('common'));

//handle the initial requests

app.get('/blog-posts', (req, res)=>{

});

app.post('/blog-posts', (req, res)=>{
    
});

app.put('/blog-posts/:id', (req,res)=>{

});

app.delete('/blog-posts/:id', (req,res)=>{

});

