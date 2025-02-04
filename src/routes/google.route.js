import express from "express";
import passport from "passport";
import '../config/passport.js';

const googleRouter = express.Router();

googleRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
}), (req, res) => {
    res.json({ message: "Google Login Successful", user: req.user });
});

export default googleRouter;