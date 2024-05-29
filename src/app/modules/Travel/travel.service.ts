import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createTravel = async (tripId: string, id: string) => {
  const result = await prisma.travelBuddyRequest.create({
    data: {
      userId: id,
      tripId: tripId,
    },
  });
  return result;
};
export const travelService = {
  createTravel,
};
