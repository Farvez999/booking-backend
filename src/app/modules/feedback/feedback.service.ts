/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feedback } from "./feedback.model";

const postAFeedBack = async (payload: any) => {
  const result = await Feedback.create(payload);
  return result;
};
const getallfeedBack = async () => {
  const result = await Feedback.find({});
  return result;
};
const getsingleFeedBack = async (id: string) => {
  const result = await Feedback.findById(id);
  return result;
};
const updatefeedback = async (payload: any, id: string) => {
  const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteFeedback = async (id: string) => {
  const result = await Feedback.findByIdAndDelete(id);

  return result;
};

export const feedbackservices = {
  postAFeedBack,
  getallfeedBack,
  getsingleFeedBack,
  updatefeedback,
  deleteFeedback,
};
