const dotenv = require("dotenv")

dotenv.config()

// console.log(process.env.DB_CONNECT_STRING)

module.exports.dbConnectionString = process.env.DB_CONNECT_STRING