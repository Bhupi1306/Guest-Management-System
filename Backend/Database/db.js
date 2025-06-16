import mongoose from "mongoose"

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}GMS`)
        console.log("Database Connected")
        
    } catch (error) {
        console.log("Database Connection Error: " + error)
        process.exit(1)
    }
}

export default connectDb