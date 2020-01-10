const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    username: {
        type: String,
        ref: 'User'
    },
    tweet: {
        type:String
    },
    image: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    }
})

const tweets = mongoose.model('Tweet',tweetSchema)
module.exports = tweets