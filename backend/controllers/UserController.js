import { findUserByEmail, createUser } from "../services/UserService.js"
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const register = async (req,res) => {
    try {
        console.log('req.body ',req.body);
        
        await createUser(req.body);
        res.status(201).json({ message: "User Registered Successfully!"})
    } catch (error) {
        res.status(500).json({ error: "Registration Failed!", error});
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await findUserByEmail(email);
        if(!user){
            res.status(401).json({error: "User is not registered!"});
        }
        const isPasswordValid = await user.isPasswordValid(password);
        if(!isPasswordValid) {
            res.status(401).json({error: "Password is incorrect"});
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        res.status(200).json({message:"Login Successful",user: {id:user.id, username:user.username, email:user.email}, token:token});
    } catch (error) {
        console.log('error ',error);
        res.status(500).json({error: "Login failed. Please try again later."});
    }
}