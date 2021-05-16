const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name :{
        type: 'string',
        required: true
    },
    email :{
        type: 'string',
        required: true
    },
    password :{
        type: 'string',
        required : true
    },
    pic:{
        type:'string',
        default:"https://res.cloudinary.com/dliu4iryp/image/upload/v1620900053/noimage_bq9gu0.jpg"
    
    },
    followers:[
        {
            type:'ObjectId',
            ref:"User"
        }
    ],
    following:[
        {
            type:'ObjectId',
            ref:"User"
        }
    ]
    

});

 mongoose.model('User',userSchema);