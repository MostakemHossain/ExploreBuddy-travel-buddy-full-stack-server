import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createTravel = async (tripId: string, id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const createTripBuddyRequest = await tx.travelBuddyRequest.create({
      data: {
        userId: id,
        tripId: tripId,
      },
    });
    await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        status: true,
      },
    });
    return createTripBuddyRequest;
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
const updateSpecificTravelBuddy = async (buddyId: string, payload: any) => {
  const result = await prisma.travelBuddyRequest.update({
    where: {
      id: buddyId,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

export const travelService = {
  createTravel,
  getPotentialTravelBuddies,
  updateSpecificTravelBuddy,
};
