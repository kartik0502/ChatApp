const express = require('express')
const app = express()
require('dotenv').config({ path: './backend/config/config.env' });

const databaseConnect = require('./config/database');
const authRoute = require('./routes/authRoute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger', authRoute);

const PORT = process.env.PORT ;
// console.log(process.env);

databaseConnect();


app.get('/', (req,res) => {
    res.send('This is from backend')
})
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})