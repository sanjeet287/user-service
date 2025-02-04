import  mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Invalid email format"],
    },
    role:{
    type:String,
    required:true,
    enum:["Vendor","Seller","Customer"]
},
    password: { type: String },
    googleId: {
        type: String,
        unique: true,
        sparse: true, 
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
