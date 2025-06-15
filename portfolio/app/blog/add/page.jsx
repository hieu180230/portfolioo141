"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { format, formatDate } from "date-fns"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Redirect } from "react-router-dom"
import Blog from '../page';



import axios from "axios";

const BlogAdd = () => {
    const [blog_value, set_value] = useState({ title: String, content: String, author: String });

    const handle_change = (c) => {
        const { name, value } = c.target;
        set_value({ ...blog_value, [name]: value })
    }



    const handle_submit = async (c) => {
        c.preventDefault();
        console.log(blog_value)
        const response = await axios.post("https://portfolioo-141.shuttle.app/blog", blog_value, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        window.location.replace('/blog');
    }

    return (
        <form onSubmit={handle_submit}>
            <div className="container py-[40px] w-full px-[50px] m-auto min-h-[700px] flex">
                <div className="flex w-full px-[10px]">
                    <div className="btn cp-add bg-accent text-accent w-full min-h-[700px] flex">
                        <div className="btn_content bg-white cp-add flex flex-col justify-start px-[10px] py-[20px] transition-all gap-4">
                            <Input className="w-fit self-center text-2xl px-10 py-5 text-center focus:shadow-accent-hover focus:shadow-md transition-all"
                                type="text"
                                placeholder="Blog Title"
                                name="title"
                                required
                                value={blog_value.title}
                                onChange={handle_change} />
                            <Textarea className="h-[200px] py-5 self-center mr-10 ml-10"
                                type="text"
                                placeholder="Blog Content"
                                name="content"
                                required
                                value={blog_value.content}
                                onChange={handle_change} />
                            <div className="grid grid-cols-2 mt-auto">
                                <Input className="w-fit h-[10px] m-4 place-self-start"
                                    placeholder="Blog Author"
                                    name="author"
                                    required
                                    value={blog_value.author}
                                    onChange={handle_change} />
                                <Button size="md" className="max-w-40 m-4 place-self-end" type="submit">Send!</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BlogAdd
