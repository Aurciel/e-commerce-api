const users = require('./routes/users');
const products = require('./routes/products');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/ecommerceapi')
    .then( () => console.log('Connected to MongoDB...'))
    .catch( err => console.error('Could not connect to the database.'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/products', products);


app.listen(3000, () => console.log("Listening on Port 3000..."));