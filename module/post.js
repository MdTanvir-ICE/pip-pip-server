const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    
    title:{
       type:'string',
       required: true
    },
    body:{
        type:'string',
        required: true
    },
    photo:{
        type:'string',
        required: true
        //default:"no photo"
    },
    likes:[{
        type:'ObjectId',
        ref:"User",
    }],
    comments:[{
        text:'string',
        postedBy:{
            type:'ObjectId',
            ref:"User",
        }
    }],
    postedBy:{
       type:'ObjectId',
       ref:"User"
    }
   

})
mongoose.model("Post",postSchema);