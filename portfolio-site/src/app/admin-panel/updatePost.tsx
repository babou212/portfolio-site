/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";

import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { postUpdate } from "~/server/postUpdateAction";

const INITIAL_STATE = {
    data: null,
  };

type Post = {
    id: number;
    title: string;
    image: string;
    content: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    isDisplay: boolean;
};

export default function UpdatePost(posts: any, Post: Post) {
    const [submitted, setSubmitted] = useState(false);
    const [value, setValue] = useState(Post);
    const [formState, formAction] = useFormState(
        postUpdate,
        INITIAL_STATE
      );

    console.log(value);

    const ref = useRef<HTMLFormElement>(null)
    if (submitted == true) { ref.current?.reset() };

    return(
        <div className="w-full max-w-md pt-10">
            <form ref={ref} onSubmit={() => setSubmitted(true)} action={formAction}>
                <Card className="p-4">
                    <CardHeader className="space-y-1">
                    <div className="w-max">
                        <Select onValueChange={(val) => setValue(JSON.parse(val))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Post to Update" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Posts</SelectLabel>
                                {posts.posts.map((post: any) => (
                                    <SelectItem key={post.id} value={JSON.stringify(post)}>{post.title}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <CardTitle className="text-3xl font-bold">Update Post</CardTitle>
                        <CardDescription>
                            Enter info below to update Post
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            type="title"
                            placeholder={value.title}
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="content">Post Description</Label>
                        <Textarea id="content"
                                  name="content" 
                                  placeholder={value.content} />
                     </div>
                     <div className="space-y-2">
                     <Label htmlFor="category">Category</Label>
                     <Select name="category">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={value.category} />
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
                     <Label htmlFor="category">Display On Front Page</Label>
                     <Select name="isDisplay">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Yes or No" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="false">No</SelectItem>
                            <SelectItem value="true">Yes</SelectItem>
                        </SelectContent>
                        </Select>
                     </div>
                    </CardContent>
                    <input type="hidden" id="id" name="id" value={value.id} />
                    <CardFooter className="flex flex-col">
                        <Button className="w-full">Update Post</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};
