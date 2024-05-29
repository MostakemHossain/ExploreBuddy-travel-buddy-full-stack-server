import { PrismaClient, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const prisma = new PrismaClient();
const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Unauthorized Access");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_serect as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt_refresh_serect as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_serect as string
    );
  } catch (err) {
    throw new Error("Unauthorized Access");
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelpers.generateToken(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt_access_serect as string,
    config.jwt_access_expires_in as string
  );
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Incorrect Password");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
    },
  });
  return {
    message: "Password change successfully",
  };
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
};
