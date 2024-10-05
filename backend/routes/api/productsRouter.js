import express from "express"
import { authenticateToken } from "../../middlewares/auth.js"
import { getProduct } from "../../controllers/productsController.js"

const router = express.Router()


//GET A PRODUCT

router.get('/:title', getProduct)


export {router}