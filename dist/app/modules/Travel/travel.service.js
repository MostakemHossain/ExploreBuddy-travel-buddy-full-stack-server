"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelService = void 0;
const client_1 = require("@prisma/client");
const calculatePagination_1 = __importDefault(require("../../../helpers/calculatePagination"));
const prisma = new client_1.PrismaClient();
const createTravel = (tripId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createTripBuddyRequest = yield tx.travelBuddyRequest.create({
            data: {
                userId: id,
                tripId: tripId,
            },
        });
        yield prisma.trip.update({
            where: {
                id: tripId,
            },
            data: {
                status: true,
            },
        });
        return createTripBuddyRequest;
    }));
    return result;
});
const getPotentialTravelBuddies = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield prisma.trip.findUniqueOrThrow({
        where: {
            id: tripId,
        },
        include: {
            user: true,
        },
    });
    return trip;
});
const updateSpecificTravelBuddy = (buddyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { newStatus } = payload;
    const result = yield prisma.travelBuddyRequest.update({
        where: {
            id: buddyId,
        },
        data: {
            status: newStatus,
        },
    });
    return result;
});
const getSpecificUserTripRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.travelBuddyRequest.findMany({
        where: {
            userId: userId,
        },
        include: {
            trip: true,
        },
    });
    return result;
});
const getAllTravelRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.travelBuddyRequest.findMany({
        include: {
            trip: true,
            user: true,
        },
    });
    return result;
});
const getAllApprovalTravelRequest = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = (0, calculatePagination_1.default)(options);
    const andConditions = [];
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
        }
        else {
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = { AND: andConditions };
    const total = yield prisma.trip.count({
        where: whereConditions,
    });
    const result = yield prisma.travelBuddyRequest.findMany({
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
});
exports.travelService = {
    createTravel,
    getPotentialTravelBuddies,
    updateSpecificTravelBuddy,
    getSpecificUserTripRequest,
    getAllTravelRequest,
    getAllApprovalTravelRequest,
};
