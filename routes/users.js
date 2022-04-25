const User = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/routetest', async (req,res) => {
    res.send('User Route Test Succesful');
});

router.post('/register', async(req,res) => {

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('User already exists.'); 

    user = new User( _.pick(req.body, ['userName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send(_.pick(user, ['userName', 'email']));
});

router.put('/updatepassword', auth,  async (req,res) => {
   
    const user = await User.findById(req.user._id);
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    res.send('Password successfully changed !');
});

router.post('/login', async(req,res) => {

    let user = await User.findOne({email: req.body.email });
    if(!user) return res.status(400).send('Invalid email ID.');

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Email and password does not match.');

    const token = user.generateToken();
    res.send(token);
});

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;