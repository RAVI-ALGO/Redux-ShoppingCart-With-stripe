const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:30,
    },
    email: {
        type: String,
        required:true,
        minlength:3,
        maxlength:300,
        
    },
    password:{
        type: String,
        required:true,
        minlength:3,
        maxlength:300,
        
    },
    remember_token: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    }
});

UserSchema.set('timestamps', true);
UserSchema.plugin(uniqueValidator);
 module.exports = mongoose.model('users',UserSchema,'users');