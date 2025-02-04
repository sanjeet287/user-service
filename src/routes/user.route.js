import userController from "../controllers/user.controller.js";
import jwtAuth from "../middleware/jwtAuthMiddlewre.js";
import ValidateRequest from "../middleware/validateRequest.js";
import Validations from '../validations/validationRule.js';

import express from "express";

const router=express.Router();

router.post("/register",ValidateRequest(Validations.registerValidation),userController.register);
router.post("/login",ValidateRequest(Validations.loginValidation),userController.login);
router.get("/me",jwtAuth,userController.getProfile);

export default router;