/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { EmailTemplate } from '../../../components/emailTemplate';
import { Resend } from 'resend';
import { z } from "zod";

import type * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

const schemaRegister = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
      }),
    content: z.string().min(5).max(100, {
      message: "Please enter valid message, must be between 5 and 100 characters",
    }),
  });

export async function POST(prevState: any, formData: FormData) {

    const validatedFields = schemaRegister.safeParse({
        email: formData.get("email"),  
        message: formData.get("message"),
      });
  
      if (!validatedFields.success) {
        return {
          ...prevState,
          message: "Missing Fields. Failed to Upload.",
        }
      }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Dylan Cree <contact@swagmeister.uk>',
      to: validatedFields.data?.email,
      subject: "Contact Form",
      react: EmailTemplate({ email: validatedFields.data?.email, content: validatedFields.data?.content  }) as React.ReactElement,
    });

    console.log("inside email block");

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
