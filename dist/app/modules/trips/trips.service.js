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
exports.tripService = void 0;
const client_1 = require("@prisma/client");
const calculatePagination_1 = __importDefault(require("../../../helpers/calculatePagination"));
const prisma = new client_1.PrismaClient();
const createTrip = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.trip.create({
        data: Object.assign({ userId: userId }, payload),
    });
    return result;
});
const getAllTrip = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = (0, calculatePagination_1.default)(options);
    const andConditions = [];
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
                    equals: filterData[key],
                },
            })),
        });
    }
    andConditions.push({
        TravelBuddyRequest: {
            some: {
                status: "APPROVED",
            },
        },
    });
    const whereConditions = { AND: andConditions };
    const total = yield prisma.trip.count({
        where: whereConditions,
    });
    const result = yield prisma.trip.findMany({
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
});
const getSpecificUserTrip = (id, params, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
        const { limit, page, skip, sortBy, sortOrder } = (0, calculatePagination_1.default)(options);
        const andConditions = [{ userId: id }];
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
            }
            else {
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
                        equals: filterData[key],
                    },
                })),
            });
        }
        const whereConditions = {
            AND: andConditions,
        };
        const total = yield prisma.trip.count({
            where: whereConditions,
        });
        const result = yield prisma.trip.findMany({
            where: whereConditions,
            skip: skip,
            take: limit,
            orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
        });
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        };
    }
    catch (error) {
        console.error("Error fetching specific user trips:", error);
        throw error;
    }
});
const deleteMyTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.trip.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const getMyTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.trip.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateMyTrip = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.trip.update({
        where: {
            id: id,
        },
        data: Object.assign({}, payload),
    });
    return result;
});
exports.tripService = {
    createTrip,
    getAllTrip,
    getSpecificUserTrip,
    deleteMyTrip,
    getMyTrip,
    updateMyTrip,
};
