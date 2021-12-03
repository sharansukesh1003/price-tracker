const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
});

exports.Product = mongoose.model('Product', productSchema);