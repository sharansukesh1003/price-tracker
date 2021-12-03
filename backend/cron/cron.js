const express = require('express')
var CronJob = require('cron').CronJob
const axios = require('axios')
const router = express.Router()
require('dotenv').config()
const cron = process.env.CRON

var job = new CronJob('*/60 * * * * *', function () {
    // axios.get('http://127.0.0.1:8000/pricetracker/v1/products/cronjobroute')
    // .then()
    console.log(`${cron}`)
});
job.start();

module.exports = job