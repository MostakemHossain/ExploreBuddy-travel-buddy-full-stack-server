import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const createUserRegistration = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
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
        bio: payload.profile.bio,
        age: payload.profile.age,
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
