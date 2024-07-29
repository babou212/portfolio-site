/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import fs from "node:fs/promises";

import { z } from "zod";
import { createPost } from "./repo";

const MAX_FILE_SIZE = 50000000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schemaRegister = z.object({
    title: z.string().min(5).max(100, {
        message: "Please enter a valid title",
      }),
    content: z.string().min(0).max(100, {
        message: "Please enter valid description",
      }),
      category: z.string().min(1).max(20, {
        message: "Please enter category description",
      }),
    image: z.any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Please update or add new image.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 500MB.`),
});

export async function postUpload(prevState: any, formData: FormData) {

    const validatedFields = schemaRegister.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      image: formData.get("file"),    
    });
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        message: "Missing Fields. Failed to Upload.",
      }
    }

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/upload/${file.name}`, buffer);

    const fileName = validatedFields.data.image?.name;
    const imageFilePath = "/upload/" + fileName;

    const shouldDisplay = formData.get("isDisplay") === "true";

    await createPost(validatedFields.data.title, validatedFields.data.content,
      validatedFields.data.category, shouldDisplay ,imageFilePath);

    return {
      ...prevState,
      data: "ok",
    };
};
