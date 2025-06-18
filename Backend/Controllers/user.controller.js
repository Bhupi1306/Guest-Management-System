import {User} from "../Models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {googleAuth} from "../Utils/googleAuth.js"

const registerUser = async (req,res) => {
    try {
        const {fullName, email, password} = req.body
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required", success: false})
        }

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if(!emailRegex.test(email)){
            return  res.status(400).json({message: "Please check email Format", success: false})
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
            return res.status(201).json({message: "User created Successfully", success: true})
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
            {_id: user._id, fullname: user.fullName, isAdmin: user.isAdmin },
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

const guestEntry = async (req,res) => {
    try {
        const {name, mobile, city, meetWith, purpose, inTime, outTime} = req.body
        spreadsheetId = '1f32tNX1J8SVMbEnMLzKKfn-uOXK_Vh1xeMoE5ebLs-4'
        const doc = await googleAuth(spreadsheetId)

    } catch (error) {
        
    }
}

export {
    registerUser,
    loginUser,
    guestEntry
}