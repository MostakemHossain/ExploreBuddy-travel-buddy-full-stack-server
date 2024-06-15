import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import httpStatus from "http-status";
import AppError from "../../../error/AppError";
import { fileUploader } from "../../../helpers/fileUpload";
const prisma = new PrismaClient();

const createATeamMember = async (user: any, req: Request) => {
  const userData = await prisma.user.findUnique({
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
  req.body.facebookURL = req.body.facebook;
  req.body.instagramURL = req.body.instagram;
  req.body.linkedinURL = req.body.linkedin;
  delete req.body.facebook;
  delete req.body.instagram;
  delete req.body.linkedin;

  const result = await prisma.team.create({
    data: req.body,
  });
  return result;
};

const getAllTeamMember = async () => {
  const result = await prisma.team.findMany({});
  return result;
};
const deleteATeamMember = async (id: string) => {
  const result = await prisma.team.delete({
    where: {
      id,
    },
  });
  return result;
};
const getATeamMember = async (id: string, req: Request) => {
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
  req.body.facebookURL = req.body.facebook;
  req.body.instagramURL = req.body.instagram;
  req.body.linkedinURL = req.body.linkedin;
  delete req.body.facebook;
  delete req.body.instagram;
  delete req.body.linkedin;
  const result = await prisma.team.update({
    where: {
      id,
    },
    data: req.body,
  });
  return result;
};

export const teamServices = {
  createATeamMember,
  getAllTeamMember,
  deleteATeamMember,
  getATeamMember,
};
