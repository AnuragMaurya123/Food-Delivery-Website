import {v2 as cloudinary} from "cloudinary"
import menuModel from "../modal/menuModel.js";


//funtion for add menu
export const addMenu=async (req,res)=>{
    try {
        //getting menu details
        const {name,recipe,price,category} =req.body;

         // Get the image (file) from the request
         let photo = req.file;
        
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

        res.json({ success: true, message: "menu Added Successfully" });  
    } catch (error) {
        res.json({ success: false, msg:error.message});
    }
}

//funtion for list menu
export const listmenu=async (req,res)=>{
    const {query} =req.query
    try {
        let menus;        
        if(query){
            menus=await menuModel.find({
                $or:[  //applying OR condition
                    {name:{$regex:query,$options:"i"}}, // Case-insensitive search on the name field
                    {category:{$regex:query,$options:"i"}}, // Case-insensitive search on the category field

                ]})  
                             
        }else{
        //list menu
         menus=await menuModel.find({})
        }
        res.json({ success: true, menus});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

//funtion for remove menu
export const removemenu=async (req,res)=>{
    const id = req.params.id;

    // Checking if menu exists
    const menu = await menuModel.findById(id);
    if (!menu) {
        return res.status(404).json({ success: false, message: 'Menu Item Not Found' });
    }
    try {
        //remove menu
       await menuModel.findByIdAndDelete(id)
        res.json({ success: true, message:"menu Remove"});
    } catch (error) {

        console.log(error);
        
        res.json({ success: false, msg:error.message});
    }
}

//funtion for single menu
export const singlemenu=async (req,res)=>{
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

// for updating menu
export const updateMenu = async (req, res) => {
    const id = req.params.id;

    // Checking if menu exists
    const menu = await menuModel.findById(id);
    if (!menu) {
        return res.status(404).json({ success: false, message: 'Menu Item Not Found' });
    }

    try {
        const { name, recipe, price, category } = req.body;
        let uploadResult = menu.photo; // Default to current photo in case no new photo is uploaded

        // Check if the new image file exists
        if (req.file) {
            try {
                const photo = req.file;
                
                // Extract public ID from the current photo URL for deletion
                const publicId = menu.photo.split('/').pop().split('.')[0];
                
                // Delete the old image in Cloudinary
                await cloudinary.uploader.destroy(publicId);
                
                // Upload the new image to Cloudinary
                const newPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: "image" });
                
                // Update photo URL
                uploadResult = newPhoto.secure_url;
            } catch (error) {
                console.error("Error uploading new photo:", error);
                return res.status(500).json({ success: false, message: 'Error updating photo' });
            }
        }

        // Updated menu data
        const menuData = {
            name,
            recipe,
            price,
            category,
            photo: uploadResult,
        };
        console.log(menuData);
        

        // Update menu details in the database
        const updatedMenu = await menuModel.findByIdAndUpdate(id, { $set: menuData }, { new: true });
        

        // checking after updating
        if (!updatedMenu) {
            return res.status(404).json({ success: false, message: 'Menu item not found after update' });
        }

        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedMenu });
    } catch (error) {
        console.error("Error updating menu:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




