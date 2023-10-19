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
    message: "created  successfully",
    data: result,
  });
});
const getAllAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.getAllAboutUs();
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "about us retrive  successfully",
    data: result,
  });
});

const getSingleAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.getSingleAboutUs(req.params.category);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "about us retrive  successfully",
    data: result,
  });
});
const updateAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.updateAboutUs(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "updateAboutUs  successfully",
    data: result,
  });
});
const deleteAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await aboutusServices.deleteAboutUs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "about us  successfully",
    data: result,
  });
});

// blog
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.createBlog(req.body);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "blog created  successfully",
    data: result,
  });
});
const getallblogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getallblogs();
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "blog retrive  successfully",
    data: result,
  });
});

const getsingleBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getsingleBlogs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "blog  retrive  successfully",
    data: result,
  });
});
const updateBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.updateBlogs(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "blog update  successfully",
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.deleteBlogs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "blog deleted  successfully",
    data: result,
  });
});

// faq

const createfaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.createfaq(req.body);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "faq created  successfully",
    data: result,
  });
});
const getgallfaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.getgallfaqs();
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "faq's retrive  successfully",
    data: result,
  });
});

const getsinglefaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.getsinglefaqs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "faq retrive successfully",
    data: result,
  });
});
const updatefaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.updatefaqs(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "faq updated successfully",
    data: result,
  });
});
const deletefaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqServices.deletefaqs(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "faq deleted   successfully",
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
