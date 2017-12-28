//All required dependencies 
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose= require('mongoose');

//setting up Mongoose promise style
mongoose.Promise = global.Promise;

//importing variables from other files
const {PORT, DATABASE_URL}= require('./config');
const blog= require('./models');
const blogRouter= require(`./blogRouter`);


//routing and HTTP request settings
app.use('/', blogRouter);
app.use(morgan('common'));

//starting the server
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT){
  return new Promise((resolve,reject)=>{
    mongoose.connect(databaseUrl, {useMongoClient: true}, err =>{
      console.log('my dburl is: ', databaseUrl);
      if (err){
        return reject(err);
      }
    server = app.listen(port, ()=>{
      console.log(`Your app is listening on port ${port}`);
      resolve();
    })
    .on('error',err=>{
      mongoose.disconnect();
      reject(err);
      console.log(err);
    });
  });
});
}

//closing the server
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};
//exporting the server
module.exports = {app, runServer, closeServer};