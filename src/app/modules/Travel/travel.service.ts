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

const getPotentialTravelBuddies = async (tripId: string) => {
  const trip = await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
    include: {
      user: true,
    },
  });
  return trip;
};

export const travelService = {
  createTravel,
  getPotentialTravelBuddies,
};
