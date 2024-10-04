import express from "express"
import { signupUser, loginUser } from "../../controllers/usersController.js"

const router = express.Router()

//SIGNUP USER
router.post('/signup', signupUser)

//LOGIN USER
router.post('/login', loginUser)

export {router}