import express from "express"
import { signupUser } from "../../controllers/usersController.js"

const router = express.Router()

//SIGNUP USER
router.post('/signup', signupUser)

export {router}