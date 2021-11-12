const express=require('express');
const app = express();
const mongoose=require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors')
dotenv.config();
const PORT=5000;
app.use(cors())

mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log("database connected");
})
app.use(express.json());
app.use('/apicall',require('./routes/auth'));

app.listen(PORT,()=>{
    console.log("server is running sucusessfully!")
})