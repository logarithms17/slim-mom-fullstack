import { Products } from "../models/productsModel.js";

//GET A PRODUCT USING TITLE

export const getProduct = async (req, res) => {

    try {

        const { title } = req.params
        console.log(title)

        const product = await Products.findOne({ title: title })

        if (!product) {

            return res.status(404).json({ message: "Product not found" })

        }

        res.status(200).json(product)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}