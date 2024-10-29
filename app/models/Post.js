const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    creatorId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Post', postSchema);