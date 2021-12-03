const { Product } = require('../models/productModel')
const { User } = require('../models/userModel')
const axios = require('axios')
const express = require('express')
const router = express.Router()

//get user products
router.get('/mylist/:id', async (req, res) => {
    const userProductList = await User.find({
            user: req.params.id
        })
        .populate('products')
        .sort({
            'dateOrdered': -1
        }) // Reverse the result    
    if (!userProductList) {
        return res
            .status(500)
            .send({
                message: "Something went wrong",
                success: false
            })
    } else {
        return res.send({
            success: true,
            orders: userProductList
        });
    }
})

// add new product
router.post('/add', async (req, res) => {
    let productLink = req.body.url
    let useragent = req.body.userAgent
    axios.post('http://127.0.0.1:8080/amazon/', {
        prod_link : productLink
    }).then(async response => {
        try {
            let productTitle = response.data.product_title
            let productPrice = response.data.product_price
            let parsing = response.data.success
            let user = req.body.user
            if(parsing == false){
                res.send({
                    code: 401,
                    message : "Something went wrong"
                })  
            }
            else {
                let product = new Product({
                    title : productTitle,
                    price : productPrice,
                    user : user,
                    url : productLink
                })
                product = await product.save()
                if(!product){
                    return res
                    .status(400)
                    .send({
                        message : "Oops! Something went wrong, try again later."
                    })
                }
                else {
                    return res
                    .status(400)
                    .send({
                        product: product,
                        message : "The Product was added succesfully, we will let you know when the price drops !"
                    })
                }
            }
        }
        catch(error){
            console.log(error)
            return res.send({
                code : 404,
                message : error
            })
        }
    })
})

// delete product
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        let product = await Product.findByIdAndRemove(req.params.id)
        if (product) {
            return res.
            status(200).
            send({
                message: "Succesfully deleted product.",
                success: true
            })
        } else {
            return res.
            status(404).
            send({
                message: "Product not found!",
                success: false
            })
        }
    } catch (err) {
        return res.
        status(400).
        send({
            error: err,
            success: false
        })
    }
})

module.exports = router