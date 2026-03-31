import JWT from 'jsonwebtoken'
import userModel from '../models/userModels.js'

export const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(!token) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized user"
            })
        }

        if (!token) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized user (invalid token format)",
          })
        }

        const decode=JWT.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Error in isUser authMiddleware",
            error
        })
    }
}


export const isAdminn = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id)
        
        if(!user.isAdmin) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access of admin authority"
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success: false,
            message: "Error in isAdmin authMiddleware",
            error
        })
    }
}