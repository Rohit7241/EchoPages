import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_APIKEY,
  api_secret:process.env.CLOUD_SECRET

})
const uploadImage = async (imagePath) => {
    try {
      if(!imagePath)return null;
      const result = await cloudinary.uploader.upload(imagePath, {
        resource_type:"auto"
      })
      fs.unlinkSync(imagePath)
      return result;
    } catch (error) {
        fs.unlinkSync(imagePath)
      return null
    }
};

export {uploadImage}