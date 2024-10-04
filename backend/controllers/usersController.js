import { Users } from "../models/usersModel.js";
import { loginValidation, registrationValidation } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//SIGN UP USER
export const signupUser = async (req, res, next) => {
    try{
    const { name, email, password } = req.body;

    const { error } = registrationValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Missing required field" });
    }

    //CHECK FOR EXISTING USERS

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
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
        next(error)
    }
};

//LOGIN USERS

export const loginUser = async (req, res, next) => {   
    try {
        const { email, password } = req.body;

        const { error } = loginValidation.validate(req.body);

        if (error) {
            return res.status(400).json({ message: "Missing required field" });
        }

        const existingUser = await Users.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        //CHECK PASSWORD
        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        //CREATE TOKEN

        const token = jwt.sign(
            { id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );
        
        await Users.findByIdAndUpdate(existingUser._id, {token})

        res.status(200).json({ existingUser });

    } catch (error) {
        next(error)
    }
}