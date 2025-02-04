import userService from '../services/user.service.js';

class UserController{

    async register(req, res) {
        try {
            const { name, email, password,role } = req.body;
            const user = await userService.register(name, email, password,role);
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await userService.login(email, password);
            res.json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            res.json(req.user);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
}

const userController=new UserController();
export default userController;