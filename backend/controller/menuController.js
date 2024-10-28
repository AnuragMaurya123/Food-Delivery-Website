import {v2 as cloudinary} from "cloudinary"
import menuModel from "../modal/menuModel.js";
import mongoose from "mongoose";
import userModel from "../modal/userModel.js";

//funtion for add menu
export const addMenu=async (req,res)=>{
    try {
        //getting menu details
        const {name,recipe,price,category} =req.body;

         // Get the image (file) from the request
         let photo = req.file;
         console.log(photo.path);
         

        let uploadResult
         // Check if the photo exists
             try {
             uploadResult = await cloudinary.uploader.upload(photo.path, { resource_type: 'image' });
             } catch (uploadError) {
                 return res.status(500).json({ success: false, message: 'Failed to upload photo', error: uploadError.message });
             }
       
      
       
        // instance of menuModel 
        const menuDetail={
            name,
            recipe,
            price:Number(price),
            category,
            photo:uploadResult.secure_url,
            date:Date.now(),
        }
       
        // save menu in database
        const menu=new menuModel(menuDetail)
        await menu.save();

        res.json({ success: true, msg: "menu Added Successfully" });  
    } catch (error) {
        res.json({ success: false, msg:error.message});
    }
}

//funtion for list menu
export const listmenu=async (req,res)=>{
    try {
        //list menu
        const menus=await menuModel.find({})
        res.json({ success: true, menus});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}



//funtion for remove menu
const removemenu=async (req,res)=>{
    try {
        //remove menu
       await menuModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message:"menu Remove"});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

//funtion for single menu
const singlemenu=async (req,res)=>{
    try {
        //remove menu
        const {menuId}=req.body;
      const menu= await menuModel.findById(menuId)
        res.json({ success: true, menu});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

export {removemenu,singlemenu}