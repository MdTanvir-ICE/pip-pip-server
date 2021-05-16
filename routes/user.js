const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post =mongoose.model('Post')
const requiredLogin =require('../middleware/requireLogin');
const { post } = require('./auth');
const user = mongoose.model('User');

router.get('/profile/:id',requiredLogin,(req,res)=>{
    //console.log(req.params.id);
    user.findOne({_id:req.params.id})
    .select("-password")
    .then(user =>{
        console.log(user);
        Post.find({postedBy : req.params.id})
        .populate("postedBy","_id,name") 
        .exec((err,posts)=>{
            console.log(user,posts);
        if(err){
            return res.status(422).json({error:err})
        }
        
         res.json({user,posts})
         
        })
    })
    .catch(err =>{
        return res.status(404).json({
            error:"user not found"
        })
    })
})

router.put('/follow',requiredLogin,(req,res)=>{
    console.log("okk");
    user.findByIdAndUpdate(req.body.followId,{
       
        $push:{
            followers:req.user._id
        }
    },
    {
        new:true
    },
    (err, result)=>{
    if(err){
        return res.status(422).json({error:err})
    }
    
    user.findByIdAndUpdate(req.user._id,{
          $push:{
            following:req.body.followId
          }
    },{
        new:true
    })
    .select("-password")
    .then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
    })
})
router.put('/unfollow',requiredLogin,(req,res)=>{
    user.findByIdAndUpdate(req.body.unFollowId,{
        $pull:{
            followers:req.user._id
        }
    },
    {
        new:true
    },
    (err, result)=>{
    if(err){
        return res.status(422).json({error:err})
    }
    user.findByIdAndUpdate(req.user._id,{
          $pull:{
            following:req.body.unFollowId
          }
    },{
        new:true
    })
    .select("-password")
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
    })
})

router.put('/updatepic',requiredLogin,(req,res)=>{
    user.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
})


module.exports=router;