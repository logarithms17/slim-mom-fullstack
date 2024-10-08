import express from "express"
import { signupUser, loginUser, logoutUser, addCalorieCalculation, addPublicCalorieCalculation, addConsumedProduct, getConsumedProduct, deleteConsumedProduct } from "../../controllers/usersController.js"
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

//ADD PUBLIC DATA FOR CALORIE INTAKE CALCULATION

router.post('/addPublicCalorieCalculation', addPublicCalorieCalculation)

//ADD CONSUMED PRODUCT IN A DAY

router.post('/addConsumedProduct', authenticateToken, addConsumedProduct)

//GET ALL CONSUMED PRODUCT IN A SPECIFIC DATE

router.get('/getConsumedProduct/:date', authenticateToken, getConsumedProduct)

//DELETE A CONSUMED PRODUCT

router.delete('/deleteConsumedProduct/:id', authenticateToken, deleteConsumedProduct)

export {router}