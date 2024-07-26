/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React from "react";
import { useFormState } from "react-dom";

import { postUpload } from "../server/postUploadAction";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ZodErrors } from "./zodErrors";

const INITIAL_STATE = {
    data: null,
  };

export default function CreatePost() {
    const [formState, formAction] = useFormState(
        postUpload,
        INITIAL_STATE
      );
    
    return(
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold">Upload Post</CardTitle>
                        <CardDescription>
                            Enter the Required info to create new Post
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            type="title"
                            placeholder="Nice waterfall Picture"
                        />
                        </div>
                        <ZodErrors error={formState?.zodErrors?.title} />
                        <div className="space-y-2">
                        <Label htmlFor="content">Post Description</Label>
                        <Input
                            id="content"
                            name="content"
                            type="content"
                            placeholder="Nice waterfall picture taken on walk with friends"
                        />
                     </div>
                     <ZodErrors error={formState?.zodErrors?.content} />
                     <div className="space-y-2">
                        <Label htmlFor="file">Image</Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                        />
                     </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full">Upload Post</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};
