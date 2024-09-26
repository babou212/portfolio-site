/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'server-only';

import { db } from "./db";
import { verifySession } from './session';

export async function getUserByEmail(email: string) {
  if (email == undefined) { return  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

   return user;
}

export async function createPost(title: string, content: string, category: string, isDisplay: boolean ,filePath: string) {
  if (await verifySession() == false) { return } 

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

export async function getPosts() {
  const posts =  await db.post.findMany();

 return posts;
}

export async function updatePost(id: number, title: string, content: string, category: string, isDisplay: boolean) {
  if (await verifySession() == false) { return } 

  await db.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      category: category,
      isDisplay: isDisplay,
    },
  })
}
