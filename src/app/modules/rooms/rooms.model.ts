import { model, Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [
      {
        url: String,
        publicLink: String,
      },
    ],
    facilities: [
      {
        type: String,
      },
    ],
    building: {
      type: Schema.Types.ObjectId,
      ref: "service",
    },
    roomId: {
      type: String,
    },
    forCheck: {
      type: String,
      default: "rooms",
    },
    discount: {
      type: Number,
    },

    category: {
      type: String,
      enum: ["delux", "delux king", "delux twin", "3 bed"],
    },

    bedSize: {
      type: Number,
    },
    pricing: {
      type: Number,
    },
    roomSize: {
      type: String,
    },
    description: {
      type: String,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    reviewAndRatings: [
      {
        rating: Number,
        message: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Room = model("room", RoomSchema);
export default Room;
