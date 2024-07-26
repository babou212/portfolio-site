"use server";

import { db } from "./db";

export async function getUserByEmail(email: string | undefined) {
  if (email == undefined) { return  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

   return user;
}

export async function createPost(title: string, content: string, filePath: string) {
  if (title == undefined) { return }

  await db.post.create({
    data: {
      title: title,
      content: content,
      image: filePath,
    },
  })
}
