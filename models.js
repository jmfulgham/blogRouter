const uuid = require('uuid');
const mongoose= require('mongoose');


const blogSchema =  mongoose.Schema({
  id: { type: String, required: true}, //uuid.v4() how to make sure this still generates?
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

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };