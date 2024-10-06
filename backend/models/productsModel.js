import { Schema } from 'mongoose';
import mongoose from 'mongoose';

//PRODUCTS SCHEMA
const productsSchema = new Schema({
        categories: {
            type: String,
        },
        weight: {
            type: Number,
        },
        title: {
            type: String,
        },
        calories: {
            type: Number,
    },
        groupBloodNotAllowed: {
        type: [mongoose.Schema.Types.Mixed], // Array to accommodate mixed types (e.g., null, boolean)
        required: true
    }
    },
);


export const Products = mongoose.model('product', productsSchema)   