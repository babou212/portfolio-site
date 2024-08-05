/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { EmailTemplate }  from "../components/emailTemplate";
import { render } from "@react-email/components";
import { NextResponse } from 'next/server'
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
        message: formData.get("message"),
      });
  
      if (!validatedFields.success) {
        return {
          ...prevState,
          message: "Missing Fields. Failed to Upload.",
        }
      }
    
    const emailPwd = process.env.MAILGUN_API_KEY;

    try {
      const transporter = nodemailer.createTransport({
        service: 'mailgun',
        auth: {
          user: 'sandbox7de25ad8adcd4c1aac0cb69503f6443c.mailgun.org',
          pass: emailPwd,
        },
      });
      
      const emailHtml = render(<EmailTemplate email={validatedFields.data?.email} content={validatedFields.data?.content} />);

      const email = process.env.PERSONAL_EMAIL;
      
      const options = {
        from: validatedFields.data?.email,
        to: email,
        subject: 'Contact Me',
        html: emailHtml,
      };
      
      await transporter.sendMail(options);

      return NextResponse.json({ message: "Success: email was sent" }, {
        status: 200});

    } catch (error) {
      return NextResponse.json({ message: "COULD NOT SEND MESSAGE"}, {
      status: 500});
    }
}
