const uuid = require('uuid');
const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const blogSchema =  mongoose.Schema({
  
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false }
  },
  created: { type: Date, required: true, default: Date.now} //publishDate || new Date(Date.now()).getDay()
}); 
   

blogSchema.methods.serialize = function () {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.author,
    created: this.created
  };
}

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;