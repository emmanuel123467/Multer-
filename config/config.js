require("dotenv").config()

const user = process.env.DBUSERNAME
const name = process.env.DBNAME
const password = process.env.DBPASSWORD
const host = process.env.DBHOST


module.exports = {
  "development": {
    "username": user,
    "password": password,
    "database": name,
    "host": host,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
