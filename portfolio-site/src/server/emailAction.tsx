/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { EmailTemplate }  from "../components/emailTemplate";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { z } from "zod";

const schemaRegister = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
      }),
    content: z.string().min(5).max(100, {
      message: "Please enter valid message, must be between 5 and 100 characters",
    }),
  });

export async function sendEmailAction(prevState: any, formData: FormData) {

    const validatedFields = schemaRegister.safeParse({
        email: formData.get("email"),  
        content: formData.get("content"),
      });
    
    if (!validatedFields.success) {
      return {
        ...prevState,
        message: "Missing Fields. Failed to Upload.",
      }
    } 

    const emailPwd = process.env.MAILGUN_PASSWORD;
    const emailUser = process.env.MAILGUN_USERNAME;

      const transporter = nodemailer.createTransport({
        host: 'smtp.eu.mailgun.org',
        port: 587,
        auth: {
          user: emailUser,
          pass: emailPwd,
        },
      });
      
      const emailHtml = render(<EmailTemplate email={validatedFields.data?.email} content={validatedFields.data?.content} />);

      const email = process.env.PERSONAL_EMAIL;
      
      const options = {
        from: '"Dylan Cree" <noreply@swagmeister.uk>',
        to: email,
        subject: 'Contact Me',
        html: emailHtml,
      };
      
      await transporter.sendMail(options);

      return {
        ...prevState,
        data: "ok",
    };
}
