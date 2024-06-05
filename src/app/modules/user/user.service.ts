import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { fileUploader } from "../../../helpers/fileUpload";
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
    where: {
      status: "ACTIVE",
      isDeleted: false,
    },
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
      id: user.userId,
    },
  });
  return userData;
};

const updateMyProfile = async (user: any, payload: any) => {
  const { profile, ...remainingData } = payload;
  const userData = await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      ...remainingData,
    },
  });
  const updatedUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
      status: true,
      isDeleted: true,
      profilePhoto: true,
      userProfile: {
        select: {
          bio: true,
          age: true,
        },
      },
    },
  });

  return updatedUser;
};
export const userService = {
  createUserRegistration,
  getAllUser,
  getMyProfile,
  updateMyProfile,
};
