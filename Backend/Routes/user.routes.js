import { Router } from "express";
import { guestEntry, loginUser, registerUser } from "../Controllers/user.controller.js";
import { jwtVerify } from "../Utils/jwtVerify.js";

const userRouter = Router()

userRouter.post('/register',registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/entry', guestEntry)
userRouter.post('/verify', jwtVerify)

export {userRouter}