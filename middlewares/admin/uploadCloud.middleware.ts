import {Request, Response, NextFunction} from "express";
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier"; 

// const storageMulter = require("../../helpers/storage-multer.helper");

// const upload = multer({ storage: storageMulter() });
//cloudinary
cloudinary.config({ 
        cloud_name: "dnxdaykpf",
        api_key: "828462918612732",
        api_secret: "J6ifO9wO3su9DC7U3j-94li2heU"
});
//end cloudinary
let streamUpload = (buffer : any) => {
  return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any) => {
  let result = await streamUpload(buffer);
  return result["url"];
}

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await uploadToCloudinary(req["file"].buffer);
      req.body[req["file"].fieldname] = result;
    } catch (error) {
      console.log(error);
    }
  
    next();
  };