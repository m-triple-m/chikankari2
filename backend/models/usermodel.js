const {Schema,model} = require('../connection')

// import Schema from 'mongoose'
const mySchema = new Schema({
    name:String,
    email : String,
    password : String,
    age: Number,
    verified : {type: Boolean, default: false},
    role : {type: String, default: 'user'},
    avatar: {type : String , default: 'avatar_placeholder.webp'}
})

module.exports = model('users',mySchema);


