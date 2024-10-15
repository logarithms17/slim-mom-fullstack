import { Users } from "../models/usersModel.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

const { SECRET_KEY } = process.env

export const authenticateToken = async (req, res, next) => {
    
    const { authorization = "" } = req.headers
    const [bearer, token] = authorization.split(" ")


    if (bearer !== "Bearer") { //if the authorization is not bearer
        console.log(bearer)
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY) //extract user id from the token data
        console.log(id)

        const user = await Users.findById(id) //find user with the id from the token

        if (!user) {
            console.log("entered !user")
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized" })
    }
}
