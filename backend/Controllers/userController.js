
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";



//route POST/api/users/auth

export const authUser = asyncHandler (async (req,res) =>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }else{
        res.status(401);
        throw new Error('Invali Email or Password')
    }


});

//register

//route POST/api/users/auth

export const registerUser = asyncHandler (async (req,res) =>{

   const {name, email, password } = req.body
   console.log(req.body)
   
   const userExists = await User.findOne({email})

   if(userExists){
    res.status(400);
    throw new Error('User alredy exist');
   }
   const user = await User.create({
    name,
    email,
    password
   });

   if(user){


    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
        
    });
    
   }else{
    res.status(400);
    throw new Error('Invalid User Data');
   }
});


//logout

//route POST/api/users/auth

export const logoutUser = asyncHandler (async (req,res) =>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    });
    


res.status(200).json({message:'user logged out'});
});


//get user profile
//route POST/api/users/profile
//private

export const getUserProfile = asyncHandler (async (req,res) =>{
const user = {
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email
}
    console.log(req.user)
res.status(200).json({user});
});

//update user profile

//route POST/api/users/auth

export const updateUserProfile = asyncHandler (async (req,res) =>{
    const user = await User.findById(req.user._id);
    console.log(user)
    if(user){

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
       const updatedUser = await user.save();
       res.status(200).json({

        _id:updatedUser._id,
       name:updatedUser.name,
       email:updatedUser.email
       });
        
    }else{
        res.status(404);
        throw new Error('User not found')
    }

res.status(200).json({message:'Update User Profile'});
});


