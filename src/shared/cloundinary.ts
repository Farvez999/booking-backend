/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmtto8o5m",
  api_key: "261943591525445",
  api_secret: "NJMK01I1ckAVFgfEEi7M0esBS50",
});

const uploadImage = async function (imagePath: any) {
  let options: any = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // const uploadPromises = imagePaths.map(async (imagePath: any) => {

    //   return result;
    // });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
