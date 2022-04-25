const Product = require('../models/product');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/routetest', async (req, res) => {
    res.send('Product route test successful.');
});

router.get('/', async (req, res) => {
    const products = await Product
        .find()
        .select({'title':1 , 'desc':2, 'price':3})
        .sort('title');
    //let productlist = [];
    /*products.forEach((product) => {
        productlist.push(_.pick(product, [ 'title', 'desc','price']));
    });*/
    res.send(products);
});

router.post('/', async (req, res) => {

    let product = await Product.findOne({ title: req.body.title});
    if(product) return res.status(400).send('Product already exists in database.');

    product = new Product({
        title: req.body.title,
        desc: req.body.desc, 
        price: req.body.price,
        categories: req.body.categories
    });

    await product.save();
    res.send(_.pick(product, ['title', 'desc']));
});

module.exports = router;