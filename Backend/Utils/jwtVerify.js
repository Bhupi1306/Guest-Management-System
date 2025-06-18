import jwt from 'jsonwebtoken'

const jwtVerify = (req,res) => {
    try{
        const {token} = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Invalid Token", success: false})
        }

        return res.status(200).json({message: "User Verified", success: true, isAdmin: decoded.isAdmin})
    }
    catch{
        return res.status(401).json({message: "Invalid Token", success: false, error})
    }
}

export {jwtVerify}