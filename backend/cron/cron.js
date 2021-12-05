require('dotenv').config()
const { Product } = require('../models/productModel')
const transporter = require('../helpers/mailer')
var CronJob = require('cron').CronJob
const axios = require('axios')

// Cron (12 hours)
var job = new CronJob('0 0 */12 * * *', async () => {
    console.log("Started")
    const product = await Product.find().populate('user', 'email name')
    for (let i = 0; i < product.length; i++) {
        await axios.post('http://127.0.0.1:8080/amazon/', {
                prod_link: product[i].url
            })
            .then(async response => {
                try {
                    let parsing = response.data.success
                    if (parsing != false) {
                        let productPrice = response.data.product_price
                        if (product[i].price < productPrice) {
                            let mailOptions = {
                                from: 'Price Tracker',
                                to: product[i].user.email,
                                subject: `Hey there ${product[i].user.name}`,
                                text: `${product[i].title} is selling at a lower price! Here go check it out ${product[i].url}`
                            }
                            transporter.sendMail(mailOptions, (error, data) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + data.response);
                                }
                            });
                        } else {
                            console.log(product[i].title, productPrice + " didn't change")
                        }
                    }
                } catch (error) {
                    console.log(error)
            }
        })
    }
})
job.start()

module.exports = job