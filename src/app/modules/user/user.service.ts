import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { fileUploader } from "../../../helpers/fileUpload";
import { CustomRequest } from "./user.controller";
const prisma = new PrismaClient();
const createUserRegistration = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (userExists) {
    throw new Error("This email is already registered");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    profilePhoto: req.body.profilePhoto,
  };
  const result = await prisma.$transaction(async (tx) => {
    const createUser = await tx.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        profilePhoto: true,
        password: true,
        status: true,
        role: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return createUser;
  });
  return result;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      status: true,
      role: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getMyProfile = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });
  return userData;
};

const updateMyProfile = async (user: any, req: CustomRequest) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
      status: user.ACTIVE,
    },
  });

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!");
  }

  const file = req.file;

  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedProfileImage && uploadedProfileImage.secure_url) {
      req.body.profilePhoto = uploadedProfileImage.secure_url;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Profile image upload failed!"
      );
    }
  }
  const result = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      email: req?.body?.email,
      name: req?.body?.name,
      profilePhoto: req?.body?.profilePhoto,
    },
  });
  return result;
};

const updateUserRoleStatus = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });
  return result;
};
export const userService = {
  createUserRegistration,
  getAllUser,
  getMyProfile,
  updateMyProfile,
  updateUserRoleStatus,
};
