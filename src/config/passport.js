import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userRepository from "../repository/user.repository.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET    
}, 
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userRepository.findByEmail(profile.emails[0].value);

        if (!user) {
            user = await userRepository.createUser({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return done(null, { token, user });
    } catch (error) {
        return done(error, null);
    }
}));

console.log(process.env.GOOGLE_CLIENT_ID+" : "+process.env.GOOGLE_CLIENT_SECRET);



passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
