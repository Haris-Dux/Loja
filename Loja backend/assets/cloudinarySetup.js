const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dx2xizqng',
  api_key: '564856754311457',
  api_secret: '4VE-gUVhIb9W-gHd5vt8LX7xFYk',
  //secure: false,
  //secure: true,
});

const uploadImageToCloudinary = async (image, folder = "") => {
  if (!image) {
    throw new Error("Image File Not Detected");
  }
  const { size, name, type } = image;
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    folder: "morat-images" + folder,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    timeout: 1200000,
    resource_type: 'auto'
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(image.base64, options);
    console.log(result);
    return { ...result, size, name, type };
  } catch (error) {
    console.error(error);
    throw new Error("Image Was Not Uploaded")
  }
};

// const uploadImageToCloudinary = async (imageData, folder = "") => {
//   if (!imageData || !imageData.secure_url) {
//     throw new Error("Image URL is missing");
//   }

//   const { size, name, type, public_id, secure_url } = imageData;

//   // No need to upload the image since it's already on Cloudinary
//   return { size, name, type, public_id, secure_url };
// };

const deleteImageFromCloudinary = async (public_id) => {
  if (!public_id) {
    throw new Error("No Images Selected");
  }

  try {
    // Delete the image
    const result = await cloudinary.uploader.destroy(public_id, {
      type: "upload",
      resource_type: "image",
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Image Was Not Deleted");
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
};
