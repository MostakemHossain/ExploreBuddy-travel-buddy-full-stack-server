import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createContact = async (payload: any) => {
  const res = await prisma.contact.create({
    data: payload,
  });
  return res;
};
const getAllContact = async () => {
  const res = await prisma.contact.findMany({});
  return res;
};

export const contactServices = {
  createContact,
  getAllContact,
};
