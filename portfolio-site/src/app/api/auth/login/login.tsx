/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useFormState } from "react-dom";

import { loginUserAction } from "../../../../server/authActions";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../../../../components/ui/card";

import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "~/components/ui/button";

const INITIAL_STATE = {
  data: null,
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(
    loginUserAction,
    INITIAL_STATE
  );

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign In</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
