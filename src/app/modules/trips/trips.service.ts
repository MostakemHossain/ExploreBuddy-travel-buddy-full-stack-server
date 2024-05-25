import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createTrip = async (payload: any) => {
  const result = await prisma.trip.create({
    data: payload,
  });
  return result;
};

const getAllTrip = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.TripWhereInput[] = [];
  if (filterData.budget) {
    filterData.budget = parseInt(filterData.budget);
  }

  // search Term
  if (params.searchTerm) {
    const searchTermAsInt = parseInt(params.searchTerm);
    if (!isNaN(searchTermAsInt)) {
      andConditions.push({
        budget: {
          equals: searchTermAsInt,
        },
      });
    } else {
      andConditions.push({
        OR: [
          {
            destination: {
              contains: params.searchTerm,
              mode: "insensitive",
            },
          },
          {
            activities: {
              has: params.searchTerm,
            },
          },
        ],
      });
    }
  }

  // filter
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.TripWhereInput = { AND: andConditions };
  const result = await prisma.trip.findMany({
    where: whereConditions,
  });
  return result;
};

export const tripService = {
  createTrip,
  getAllTrip,
};
