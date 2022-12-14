const express = require('express');
const userController = require("../controller/userController");
const userRouter = express.Router(); 

userRouter.get('/', async(req, res, next) => {
    user = await userController.get(req.headers);
    res.status(200).send(user);
})
    
userRouter.post('/login', async(req, res, next) => {
    console.log(req)
    user = req.body
    //user = await userController.login(req.headers);
    res.status(200).send(user);
})

userRouter.post('/register', async(req, res, next) => {
    user = await userController.register(req.body);
    res.status(200).send(user);
})

userRouter.post('/updateserial', async(req, res, next) => {
    user = await userController.updateSerial(req.body);
    res.status(200).send(user);
})

userRouter.get('/verifytoken', async(req, res, next) => {
    user = await userController.verifyToken(req.headers.token);
    res.status(200).send(user);
})

module.exports = userRouter;