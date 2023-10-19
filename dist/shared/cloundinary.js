"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dmtto8o5m",
    api_key: "261943591525445",
    api_secret: "NJMK01I1ckAVFgfEEi7M0esBS50",
});
const uploadImage = function (imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };
        try {
            // Upload the image
            const result = yield cloudinary.uploader.upload(imagePath, options);
            // const uploadPromises = imagePaths.map(async (imagePath: any) => {
            //   return result;
            // });
            return result;
        }
        catch (error) {
            console.error(error);
        }
    });
};
exports.default = uploadImage;
