import { PrismaClient } from "@/generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient({
    errorFormat: "pretty",
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "development") globalThis.prismaGlobal = prisma;
