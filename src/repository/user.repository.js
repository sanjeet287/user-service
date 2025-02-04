import User from '../models/user.schema.js';

 class UserRepository{

    async findByEmail(email) {
        
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error("User not found with EmailId :"+error.message);
        }
    }

    async findById(id) {
        return await User.findById(id).select("-password");
    }

    async createUser(userData) {
        try {
            const user = new User(userData);
        return await user.save();
        } catch (error) {
            throw new Error("Error while register the User: "+error.message);
        }
        
    }
}

const userRepository = new UserRepository();
export default userRepository;