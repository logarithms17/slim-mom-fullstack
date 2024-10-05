import { Schema } from 'mongoose';
import mongoose from 'mongoose';


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
    recommendedCalories: {
      type: Number,
      default: null,
    },
    foodsNotRecommended: {
      type: [String],
      default: null,
    },
})

const usersSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  usersInfo: {
    type: calorieIntakeCalculationsSchema,
    default: null,
  },
},
);

export const Users = mongoose.model('user', usersSchema);
