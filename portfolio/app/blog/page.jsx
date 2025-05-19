"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDate } from "date-fns"

const Blog = () => {

    const [blogs, set_blogs] = useState([]);
    const [blogs_copy, set_blogs_copy] = useState(blogs);
    const [blog, set_blog] = useState();


    const [count, set_count] = useState(0);

    useEffect(() => {
        fetch_blogs();
    }, [count]);

    const fetch_blogs = async () => {
        try {
            const response = await axios.get("https://porfolioo141-5qav.shuttle.app/blog", {});
            console.log(response);
            set_blogs(response.data);
            set_blogs_copy(response.data);
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
            <li key={index}
                className="btn bg-accent hover:bg-destructive-foreground text-accent hover:text-destructive-foreground transition-colors font-bold text-xl"
                onClick={event => set_blog(blog)}>
                <span className="btn_content bg-white">
                    <label htmlFor=""></label>
                    <span className="py-10">
                        {`${blog.title}`}
                    </span>
                    
                </span>
                
                <span className="btn_label">{`${from_date(blog.created_at)}`}</span>
            </li>
        ))
    }

    const render_blog_content = (blogs_to_render) => {

    }

    return (<div className="main-body">
        <div className="blog-page">
            {/* Body */}
            <div className="container py-10 flex flex-row w-max px-50">
                <ul className="text-center flex flex-col w-full min-w-[300px] gap-6 mx-10">
                    {render_blog(blogs)}
                </ul>
                {blogs.length === 0 && (
                    <div>
                        <h1 className="text-center "> NOT FOUND</h1>
                    </div>
                )}
                <div className="">
                    <div className="btn bg-accent text-accent">
                        <div className="btn_content bg-white"> {`${blog.content}`} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Blog;