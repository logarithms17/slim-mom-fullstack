import { Products } from "../models/productsModel.js";

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