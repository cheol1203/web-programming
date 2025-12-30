const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database');

const newPost = new BlogPost({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty energy opens up. You know those bullet-point lists: "You start spotting them everywhere at this time of year! No, you go like this!"'
})

newPost.save()
    .then(savedDocument => {
        console.log('User saved successfully:', savedDocument);
    })
    .catch(err => {
        console.error('Error saving user:', err);
    })


console.log('shutting down');