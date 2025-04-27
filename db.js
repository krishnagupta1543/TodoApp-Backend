const mongoose = require('mongoose');

// const dotenv = require('dotenv');
// dotenv.config();
// const url = process.env.MONGOOSE_URL;

const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGOOSE_URL;
mongoose.connect(url);


const userSchema = new  mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: String 
});
const todoSchema = new  mongoose.Schema({
    userId: {                         
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
    todo:[{title: String, description: String}],
    completed: Boolean
});

const USER = mongoose.model('users', userSchema);

const TODO = mongoose.model('todo', todoSchema);

module.exports = {
    USER,
    TODO
}