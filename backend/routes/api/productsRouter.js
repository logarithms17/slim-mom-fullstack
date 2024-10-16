import express from "express"
import { authenticateToken } from "../../middlewares/auth.js"
import { getProduct, addConsumedProduct, getConsumedProduct, deleteConsumedProduct } from "../../controllers/productsController.js"

const router = express.Router()


//GET A PRODUCT

router.get('/:title', getProduct)

//ADD CONSUMED PRODUCT IN A DAY

/**
 * @swagger
 * /api/products/addConsumedProduct:
 *   post:
 *     summary: Adds consumed product in a specific day
 *     description: Allows a user to add what product they consumed in a specific day.
 *     tags: [Products]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authorization.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               consumedProduct:
 *                 type: string
 *                 description: Consumed product.
 *                 example: pork-stew
 *               quantity:
 *                 type: number
 *                 description: The quantity of the consumed product
 *                 example: 200
 *               date:
 *                 type: date
 *                 description: The date when the product was consumed
 *                 example: 2024-10-10
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      product:
 *                          type: string
 *                          description: Consumed product.
 *                          example: pork-stew
 *                      quantity:
 *                          type: number
 *                          description: The quantity of the consumed product
 *                          example: 100
 *                      calories:
 *                          type: number
 *                          description: The calorie content of the product.
 *                          example: 235
 *                      date:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the product was consumed.
 *                          example: 2024-10-10
 *                      _id:
 *                          type: string
 *                          description: The ID of the newly created user.
 *                          example: 67032bcdc4f24df2214c7376
 *       400:
 *         description: Bad request - Missing required field, User doesnt exist or invalid password
 */

router.post('/addConsumedProduct', authenticateToken, addConsumedProduct)

//GET ALL CONSUMED PRODUCT IN A SPECIFIC DATE

/**
 * @swagger
 * /api/products/getConsumedProduct/:date:
 *   get:
 *     summary: Gets all consumed product in a specific day
 *     description: Allows a users to get all the consumed product in a specific day.
 *     tags: [Products]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authorization.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time when the product was consumed.
 *                  example: 2024-10-07
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     dailyConsumedProducts:
*                           type: array 
*                           items:
*                               type: object
*                               properties:
*                                   product:
*                                       type: string 
*                                       description: The name of the consumed product.
*                                       example: Pork stew
*                                   quantity:
*                                       type: integer
*                                       format: int32
*                                       description: The amount consumed.
*                                       example: 100
*                                   calories:
*                                       type: integer
*                                       format: int32
*                                       description: The calorie content of the product.
*                                       example: 235
*                                   date:
*                                       type: string
*                                       format: date-time
*                                       description: The date and time when the product was consumed.
*                                       example: 2024-10-07T00:31:09.329+00:00
*                                   _id:
*                                       type: string
*                                       description: The unique ID of the consumed product record.
*                                       example: 67032bcdc4f24df2214c7376
*                           description: List of products consumed daily.
*                           example:
*                               - product: Pork stew
*                                 quantity: 100
*                                 calories: 235
*                                 date: 2024-10-07T00:31:09.329+00:00
*                                 _id: 67032bcdc4f24df2214c7376
*                               - product: Salad
*                                 quantity: 200
*                                 calories: 120
*                                 date: 2024-10-07T12:20:15.123+00:00
*                                 _id: 67032bdcc4e24df2245d8392
 *                     
 *                      
 *                       
 *       400:
 *         description: Bad request - Missing required field, User doesnt exist or invalid password
 */

router.get('/getConsumedProduct/:date', authenticateToken, getConsumedProduct)

//DELETE A CONSUMED PRODUCT

/**
 * @swagger
 * /api/products/deleteConsumedProduct/:id:
 *   delete:
 *     summary: Delete a consumed product
 *     description: Allows a user to remove a consumed product.
 *     tags: [Products]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authorization.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Consumed product id.
 *                 example: 67032bcdc4f24df2214c7376
 *     responses:
 *       204:
 *         description: Deleted consumed prodcut successfully.
      
 *       400:
 *         description: Bad request - Missing required field, User doesnt exist or invalid password
 */

router.delete('/deleteConsumedProduct/:id', authenticateToken, deleteConsumedProduct)


export {router}
