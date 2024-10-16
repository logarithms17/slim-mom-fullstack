import { Users } from '../models/usersModel.js';
import { Products } from '../models/productsModel.js';
import {
  loginValidation,
  registrationValidation,
  calorieIntakeValidation,
} from '../validation/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

//SIGN UP USER

export const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { error } = registrationValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Missing required field' });
    }

    //CHECK FOR EXISTING USERS

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    //CREATE NEW USER

    const newUser = await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};

//LOGIN USERS

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Missing required field' });
    }

    const existingUser = await Users.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    //CHECK PASSWORD
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    //CREATE TOKEN

    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    await Users.findByIdAndUpdate(existingUser._id, { token });

    console.log(existingUser);

    res.status(200).json({
      id: existingUser._id,
      name: existingUser.name,
      password: existingUser.password,
      email: existingUser.email,
      token,
      usersInfo: existingUser.usersInfo,
      dailyConsumedProducts: existingUser.dailyConsumedProducts,
    });
  } catch (error) {
    next(error);
  }
};

//LOGOUT USERS

export const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    await Users.findByIdAndUpdate(id, { token: null });
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    next(error);
  }
};

//ADD DATA FOR CALORIE INTAKE CALCULATION

export const addCalorieCalculation = async (req, res, next) => {
  try {
    const { height, desiredWeight, age, bloodType, currentWeight, date } =
      req.body;

    const { error } = calorieIntakeValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Missing required field' });
    }

    //COMPUTATION FOR THE DAILY CALORIE INTAKE

    // 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desired weight)

    const calorieIntakeCalculation =
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight);

    //FOODS THAT ARE NOT RECOMMENDED

    // Retrieve all products from the database
    const products = await Products.find({});

    // Filter foods that are not recommended based on bloodType
    const foodsNotRecommended = products.filter(product => {
      // Ensure groupBloodNotAllowed exists and has a value of true for the given bloodType
      return (
        product.groupBloodNotAllowed &&
        product.groupBloodNotAllowed[bloodType] === true
      );
    });

    // Extract unique categories from the filtered products
    const uniqueCategories = [
      ...new Set(foodsNotRecommended.map(product => product.categories)),
    ];

    const newUsersInfo = {
      usersInfo: {
        height,
        desiredWeight,
        age,
        bloodType,
        currentWeight,
        recommendedCalories: calorieIntakeCalculation,
        foodsNotRecommended: uniqueCategories,
        date,
      },
    };

    await Users.findByIdAndUpdate(req.user.id, newUsersInfo);

    res.status(200).json(newUsersInfo);
  } catch (error) {
    next(error);
  }
};

//ADD PUBLIC DATA FOR CALORIE INTAKE CALCULATION

export const addPublicCalorieCalculation = async (req, res, next) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const { height, desiredWeight, age, bloodType, currentWeight, date } =
      req.body;

    const { error } = calorieIntakeValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Missing required field' });
    }

    // COMPUTATION FOR THE DAILY CALORIE INTAKE
    // Formula: 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desired weight)
    const calorieIntakeCalculation =
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight);

    // FOODS THAT ARE NOT RECOMMENDED
    // Retrieve all products from the database
    const products = await Products.find({});

    // Filter foods that are not recommended based on bloodType
    const foodsNotRecommended = products.filter(product => {
      return (
        product.groupBloodNotAllowed &&
        product.groupBloodNotAllowed[bloodType] === true
      );
    });

    // Extract unique categories from the filtered products
    const uniqueCategories = [
      ...new Set(foodsNotRecommended.map(product => product.categories)),
    ];

    // Store the result in a local object (not saving to the database)
    const localCalorieIntake = {
      height,
      desiredWeight,
      age,
      bloodType,
      currentWeight,
      recommendedCalories: calorieIntakeCalculation,
      foodsNotRecommended: uniqueCategories,
      date,
    };

    // Return the result in the response without saving to the database
    res.status(200).json({ localCalorieIntake });
  } catch (error) {
    next(error);
  }
};

//GET USER DATA

export const getUserData = async (req, res, next) => {
    console.log(req.user)
    
    try {
        const { _id } = req.user

        console.log(_id)
        const user = await Users.findById(_id)
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}
