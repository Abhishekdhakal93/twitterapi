const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name must be provided."]
    },
    email:{
        type:String,
        required:[true,"Email must be provided."],
        unique: [true,"Email is already taken."]
    },
    username: {
        type: String,
        minlength: 6,
        unique: [true,"Username is already taken."],
        required: [true,"Username must be provided."]
    },
    phone: {
        type: String,
        required: [true,"Phone Number must be provided."]
    },
    profile_picture: {
        type: String,
        default: 'profile.jpg'
    },
    cover_picture: {
        type: String,
        default: 'cover.jpg'
    },
    password: {
        type: String,
        required: [true,"Password field can not be empty."]
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    }
})

const users = mongoose.model('User',userSchema)
module.exports = users