/* eslint-disable @typescript-eslint/no-explicit-any */

import Booking from "./booking.model";

export const findLastBookingId = async (): Promise<string | undefined> => {
  const lastBooking = await Booking.findOne(
    {
      forCheck: "booking",
    },
    { _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBooking?.bookingNo
    ? lastBooking.bookingNo.substring(4)
    : undefined;
};

export const generateBookingId = async (): Promise<string> => {
  const currentCode =
    (await findLastBookingId()) || (0).toString().padStart(5, "0"); //00000
  //increment by 1
  let incrementCode = (parseInt(currentCode) + 1).toString().padStart(5, "0");
  //20 25
  incrementCode = `BOOKING-${incrementCode}`;

  return incrementCode;
};
