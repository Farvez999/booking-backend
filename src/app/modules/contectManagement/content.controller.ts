/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchasync";
import { aboutusServices, blogServices, faqServices } from "./content.service";
import sendResponse from "../../../shared/sendResponse";

const createAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.createAboutUs(req.body);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Created  Successfully",
    data: result,
  });
});
const getAllAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.getAllAboutUs();
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "About Us Retrive Successfully",
    data: result,
  });
});

const getSingleAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.getSingleAboutUs(req.params.category);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "About Us Retrive Successfully",
    data: result,
  });
});
const updateAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.updateAboutUs(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Update About Us Successfully",
    data: result,
  });
});
const deleteAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.deleteAboutUs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "About Us Successfully",
    data: result,
  });
});

// blog
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.createBlog(req.body);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Blog Created Successfully",
    data: result,
  });
});
const getallblogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getallblogs();
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Blog Retrive Successfully",
    data: result,
  });
});

const getsingleBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getsingleBlogs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Blog  Retrive Successfully",
    data: result,
  });
});
const updateBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.updateBlogs(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Blog Update Successfully",
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.deleteBlogs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted Successfully",
    data: result,
  });
});

// faq

const createfaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.createfaq(req.body);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Faq Created Successfully",
    data: result,
  });
});
const getgallfaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.getgallfaqs();
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Faq's Retrive  Successfully",
    data: result,
  });
});

const getsinglefaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.getsinglefaqs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Faq retrive successfully",
    data: result,
  });
});
const updatefaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.updatefaqs(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Faq updated successfully",
    data: result,
  });
});
const deletefaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.deletefaqs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "Faq deleted Successfully",
    data: result,
  });
});
export const aboutUsController = {
  createAboutUs,
  getAllAboutUs,
  getSingleAboutUs,
  deleteAboutUs,
  updateAboutUs,
};
export const blogController = {
  createBlog,
  getallblogs,
  getsingleBlogs,
  updateBlogs,
  deleteBlog,
};
export const faqController = {
  createfaq,
  getgallfaqs,
  getsinglefaqs,
  updatefaqs,
  deletefaq,
};
