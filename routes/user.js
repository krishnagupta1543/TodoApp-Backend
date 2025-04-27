const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;
const zod = require('zod');
const { USER, TODO } = require('../db');
const { authMiddleware } = require('../authMiddleware');
const userRouter = express.Router();

const userPayload = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password:  zod.string()
})

userRouter.post('/signup', async (req, res)=>{
    const bodypayload = req.body;
    const parsed = userPayload.safeParse(bodypayload);

    if(!parsed.success){
        return res.status(400).json({
            message: "invalid entry"
        })
    }

    const userExist = await USER.findOne({userName: bodypayload.userName});

    if(userExist){
        return res.status(400).json({
            message: "user already exist"
        })
    }

    const user = await USER.create({
        userName: bodypayload.userName,
        firstName: bodypayload.firstName,
        lastName: bodypayload.lastName,
        password: bodypayload.password 
    })

    const token = jwt.sign({userId: user._id}, jwt_secret);

     await TODO.create({
        userId: user._id,
        todo: []
    })
    
    res.status(200).json({
        message: "user is sign up",
        token: token
    })
})

const userSpayload = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

userRouter.post('/signin', async (req, res)=>{
    const body = req.body;
    const parsed = userSpayload.safeParse(body);

    const {userName, password} = body;

    if(!parsed.success){
        return res.status(400).json({
            message: "invalid input"
        })
    }

    const exist = await USER.findOne({userName: userName, password: password});

    if(!exist){
        return res.status(400).json({
            message: "user don't exist"
        })
    }

    const token = jwt.sign({userId: exist._id}, jwt_secret);

    res.status(200).json({
        message: "successfully signin",
        token: token
    });
})

const todoPayload = zod.object({
    title: zod.string(),
    description: zod.string()
})

userRouter.put('/addTodo',authMiddleware, async(req, res)=>{
    const body = req.body;
    const parsed = todoPayload.safeParse(body);
    if(!parsed.success){
        return res.status(400).json({
            message: "invalid input"
        })
    }else{
        const update = await TODO.findOneAndUpdate(
            { userId: req.userId },
            {
              $push: {
                todo: {
                  title: body.title,
                  description: body.description
                }
              }
            },
            { new: true } 
        );
        if(!update){
            res.status(400).json(
                {
                    message:"update not successful"
                }
            )
        }
        res.status(200).json({
            message: "update successfull"
        })
    }
})

userRouter.get('/bulk', authMiddleware, async (req, res)=>{
    const userId = req.userId;

    const data = await TODO.findOne({userId: userId});

    if(!data){
        res.status(400).json({
            message: "unexpected error"
        })
    }

    res.status(200).json({
        todo: data.todo
    })
})

module.exports = {
    userRouter
}