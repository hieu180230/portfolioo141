"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDate } from "date-fns"

const Blog = () => {

    const [blogs, set_blogs] = useState([]);
    const [blogs_copy, set_blogs_copy] = useState(blogs);
    const [edit_index, set_edit_index] = useState(-1);


    const [count, set_count] = useState(0);

    useEffect(() => {
        fetch_blogs();
    }, [count]);

    const fetch_blogs = async () => {
        try {
            const response = await axios.get("portfolioo-141.shuttle.app/blog", {});
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
                className="py-2 px-4 mx-auto my-4 w-full cyberpunk">
                <label htmlFor="" className="form-check-label"></label>
                <span className="blog-text">
                    {`${blog.title} - ${from_date(blog.created_at)}`}
                </span>
                <span className="span-button"></span>
            </li>
        ))
    }
    return (<div className="main-body">
        <div className="blog-page">
            {/* Body */}
            <div className="container mx-auto flex xl:flex-col flex-row gap-6">
                <ul className="text-center">
                    {render_blog(blogs)}
                </ul>
                {blogs.length === 0 && (
                    <div>
                        <h1 className="text-center "> NOT FOUND</h1>
                    </div>
                )}
            </div>
        </div>
    </div>);
}

export default Blog;