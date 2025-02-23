import { registerUser } from "../services/UserService.js"

export const register = async (req,res) => {
    try {
        await registerUser(req.body);
        res.status(201).json({ message: "User Registered Successfully!"})
    } catch (error) {
        res.status(500).json({ error: "Registration Failed!"});
    }
}