import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const prisma = new PrismaClient();
const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
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

export const authService = {
  loginUser,
};
