"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { minDelay } from "../lib/utils";
import createFolder from "../services/folder.services";

type AddFolderState = {
  success: boolean;
};

const AddFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Folder name is required!" })
    .max(100, { message: "Folder name must not exceed 100 characters!" }),
});

type Success = { success: true };
type Error = { success: false; message: string };

type FormState = Success | Error;

export async function addFolder(
  prevState: AddFolderState | null,
  formData: FormData
): Promise<FormState> {
  const result = AddFolderSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      success: false,
      message: (result.error.formErrors.fieldErrors.name as any)[0],
    };
  }
  try {
    await minDelay(createFolder(result.data.name), 1000);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          success: false,
          message: `Folder name must be unique. The name '${result.data.name}' is already in use. Please choose a different name.`,
        };
      }
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
