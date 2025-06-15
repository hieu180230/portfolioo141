"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDate } from "date-fns"
import ReactMarkdown from 'react-markdown'
import Link from "next/link";
import Image from 'next/image'
import { Button } from "@/components/ui/button";

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
            const response = await axios.get("https://portfolioo-141.shuttle.app/blog", {});
            console.log(response);
            set_blog(response.data[0])
            set_blogs(response.data)
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

    const render_blogs = (blogs_to_render) => {
        return (
            <div className="grid-container h-full max-w-[1280px] gap-6">
                <ul className="px-4 py-4 text-center flex flex-row w-full gap-6 h-full">
                    {blogs_to_render.map((blog, index) => (
                        <span key={index} tabIndex="-1" className="transition-all btn-shadow h-2/5 w-full">
                            <li key={index}
                                className="bg-white text-accent hover:text-destructive-foreground transition-all font-bold text-2xl h-full w-full border-2 border-accent">
                                <Link href={{ pathname: "/blog/view", query: blog }} as={`blog/view?id=${blog._id.$oid}`} className="max-w-40 m-4 place-self-end">
                                    <div className="bg-white items-center flex flex-col">
                                        <span className="">
                                            {`${blog.title}`}
                                        </span>
                                        <div className="flex flex-row overflow-scroll overflow-y-hidden h-fit w-fit">
                                            {blog.tags.map((tag, index) => (
                                                <span className="w-fit h-fit py-[2px] px-[1px] border-2 border-accent text-[20px]">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </span>
                    ))}
                </ul>
            </div>
        )
    }

    const render_latest = async (blogs_to_render) => {
        return (
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full">

                {/* Feature */}
                <div className="item-shadow transition-all col-span-2 row-span-2 row-start-1 col-start-3 z-2">
                    <div className="btn cp-item item w-full h-full align-top bg-accent">
                        <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white">
                            <img src="assets/image/morgana.jpg" className="image absolute bottom-[40px] align-baseline z-1" />
                            <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                                <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                                    <span className="item-title font-bold">{blogs_to_render[blogs_to_render.length - 1].title}</span>
                                    <span className="">
                                        {blogs_to_render[blogs_to_render.length - 1].tags.map((tag, index) => (
                                            <span className="w-fit h-fit py-[2px] px-[1px] text-[17px] font-medium">{tag}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="blog-title view-btn w-full text-center content-center z-3">explore</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-shadow transition-all">
                    <div className="btn cp-item item w-full h-full align-top bg-accent">
                        <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white">
                            <img src="assets/image/morgana.jpg" className="image absolute bottom-[40px] align-baseline z-1" />
                            <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                                <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                                    <span className="item-title font-bold">{blogs_to_render[blogs_to_render.length - 2].title}</span>
                                    <span className="">
                                        {blogs_to_render[blogs_to_render.length - 2].tags.map((tag, index) => (
                                            <span className="w-fit h-fit py-[2px] px-[1px] text-[17px] font-medium">{tag}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="blog-title view-btn w-full text-center content-center z-3">explore</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-shadow transition-all">
                    <div className="btn cp-item item w-full h-full align-top bg-accent">
                        <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white">
                            <img src="assets/image/morgana.jpg" className="image absolute bottom-[40px] align-baseline z-1" />
                            <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                                <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                                    <span className="item-title font-bold">{blogs_to_render[blogs_to_render.length - 3].title}</span>
                                    <span className="">
                                        {blogs_to_render[blogs_to_render.length - 3].tags.map((tag, index) => (
                                            <span className="w-fit h-fit py-[2px] px-[1px] text-[17px] font-medium">{tag}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="blog-title view-btn w-full text-center content-center z-3">explore</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-shadow transition-all row-start-2">
                    <div className="btn cp-item item w-full h-full align-top bg-accent">
                        <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white">
                            <img src="assets/image/morgana.jpg" className="image absolute bottom-[40px] align-baseline z-1" />
                            <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                                <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                                    <span className="item-title font-bold">{blogs_to_render[blogs_to_render.length - 4].title}</span>
                                    <span className="">
                                        {blogs_to_render[blogs_to_render.length - 4].tags.map((tag, index) => (
                                            <span className="w-fit h-fit py-[2px] px-[1px] text-[17px] font-medium">{tag}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="blog-title view-btn w-full text-center content-center z-3">explore</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-shadow transition-all row-start-2">
                    <div className="btn cp-item item w-full h-full align-top bg-accent">
                        <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white">
                            <img src="assets/image/morgana.jpg" className="image absolute bottom-[40px] align-baseline z-1" />
                            <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                                <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                                    <span className="item-title font-bold">{blogs_to_render[blogs_to_render.length - 5].title}</span>
                                    <span className="">
                                        {blogs_to_render[blogs_to_render.length - 5].tags.map((tag, index) => (
                                            <span className="w-fit h-fit py-[2px] px-[1px] text-[17px] font-medium">{tag}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="blog-title view-btn w-full text-center content-center z-3">explore</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (<div className="h-3/4 w-3/4 m-auto">
        {/* Body */}
        {/* {render_blogs(blogs)} */}

        {render_latest(blogs)}
        <div className="transition-all btn-shadow w-fit fixed bottom-5 right-5">
            <div className="btn cp-add-button bg-accent hover:bg-destructive-foreground text-accent hover:text-destructive-foreground transition-all font-bold text-xl h-[60px] w-[60px] place-self-end">
                <Link href="/blog/add">
                    <span className="btn-content bg-white cp-add-button items-center">
                        <label htmlFor=""></label>
                        <span className="py-10">
                            +
                        </span>
                    </span>
                </Link>
            </div>
        </div>
    </div >);
}

export default Blog;