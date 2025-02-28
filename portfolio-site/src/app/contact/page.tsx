/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useFormState } from "react-dom";

import { sendEmailAction } from "../../server/emailAction";

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../../components/ui/card";

import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import React, { useRef, useState } from "react";

const INITIAL_STATE = {
  data: null,
};

export default function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, formAction] = useFormState(
    sendEmailAction,
    INITIAL_STATE
  );

  const ref = useRef<HTMLFormElement>(null)

  if (submitted == true) { ref.current?.reset() };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <form ref={ref} onSubmit={() => setSubmitted(true)} action={formAction}>
          <Card className="p-8">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea 
                    id="content"
                    name="content" 
                    placeholder="Type your message here." />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">Send Message</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
