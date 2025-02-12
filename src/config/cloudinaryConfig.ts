import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  });
const uploadOnCloudinary =async(localFilePath) =>{
try{
    if(!localFilePath) return null
    const response= await cloudinary.uploader.upload(localFilePath, {
        resource_type:"auto"
    })
    
    fs.unlinkSync(localFilePath)
    return response
    console.log(response) ;
    
}  catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localFilePath);
throw new Error ("Error in uploading image")

}
}
const deleteOnCloudinary= async(localFilePath)=>{
try {
    
        fs.unlinkSync(localFilePath); 
        console.log("File Deleted successfuly")
} catch (error) {
    throw new ApiError(401,"Failded to delete the Avatar file")
}

}

export {uploadOnCloudinary,deleteOnCloudinary}
  