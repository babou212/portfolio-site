/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use server";

import { cookies } from "next/headers";

import { z } from "zod";
import { db } from "../server/db"
import { redirect } from "next/navigation";

const schemaRegister = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
      }),
    password: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
  });

export async function loginUserAction(prevState: any, formData: FormData) {

    // const user = await db.user.create({
    //   data: {
    //     email: 'admin@admin.com',
    //     password: 'password',
    //   },
    // })
  
    const validatedFields = schemaRegister.safeParse({
      email: formData.get("email"),  
      password: formData.get("password"),
    });
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Login.",
      };
    }
    
    await validateUser(validatedFields.data.email, validatedFields.data.password);

    return {
      ...prevState,
      data: "ok",
    };
  };

async function validateUser(email:string, password:string) {
  const getUser = await db.user.findFirst()

  if (getUser?.password == password && getUser?.email == email) {
    await createSession(crypto.randomUUID(), getUser.id);
} 
};  

async function createSession(token: string, userId: string) {

  const session = await db.session.create({
    data: {
      sessionToken: token,
      expires: new Date(Date.now() + 60 * 60),
      userId: userId,
    },
  })

  cookies().set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60),
  });

  redirect("/admin-panel")
};
