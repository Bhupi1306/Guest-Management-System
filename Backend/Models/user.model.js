import monogoose from "mongoose"

const userSchema = new monogoose.Schema({

    fullName:{
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

export const User = monogoose.model("User", userSchema)