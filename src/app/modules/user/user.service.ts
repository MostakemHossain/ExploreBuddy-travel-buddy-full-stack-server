import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { fileUploader } from "../../../helpers/fileUpload";
const prisma = new PrismaClient();
const createUserRegistration = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
    console.log(req.body);
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
        status: true,
        role: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    await tx.userProfile.create({
      data: {
        userId: createUser.id,
        bio: req.body.profile.bio,
        age: req.body.profile.age,
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

export const userService = {
  createUserRegistration,
  getAllUser,
};
