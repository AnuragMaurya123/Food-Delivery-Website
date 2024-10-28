import express from "express"
import { addMenu, listmenu } from "../controller/menuController.js";
import upload from "../middleware/multer.js";


const menuRouter=express.Router();

 menuRouter.post("/add-menu",upload.single('photo'),addMenu);
 menuRouter.get("/all-menu",listmenu);



 export default menuRouter;