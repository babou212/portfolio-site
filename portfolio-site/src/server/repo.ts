/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'server-only';

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

export async function createPost(title: string, content: string | null, category: string, isDisplay: boolean ,filePath: string) {
  if (title == undefined) { return }

  await db.post.create({
    data: {
      title: title,
      content: content,
      category: category,
      image: filePath,
      isDisplay: isDisplay,
    },
  })
}

export async function getAllImage() {
  const imagePaths =  await db.post.findMany({
    select: {
    image: true,
    title: true
   },
 });

 return imagePaths;
}

export async function getCategories() {
  const categories =  await db.post.findMany();

 return categories;
}

export async function getPostsByCategory(category: string) {
  const posts =  await db.post.findMany({
    where: {
      category: category,
    },
 });

 return posts;
}

export async function getPostsThatShouldBeDisplayed() {
  const posts =  await db.post.findMany({
    where: {
      isDisplay: true,
    },
 });

 return posts;
}
