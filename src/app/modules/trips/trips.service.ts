import { Prisma, PrismaClient, Trip } from "@prisma/client";
import calculatePagination from "../../../helpers/calculatePagination";
import { TPagination } from "../../interface/pagination";

const prisma = new PrismaClient();
const createTrip = async (payload: any, userId: string) => {
  const result = await prisma.trip.create({
    data: {
      userId: userId,
      ...payload,
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
            travelType: {
              contains: params.searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
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
    skip: skip,
    take: limit,

    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
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
const getSpecificUserTrip = async (
  id: string,
  params: any,
  options: TPagination
) => {
  try {
    const { searchTerm, ...filterData } = params;
    const { limit, page, skip, sortBy, sortOrder } =
      calculatePagination(options);
    const andConditions: Prisma.TripWhereInput[] = [{ userId: id }];

    if (filterData.budget) {
      filterData.budget = parseInt(filterData.budget);
    }

    // Search term
    if (searchTerm) {
      const searchTermAsInt = parseInt(searchTerm);
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
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              activities: {
                has: searchTerm,
              },
            },
          ],
        });
      }
    }

    // Filter
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map((key) => ({
          [key]: {
            equals: (filterData as any)[key],
          },
        })),
      });
    }

    const whereConditions: Prisma.TripWhereInput = {
      AND: andConditions,
    };

    const total = await prisma.trip.count({
      where: whereConditions,
    });

    const result = await prisma.trip.findMany({
      where: whereConditions,
      skip: skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  } catch (error) {
    console.error("Error fetching specific user trips:", error);
    throw error;
  }
};

const deleteMyTrip = async (id: string) => {
  const result = await prisma.trip.delete({
    where: {
      id: id,
    },
  });
  return result;
};
const getMyTrip = async (id: string) => {
  const result = await prisma.trip.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};
const updateMyTrip = async (id: string, payload: Partial<Trip>) => {
  const result = await prisma.trip.update({
    where: {
      id: id,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

export const tripService = {
  createTrip,
  getAllTrip,
  getSpecificUserTrip,
  deleteMyTrip,
  getMyTrip,
  updateMyTrip,
};
