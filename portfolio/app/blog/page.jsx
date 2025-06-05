"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { format, formatDate } from "date-fns"
import { Textarea } from "@/components/ui/textarea";

const Blog = () => {

    const [blogs, set_blogs] = useState([]);
    const [blog_input, set_blog_input] = useState();
    const [blogs_copy, set_blogs_copy] = useState(blogs);
    const [blog, set_blog] = useState();

    const [open_form, set_open_form] = useState(false);

    const handle_open = async () => {
        set_open_form(true);
        set_blog_input({"title":"","content":"", "author":""})
    }
    const handle_close = async () => {
        set_open_form(false);
    }

    const [count, set_count] = useState(0);

    useEffect(() => {
        fetch_blogs();
    }, [count]);

    const fetch_blogs = async () => {
        try {
            const response = await axios.get("https://portfolioo-141.shuttle.app/blog", {});
            console.log(response);
            set_blog(response.data[0])
            set_blogs(response.data)
            set_blogs_copy(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    const add_blog = async () => {
        try {
            const response = await axios.get("https://portfolioo-141.shuttle.app/blog", { blog_input });
            console.log(response);
            set_blogs(response.data);
            set_blogs_copy(response.data);
            set_blog_input();
        } catch (err) {
            console.log(err)
        }
    }

    const from_date = (date_string) => {
        try {
            const date = new Date(date_string);
            return isNaN(date.getTime()) ? "Invalid Date" : format(date, "iii LLL dd yyyy");
        }
        catch (error) {
            console.log(error);
        }
    }

    const render_blog = (blogs_to_render) => {
        return blogs_to_render.map((blog, index) => (
            <span key={index} tabIndex="-1" className="transition-all btn-shadow">
                <li key={index}
                    className="btn cp-title bg-accent hover:bg-destructive-foreground text-accent hover:text-destructive-foreground transition-all font-bold text-xl h-[60px]"
                    onClick={event => set_blog(blog)}>
                    <span className="btn_content bg-white cp-title items-center">
                        <label htmlFor=""></label>
                        <span className="py-10">
                            {`${blog.title}`}
                        </span>
                    </span>
                    <span className="btn_label">{`${from_date(blog.created_at)}`}</span>
                </li>
            </span>
        ))
    }

    return (<div className="">
        <div className="flex">
            {/* Body */}
            <div className="container py-[40px] flex flex-row w-full px-[50px] h-full m-auto">
                <ul className="text-center flex flex-col max-w-300 min-w-auto gap-6 mx-[10px]">
                    {render_blog(blogs)}
                    <span tabIndex="-1" className="transition-all btn-shadow">
                        <li
                            className="btn cp-title bg-accent hover:bg-destructive-foreground text-accent hover:text-destructive-foreground transition-all font-bold text-xl h-[60px]"
                            onClick={handle_open}>
                            <span className="btn_content bg-white cp-title items-center">
                                <label htmlFor=""></label>
                                <span className="py-10">
                                    +
                                </span>
                            </span>
                        </li>
                    </span>
                </ul>
                {blogs.length === 0 && (
                    <div>
                        <h1 className="text-center "> NOT FOUND</h1>
                    </div>
                )}
                {blogs.length !== 0 && !open_form && (
                    <div className="flex items-stretch w-full px-[10px]">
                        <div className="btn cp-post bg-accent text-accent w-full">
                            <div className="btn_content bg-white cp-post"> {`${blog.content}`} </div>
                        </div>
                    </div>
                )}
                {open_form && (
                    <div className="flex items-stretch w-full px-[10px]">
                        <div className="btn cp-post bg-accent text-accent w-full">
                            <div className="btn_content bg-white cp-post flex flex-col justify-between px-[10px] py-[20px] transition-all">
                                <Input className="w-fit self-center text-2xl px-10 py-5 text-center focus:shadow-accent-hover focus:shadow-xl focus:border-2 transition-all" type="text" placeholder="Blog Title" name="title"/>
                                <Textarea className="h-full py-5" type="text" placeholder="Blog Content" name="content"/>
                                <input type="text" placeholder="Blog Author" name="author"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>);
}

export default Blog;