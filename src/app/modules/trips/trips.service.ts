import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createTrip = async (payload: any) => {
  const result = await prisma.trip.create({
    data: payload,
  });
  return result;
};

export const tripService = {
  createTrip,
};
