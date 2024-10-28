import express from "express";
import { getSingleUser, updateUser } from "../controller/userController.js";
import upload from '../middleware/multer.js';
import { authenticate } from "../middleware/auth.js";

// Create an instance of the router
const userRouter = express.Router();

// Update user with photo (using PUT method)
userRouter.put("/update", authenticate, upload.single('photo'), updateUser);
userRouter.get("/profile", authenticate,getSingleUser);

export default userRouter;