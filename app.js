const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//LOAD CONFIG
dotenv.config({path: './config/config.env'});
connectDB();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//SET ROUTES
app.use('/', require('./routes/index'));

//SET PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server up on ${port}`);
})