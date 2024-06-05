import { Prisma, PrismaClient } from "@prisma/client";
import calculatePagination from "../../../helpers/calculatePagination";
import { TPagination } from "../../interface/pagination";

const prisma = new PrismaClient();
const createTrip = async (payload: any,userId:string) => {
  console.log(userId)
  const result = await prisma.trip.create({
    data: {
      userId:userId,
      ...payload
    },
  });
  return result;
};

const getAllTrip = async (params: any, options: TPagination) => {
  const { searchTerm, ...filterData } = params;
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
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
  const total = await prisma.trip.count({
    where: whereConditions,
  });
  const result = await prisma.trip.findMany({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const tripService = {
  createTrip,
  getAllTrip,
};
