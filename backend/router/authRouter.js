import express from "express"
import { loginUser, registerUser, sociallogin } from "../controller/authController.js";



const authRouter=express.Router();
 authRouter.post("/register",registerUser);
 authRouter.post("/login",loginUser);
 authRouter.post("/sociallogin",sociallogin);
//  authRouter.post("/admin",adminauth);

 export default authRouter;