import { v2 as cloudinary } from 'cloudinary';
import userModel from '../modal/userModel.js';
import mongoose from 'mongoose';

// for updating user
export const updateUser = async (req, res) => {
    const id = req.UserId;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

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

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again! Please Login Again' });
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
