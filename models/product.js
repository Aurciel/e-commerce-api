const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
    price: {
        type: Number,
        required: true
    }
},
{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;