const PORT = 8000
const express = require('express')
const axios = require('axios')
const cors = require("cors")

const corsOptions = {
    origin : '*', 
    credentials : true,          
    optionSuccessStatus : 200,
 } 

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.post('/', async (req, res) => {
    productLink = req.body.url
    useragent = req.body.userAgent
    axios.post('http://127.0.0.1:8080/amazon/', {
        prod_link : productLink
    }).then(response => {
        try {
            let productTitle = response.data.product_title
            let productPrice = response.data.product_price
            let parsing = response.data.success
            if(parsing == false){
                res.send({
                    code: 401,
                    message : "Something went wrong"
                })  
            }
            else{
                res.set({
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                })
                res.send({
                    code: 200,
                    product_title: productTitle,
                    product_price: productPrice,
                })
                console.log("success")
            }
        }
        catch(error){
            res.send({
                code : 401,
                message : "Something went wrong"
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is live on ${PORT}`)
})
