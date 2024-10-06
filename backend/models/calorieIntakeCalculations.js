import { Schema } from 'mongoose';
import mongoose from 'mongoose';

//CALORIE INTAKE CALCULATION FORM SCHEMA
const calorieIntakeCalculationsSchema = new Schema({
    height: {
        type: Number,
        required: [true, "Height is required"],
    },
    desiredWeight: {
        type: Number,
        required: [true, "Weight is required"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    bloodType: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4], // Restrict to valid blood type values
    },
    currentWeight: {
        type: Number,
        required: [true, "Weight is required"],
    },
})

export const CalorieIntakeCalculations = mongoose.model('calorieCalculation', calorieIntakeCalculationsSchema)