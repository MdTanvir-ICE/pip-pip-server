//deopendencies

const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
const mongoose = require('mongoose');
const {MONGOURL} =require('./key');
require('dotenv').config();

console.log(process.env.DB_USER);
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo yeahh");
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting',err);
})


require('./module/user');
require("./module/post");


app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));




app.listen(PORT,()=>{
    console.log('Server is running on',PORT);
});