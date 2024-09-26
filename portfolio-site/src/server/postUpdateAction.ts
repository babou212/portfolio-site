/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";
import { updatePost } from "./repo";
import { verifySession } from "./session";

const schemaRegister = z.object({
    title: z.string().min(1).max(100, {
        message: "Please enter a valid title",
      }),
    content: z.string().min(1).max(300, {
        message: "Please enter valid description",
      }),
    category: z.string().min(1).max(20, {
        message: "Please enter category description",
      }),
    id: z.number().min(1).max(10000, {
      message: "Please ensure an ID is present",
    }),
});

export async function postUpdate(prevState: any, formData: FormData) {
  
  if (!verifySession) {
    return {
      ...prevState,
      message: "Not an authorized user.",
    }
  }

    const validatedFields = schemaRegister.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      id: Number(formData.get("id")),   
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        message: "Missing Fields. Failed to Upload.",
      }
    }

    const shouldDisplay = formData.get("isDisplay") === "true";

    await updatePost(validatedFields.data.id, validatedFields.data.title, validatedFields.data.content,
      validatedFields.data.category, shouldDisplay);

    return {
      ...prevState,
      data: "ok",
    };
};
