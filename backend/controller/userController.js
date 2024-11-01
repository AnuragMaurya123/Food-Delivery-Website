import { v2 as cloudinary } from 'cloudinary';
import userModel from '../modal/userModel.js';

// for updating user
export const updateUser = async (req, res) => {
    const id = req.UserId;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }

    try {
        const { email, name, gender, phone } = req.body;
        // Get the image (file) from the request
        let photo = req.file;

        let uploadResult = null;

        // Check if the photo exists
        if (photo) {
            try {
                uploadResult = await cloudinary.uploader.upload(photo.path, { resource_type: 'image' });
            } catch (uploadError) {
                return res.status(500).json({ success: false, message: 'Failed to upload photo', error: uploadError.message });
            }
        } else {
            // Use the existing user's photo if no new photo was uploaded, or use a default
            uploadResult = {
                secure_url: user.photo || '',
            };
        }

        // Create a new user data object
        const userData = {
            email,
            name,
            phone,
            photo: uploadResult.secure_url, // Assign the photo URL (either uploaded, existing, or default)
            gender,
        };

        // Update user details
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $set: userData },
            { new: true } // Return the updated user
        );

        // If user doesn't exist after the update
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
        }

        // Remove the password from the returned user data
        const { password:_, ...rest } = updatedUser._doc;
        res.status(200).json({ success: true, message: 'Successfully updated', data:rest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//creating function for getting only one user
export const getSingleUser=async (req,res)=>{
    const id = req.UserId;
    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }
    try {
         //finding user by id and getting user data escape password
        const singleUser=await userModel.findById(id).select("-password");
        
        
        res.status(200).json({success:true,message:"User Found ",data:singleUser})
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

//creating function for getting all user
export const getAllUser=async (req,res)=>{

    try {
         //finding users  and getting users data escape password
        const allUser=await userModel.find({}).select("-password");
        res.status(200).json({success:true,message:"User Found ",data:allUser})
        
    } catch (error) {
        console.log(error);
        res.json({ success:false,message:error})
    }
}

//creating function for getting delete user
export const deleteUser=async (req,res)=>{
    const id = req.params.id;
    try {
        //finding user by id and Deleting
      const deleteUser= await userModel.findByIdAndDelete(id);
    
    if (!deleteUser) {
        return res.status(404).json({ success: false, message: 'User not found ' });
    }
       res.status(200).json({success:true,message:"Successfully Deleted User"})
   } catch (error) {
       console.log(error);
       res.json({ success:false,message:error})
   }
}

//creating function for toggle roles of user user

export const toggleUser=async (req,res)=>{
    const id = req.params.id;
    try {
        //finding user by id and Deleting
       const user=await userModel.findById(id);
       
       
       if(user.role==="admin"){
        await userModel.findByIdAndUpdate(id,{role:"user"});
       }else{
        await userModel.findByIdAndUpdate(id,{role:"admin"});
       }
       res.status(200).json({success:true,message:"Role Change Successfull"})
   } catch (error) {
       console.log(error);
       res.json({ success:false,message:error})
   }
}
