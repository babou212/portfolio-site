/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";

import { postUpload } from "../server/postUploadAction";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const INITIAL_STATE = {
    data: null,
  };

export default function CreatePost() {
    const [submitted, setSubmitted] = useState(false);
    const [formState, formAction] = useFormState(
        postUpload,
        INITIAL_STATE
      );
    
    const ref = useRef<HTMLFormElement>(null)

    console.log(formState.message);

    if (submitted == true) { ref.current?.reset() };
        
    return(
        <div className="w-full max-w-md">
            <form ref={ref} onSubmit={() => setSubmitted(true)} action={formAction}>
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
                        <div className="space-y-2">
                        <Label htmlFor="content">Post Description</Label>
                        <Input
                            id="content"
                            name="content"
                            type="content"
                            placeholder="Nice waterfall picture taken on walk with friends"
                        />
                     </div>
                     <div className="space-y-2">
                     <Label htmlFor="category">Category</Label>
                     <Select name="category">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Black and white">Black and white</SelectItem>
                            <SelectItem value="Landscape">Landscape</SelectItem>
                            <SelectItem value="Forest">Forest</SelectItem>
                            <SelectItem value="Seascape">Seascape</SelectItem>
                        </SelectContent>
                        </Select>
                     </div>
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
