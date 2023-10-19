import Room from "./rooms.model";

export const findLastRoomId = async (): Promise<string | undefined> => {
  const roomId = await Room.findOne({
    forCheck: "rooms",
  })
    .sort({
      createdAt: 1,
    })
    .lean();

  return roomId?.roomId ? roomId.roomId.substring(4) : undefined;
};

export const generateRoomId = async (title: string): Promise<string> => {
  const currentCode =
    (await findLastRoomId()) || (0).toString().padStart(5, "0"); //00000
  //increment by 1
  let incrementCode = (parseInt(currentCode) + 1).toString().padStart(5, "0");
  //20 25
  incrementCode = `${title}-${incrementCode}`;

  return incrementCode;
};
