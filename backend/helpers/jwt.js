const expressJwt = require('express-jwt')

function authJwt() {
    const secret = process.env.SECRET
    const api = process.env.API_URL
    const cron = process.env.CRON_ROUTE
    return expressJwt({
        secret: secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users/register`,
            `${cron}`
        ]
    })
}

module.exports = authJwt