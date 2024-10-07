import express from "express"
import { signupUser, loginUser, logoutUser, addCalorieCalculation, addConsumedProduct } from "../../controllers/usersController.js"
import { authenticateToken } from "../../middlewares/auth.js"

const router = express.Router()

//SIGNUP USER
router.post('/signup', signupUser)

//LOGIN USER
router.post('/login', loginUser)

//LOGOUT USER
router.post('/logout', authenticateToken, logoutUser)

//UPDATE USER INFO

router.post('/addCalorieCalculation', authenticateToken, addCalorieCalculation)

//ADD CONSUMED PRODUCT IN A DAY

router.post('/addConsumedProduct', authenticateToken, addConsumedProduct)


export {router}