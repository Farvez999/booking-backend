import { Schema, model } from "mongoose";

const BlogSchema = new Schema(
  {
    image: {
      url: String,
      public_id: String,
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
  },
  {
    timestamps: true,
  }
);
const faqSchema = new Schema(
  {
    image: {
      url: String,
      publicLink: String,
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
  },
  {
    timestamps: true,
  }
);
const AboutUsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, " idesc required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model("blog", BlogSchema);
export const Faq = model("faq", faqSchema);
export const AboutUs = model("about", AboutUsSchema);
