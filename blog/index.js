const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileupload=require('express-fileupload')
mongoose.connect('mongodb://localhost/my_database');
const BlogPost=require('./models/BlogPost');

const app = new express()
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());
app.use(fileupload());

app.set('view engine','ejs')
app.set('views', './views');

app.get('/', async (req,res) => {
    const blogposts= await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/contact', (req,res) => {
    res.render('contact')
})

app.get('/post', (req,res) => {
    res.render('post')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.get('/post/:id', async(req,res)=>{
    const blogpost= await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.post("/post/save", async (req,res)=>{
   console.log('saving post!');
   let img = req.files.image;
   img.mv(path.join(__dirname,"public/upload",img.name));
   const imgURL="/upload/" + img.name;
   const newPost = new BlogPost(req.body);
   newPost.image=imgURL;
   const result = await newPost.save();
   console.log(result);
   res.redirect('/');   
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
})