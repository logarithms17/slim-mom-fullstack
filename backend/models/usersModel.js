import { Schema } from 'mongoose';
import mongoose from 'mongoose';

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
},
);

export const Users = mongoose.model('user', usersSchema);
