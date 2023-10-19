/* eslint-disable @typescript-eslint/no-explicit-any */
import { AboutUs, Blog, Faq } from "./content.model";

// about us
const createAboutUs = async (payload: any) => {
  const result = await AboutUs.create(payload);
  return result;
};
const getAllAboutUs = async () => {
  const result = await AboutUs.find({});
  return result;
};
const getSingleAboutUs = async (category: string) => {
  const result = await AboutUs.findOne({ category: category });
  return result;
};
const deleteAboutUs = async (id: string) => {
  const result = await AboutUs.findByIdAndDelete(id);
  return result;
};
const updateAboutUs = async (payload: any, id: string) => {
  const result = await AboutUs.findByIdAndUpdate(
    id,
    {
      payload,
    },
    {
      new: true,
    }
  );
  return result;
};

// blog

const createBlog = async (payload: any) => {
  const result = await Blog.create(payload);
  return result;
};
const getallblogs = async () => {
  const result = await Blog.find({});
  return result;
};
const getsingleBlogs = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};
const deleteBlogs = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
const updateBlogs = async (payload: any, id: string) => {
  const result = await Blog.findByIdAndUpdate(
    id,

    payload,

    {
      new: true,
    }
  );
  return result;
};

// about us
const createfaq = async (payload: any) => {
  const result = await Faq.create(payload);
  return result;
};
const getgallfaqs = async () => {
  const result = await Faq.find({});
  return result;
};
const getsinglefaqs = async (id: string) => {
  const result = await Faq.findOne({ _id: id });
  return result;
};

const updatefaqs = async (payload: any, id: string) => {
  console.log(payload, id);
  const result = await Faq.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  console.log(result);
  return result;
};
const deletefaqs = async (id: string) => {
  const result = await Faq.findByIdAndDelete(id);
  return result;
};

export const aboutusServices = {
  createAboutUs,
  getAllAboutUs,
  getSingleAboutUs,
  deleteAboutUs,
  updateAboutUs,
};
export const faqServices = {
  createfaq,
  getgallfaqs,
  getsinglefaqs,
  updatefaqs,
  deletefaqs,
};
export const blogServices = {
  createBlog,
  getallblogs,
  getsingleBlogs,
  updateBlogs,
  deleteBlogs,
};
