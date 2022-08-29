const express = require('express');
require("dotenv").config({ path: "./config/.env" });
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const User = require("./models/userModel");

connectDB();

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require('cors')());

app.use('/api/pizzas', require('./routes/pizzasRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/orders', require('./routes/orderRoute'));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))