import { Prisma, PrismaClient } from "@prisma/client";
import calculatePagination from "../../../helpers/calculatePagination";
import { TPagination } from "../../interface/pagination";
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
      status: payload.newStatus,
    },
  });
  return result;
};
const getSpecificUserTripRequest = async (userId: string) => {
  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      userId: userId,
    },
    include: {
      trip: true,
    },
  });
  return result;
};
const getAllTravelRequest = async () => {
  const result = await prisma.travelBuddyRequest.findMany({
    include: {
      trip: true,
      user: true,
    },
  });
  return result;
};
const getAllApprovalTravelRequest = async (
  params: any,
  options: TPagination
) => {
  const { searchTerm, ...filterData } = params;
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  const andConditions: Prisma.TripWhereInput[] = [];

  if (filterData.budget) {
    filterData.budget = parseInt(filterData.budget);
  }

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
            description: {
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
            activities: {
              has: params.searchTerm,
            },
          },
        ],
      });
    }
  }

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

  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      status: "APPROVED",
      trip: whereConditions,
    },
    include: {
      trip: true,
      user: true,
    },
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return {
    total,
    result,
  };
};

export const travelService = {
  createTravel,
  getPotentialTravelBuddies,
  updateSpecificTravelBuddy,
  getSpecificUserTripRequest,
  getAllTravelRequest,
  getAllApprovalTravelRequest,
};
