import express from "express";

import dotenv from "dotenv";
import session from 'express-session';
import { connectToDB } from "../user-service/src/config/db.js";
import passport from 'passport';
import errorMiddleware from "../user-service/src/middleware/errorHandler.js";
import router from "../user-service/src/routes/user.route.js";
import googleRouter from "../user-service/src/routes/google.route.js";
import '../user-service/src/config/passport.js';


dotenv.config();


const app=express();
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(cors());

//global error handler middleware
app.use(errorMiddleware);

//Normal  Authentication Routes
app.use("/api/service/auth/user",router);

//Google OAuth  routes 
app.use("/api/auth/google",googleRouter);




app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    connectToDB();
});


export default app;