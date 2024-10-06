import React from 'react'
import { LoginForm } from 'components/LoginForm/loginForm';
import bcrypt from "bcryptjs/dist/bcrypt";


const LoginPage = () => {
  return (
    <div><LoginForm/></div>
  )
  
}
const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body

      const existingUser = await User.findOne({ email });

    
      if (!existingUser) {
          return res.status(401).json({ message: "Email or password is wrong" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is wrong. Click forgot password to reset." });
        }
        
        const payload = { id: existingUser._id };
        
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23" });

        await User.findByIdAndUpdate(existingUser._id, { token: token });
        res.status(200).json({
            token: token,
            user: {
                email: existingUser.email,
                subscription: user.subscription,
               
            },
            
        });

              
    } catch (error) {
        res.status(500).json({ message: error.message });
   
    }
   
};


export default LoginPage;