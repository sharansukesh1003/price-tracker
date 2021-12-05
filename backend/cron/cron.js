const express = require('express')
var CronJob = require('cron').CronJob
const axios = require('axios')
require('dotenv').config()

//constants
const cronToken = process.env.CRON_TOKEN
const cron = process.env.CRON

var job = new CronJob('*/10 * * * * *', async () => {
    console.log("Started")
    try {
        axios.get(`http://127.0.0.1:8000${cron}`, {
            headers: {
                "Authorization": `Bearer ${cronToken}`
            }
        })
        console.log("Success")
    } catch (error) {
        console.log(error)
    }
})
// job.start()

module.exports = job