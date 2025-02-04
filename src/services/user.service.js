
import bcrypt from 'bcryptjs';
import userRepository from '../repository/user.repository.js';
import jwt from "jsonwebtoken";

class UserService{
    
    async register(name, email, password,role) {
        let user = await userRepository.findByEmail(email);
        if (user) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await userRepository.createUser({ name, email, password: hashedPassword,role });

        return { id: user._id, name: user.name, email: user.email,role:user.role };
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        console.log("User Role during jwt creation: "+user.role);
        
        if (!user) throw new Error("Invalid credentials");

        const isMatch =  bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user._id, email: user.email,role:user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return { token, user: { id: user._id, name: user.name, email: user.email,role:user.role } };
    }

}

const userService=new UserService();
export default userService;
