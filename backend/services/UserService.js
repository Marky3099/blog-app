import { User } from "../models/User.js";

export const registerUser = async (userDTO) => {
    try {
        await User.create(userDTO);
        return true;
    } catch (error) {
        throw error;
    }
}