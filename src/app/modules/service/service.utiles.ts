/* eslint-disable @typescript-eslint/no-explicit-any */
import Service from "./service.model";

export const findLastServiceId = async (): Promise<string | undefined> => {
  const lastBuilding = await Service.findOne(
    {
      forCheck: "building",
    },
    { _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBuilding?.code ? lastBuilding.code.substring(4) : undefined;
};

export const generateServiceCode = async (): Promise<string> => {
  const currentCode =
    (await findLastServiceId()) || (0).toString().padStart(5, "0"); //00000
  //increment by 1
  let incrementCode = (parseInt(currentCode) + 1).toString().padStart(5, "0");
  //20 25
  incrementCode = `B-${incrementCode}`;

  return incrementCode;
};
