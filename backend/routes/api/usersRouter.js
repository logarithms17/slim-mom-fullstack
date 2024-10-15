import express from "express"
import { signupUser, loginUser, logoutUser, addCalorieCalculation, addPublicCalorieCalculation, getUserData } from "../../controllers/usersController.js"
import { authenticateToken } from "../../middlewares/auth.js"

const router = express.Router();

//SIGNUP USER

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Allows a new user to register with a name, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: securePassword123
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created user.
 *                       example: "6703254552595532a773ba4a"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: Johndoe
 *                     password:
 *                       type: password
 *                       description: The password of the user.
 *                       example: $2b$10$Rszvlaf3mp5zUS0eF2W1U
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                       example: john.doe@example.com
 *                     token:
 *                       type: string
 *                       description: The token of the user.
 *                       example: null
 *                     usersInfo:
 *                       type: string
 *                       example: null
 *                     dailyConsumedProducts:
 *                       type: string
 *                       example: null
 *
 *       400:
 *         description: Bad request - Missing required field or user already exists.
 */
router.post('/signup', signupUser);

//LOGIN USER

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logs in a user
 *     description: Allows a user to login with an email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: securePassword123
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created user.
 *                       example: "6703254552595532a773ba4a"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: Johndoe
 *                     password:
 *                       type: password
 *                       description: The password of the user.
 *                       example: $2b$10$Rszvlaf3mp5zUS0eF2W1U
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                       example: john.doe@example.com
 *                     token:
 *                       type: string
 *                       description: The token of the user.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *                     usersInfo:
 *                       type: string
 *                       example: null
 *                     dailyConsumedProducts:
 *                       type: string
 *                       example: null
 *       400:
 *         description: Bad request - Missing required field, User doesnt exist or invalid password
 */
router.post('/login', loginUser);

//LOGOUT USER

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logouts the user
 *     description: Allows a user to logout.
 *     tags: [Users]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authorization.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successful operation.
 *       401:
 *         description: Unathorized
 */
router.post('/logout', authenticateToken, logoutUser);

//UPDATE USER INFO

/**
 * @swagger
 * /api/users/addCalorieCalculation:
 *   post:
 *     summary: Add user's data and calculate the recommended calorie intake and foods that are not recommended
 *     description: Allows a user to add their data, calculate the recommended calorie intake and foods that are not recommended
 *     tags: [Users]
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
 *               height:
 *                 type: number
 *                 description: The height of the user.
 *                 example: 5
 *               desiredWeight:
 *                 type: number
 *                 description: The desired weight of the user.
 *                 example: 50
 *               age:
 *                 type: number
 *                 description: The age of the user.
 *                 example: 31
 *               bloodType:
 *                 type: number
 *                 description: The blood type of the user.
 *                 example: 1
 *               currentWeight:
 *                 type: number
 *                 description: The current weight of the user.
 *                 example: 76
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     usersInfo:
 *                       type: object
 *                       properties:
 *                         height:
 *                              type: number
 *                              description: The height of the user.
 *                              example: 5
 *                         desiredWeight:
 *                              type: number
 *                              description: The desired weight of the user.
 *                              example: 50
 *                         age:
 *                              type: number
 *                              description: The age of the user.
 *                              example: 31
 *                         bloodType:
 *                              type: number
 *                              description: The blood type of the user.
 *                              example: 1
 *                         currentWeight:
 *                              type: number
 *                              description: The current weight of the user.
 *                              example: 76
 *                         recommendedCalories:
 *                              type: number
 *                              description: The recommended calories of the user.
 *                              example: 231
 *                         foodsNotRecommended:
 *                              type: array
 *                              items:
 *                                 type: string
 *                              description: The foods not recommended of the user.
 *                              example:
 *                                    - "flour"
 *                                    - "eggs"
 *                                    - "nuts"
 *
 *       400:
 *         description: Bad request - Missing required field
 */

router.post('/addCalorieCalculation', authenticateToken, addCalorieCalculation);

//ADD PUBLIC DATA FOR CALORIE INTAKE CALCULATION

/**
 * @swagger
 * /api/users/addPublicCalorieCalculation:
 *   post:
 *     summary: Add public user's data and calculate the recommended calorie intake and foods that are not recommended
 *     description: Allows a public user to add their data, calculate the recommended calorie intake and foods that are not recommended
 *     tags: [Users]
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
 *               height:
 *                 type: number
 *                 description: The height of the user.
 *                 example: 5
 *               desiredWeight:
 *                 type: number
 *                 description: The desired weight of the user.
 *                 example: 50
 *               age:
 *                 type: number
 *                 description: The age of the user.
 *                 example: 31
 *               bloodType:
 *                 type: number
 *                 description: The blood type of the user.
 *                 example: 1
 *               currentWeight:
 *                 type: number
 *                 description: The current weight of the user.
 *                 example: 76
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     usersInfo:
 *                       type: object
 *                       properties:
 *                         height:
 *                              type: number
 *                              description: The height of the user.
 *                              example: 5
 *                         desiredWeight:
 *                              type: number
 *                              description: The desired weight of the user.
 *                              example: 50
 *                         age:
 *                              type: number
 *                              description: The age of the user.
 *                              example: 31
 *                         bloodType:
 *                              type: number
 *                              description: The blood type of the user.
 *                              example: 1
 *                         currentWeight:
 *                              type: number
 *                              description: The current weight of the user.
 *                              example: 76
 *                         recommendedCalories:
 *                              type: number
 *                              description: The recommended calories of the user.
 *                              example: 231
 *                         foodsNotRecommended:
 *                              type: array
 *                              items:
 *                                 type: string
 *                              description: The foods not recommended of the user.
 *                              example:
 *                                    - "flour"
 *                                    - "eggs"
 *                                    - "nuts"
 *
 *       400:
 *         description: Bad request - Missing required field
 */

router.post('/addPublicCalorieCalculation', addPublicCalorieCalculation);

//GET USER INFO

/**
 * @swagger
 * /api/users/getUserData:
 *   get:
 *     summary: Get users info
 *     description: Allows the user to retrieve their info
 *     tags: [Users]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authorization.
 *         schema:
 *           type: string
 *     requestBody:
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created user.
 *                       example: "6703254552595532a773ba4a"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: Johndoe
 *                     password:
 *                       type: password
 *                       description: The password of the user.
 *                       example: $2b$10$Rszvlaf3mp5zUS0eF2W1U
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                       example: john.doe@example.com
 *                     token:
 *                       type: string
 *                       description: The token of the user.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *                     usersInfo:
 *                       type: object
 *                       properties: 
 *                         height: 
 *                              type: number
 *                              description: The height of the user.
 *                              example: 5
 *                         desiredWeight: 
 *                              type: number
 *                              description: The desired weight of the user.
 *                              example: 50
 *                         age: 
 *                              type: number
 *                              description: The age of the user.
 *                              example: 31
 *                         bloodType: 
 *                              type: number
 *                              description: The blood type of the user.
 *                              example: 1
 *                         currentWeight: 
 *                              type: number
 *                              description: The current weight of the user.
 *                              example: 76
 *                         recommendedCalories: 
 *                              type: number
 *                              description: The recommended calories of the user.
 *                              example: 231
 *                         foodsNotRecommended: 
 *                              type: array
 *                              items:
 *                                 type: string
 *                              description: The foods not recommended of the user.
 *                              example: 
 *                                    - "flour"
 *                                    - "eggs"
 *                                    - "nuts" 
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
 *       400:
 *         description: Bad request - Missing required field
 */

router.get('/getUserData', authenticateToken, getUserData)

router.get('/getUserData', authenticateToken, getUserData);

export { router };
