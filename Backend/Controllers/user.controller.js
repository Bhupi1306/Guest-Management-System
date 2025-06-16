import {User} from "../Models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async (req,res) => {
    try {
        const {fullName, email, password} = req.body
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required", success: false})
        }
    
        const findUser = await User.findOne({email})
        if(findUser){
            return res.status(406).json({message: "Email already Exists", success: false})
        }
    
        const newUser = new User({
            fullName,
            email,
            password
        })
    
        newUser.password = await bcrypt.hash(password,10)
        const createdUser = await newUser.save()
    
        if (createdUser) {            
            return res.status(201).json({message: "User created Successfully", success: true, token: jwtToken})
        }

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", success: false, error})
    }
    
}

const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            return res.status(403).json({message: "Invalid email or password",  success: false})
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if(!isPasswordEqual) {
            return res.status(403).json({message: "Invalid email or password",  success: false})
        }

        const jwtToken =  jwt.sign(
            { email: user.email, _id: user._id, fullname: user.fullName },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )


        return res.status(200).json(
            {
                message: "Login successfull",
                success: true,
                jwtToken,
                name: user.fullName,
            }
        )
    } catch (error) {
        res.status(500).json({message: "Internal servers error", error, success: false})
    }
}

export {
    registerUser,
    loginUser
}