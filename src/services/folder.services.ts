import { prisma } from "../db";

export default async function createFolder(folderName: string) {
  return await prisma.folder.create({
    data: { name: folderName },
  });
}
