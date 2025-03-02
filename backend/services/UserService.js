import User from "../models/User.js";

export const createUser = async (userDTO) => {
    try {
        await User.create(userDTO);
        return true;
    } catch (error) {
        throw error;
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: {email} });

        if(!user) {
            return false;
        }

        return user;
    }catch (error){
        throw error;
    }
}