const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id, email: this.email, isAdmin: this.isAdmin}, 'SecretKey');
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;