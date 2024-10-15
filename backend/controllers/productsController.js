import { Users } from "../models/usersModel.js";
import { Products } from "../models/productsModel.js";
import { loginValidation, registrationValidation, calorieIntakeValidation } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

//GET A PRODUCT USING TITLE

export const getProduct = async (req, res) => {

    try {

        const { title } = req.params
        console.log(title)

        // Convert the URL parameter to a space-separated title (e.g., "oat-bran-with-blueberries" to "oat bran with blueberries")
        const formattedTitle = title.replace(/-/g, ' ');

        // Use a case-insensitive regex to search for the title
        const product = await Products.findOne({ title: { $regex: new RegExp(`^${formattedTitle}$`, 'i') } });

        if (!product) {

            return res.status(404).json({ message: "Product not found" })

        }

        res.status(200).json(product)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}

//ADD CONSUMED PRODUCTS IN A DAY

export const addConsumedProduct = async (req, res, next) => {
    try {
        const { consumedProduct, quantity, date } = req.body;

        const formattedConsumedProduct = consumedProduct.replace(/-/g, ' ');

        //find product from db
        console.log(formattedConsumedProduct)

        const product = await Products.findOne({ title: { $regex: new RegExp(`^${formattedConsumedProduct}$`, 'i') } });

        console.log(product)

        const caloriesRatio = quantity / product.weight

        const consumedCalories = caloriesRatio * product.calories

        const updatedUser = await Users.findByIdAndUpdate(
            req.user.id,
            {
                $push: {
                    dailyConsumedProducts: {
                        product: product.title,
                        quantity,
                        calories: consumedCalories,
                        date: date
                    }
                },
            },
            { new: true } // This option returns the updated document
        );

        res.status(200).json({ updatedUser });

    } catch (error) {
        next(error)
    }
}

//GET ALL CONSUMED PRODUCT IN A SPECIFIC DATE

export const getConsumedProduct = async (req, res, next) => {
    try {
        // Get the date from request params (assumed format: 'YYYY-MM-DD')
        const { date } = req.params;
        console.log("Received Date:", date);

        // Convert the date string to a Date object for the start of the day
        const targetDate = new Date(date);
        targetDate.setUTCHours(0, 0, 0, 0); // Set the time to midnight

        // Find the user by ID and get the dailyConsumedProducts array
        const user = await Users.findById(req.user.id).select('dailyConsumedProducts');

        console.log(user)
        
        // If user is not found or there are no products, return an empty array
        if (!user || !user.dailyConsumedProducts) {
            return res.status(200).json({ dailyConsumedProducts: [] });
        }

        // Filter and map products that match the specific day (ignoring time)
        const filteredProducts = user.dailyConsumedProducts.filter((product) => {
            const productDate = new Date(product.date);
            productDate.setUTCHours(0, 0, 0, 0); // Normalize product date to midnight
            return productDate.getTime() === targetDate.getTime(); // Compare dates
        });

        //GET ONLY THE TITLE OF THE PRODUCT
        
        const formattedProducts = filteredProducts.map((product) => {
            return product.product
        })

        res.status(200).json({ dailyConsumedProducts: filteredProducts });

    } catch (error) {
        next(error);
    }
};

//DELETE A CONSUMED PRODUCT
export const deleteConsumedProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Users.findByIdAndUpdate(req.user.id, {
            $pull: {
                dailyConsumedProducts: {
                    _id: id
                }
            }
        });

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        next(error);
    }
}