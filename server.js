const express = require("express")
const PORT = process.env.PORT || 2000
const sequelize = require("./database/database")
const productRouter = require('./Routes/productRoutes')
require("dotenv").config()
const app = express();

app.use(express.json())
app.use(productRouter)

const connectToDb = async()=>{
    try{
        await sequelize.authenticate()
        console.log("Database successfully connected")
    }catch(error){
        console.log("Conection failed", error.message)
    }
}
connectToDb()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})