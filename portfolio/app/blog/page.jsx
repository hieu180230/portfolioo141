"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDate } from "date-fns";
import Link from "next/link";
import Loading from "../loading";
import Image from "next/image";

const Blog = () => {
  const [blogs, set_blogs] = useState([]);

  const [blog, set_blog] = useState();
  const [count, set_count] = useState(0);

  useEffect(() => {
    const fetch_blogs = async () => {
      try {
        const response = await axios.get(
          "https://portfolioo-141.shuttle.app/blog",
          {},
        );
        set_blogs(response.data);
        set_blog(response.data[0]);
        set_count(response.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetch_blogs();
  }, [count]);

  const from_date = (date_string) => {
    try {
      const date = new Date(date_string);
      return isNaN(date.getTime())
        ? "Invalid Date"
        : format(date, "iii LLL dd yyyy");
    } catch (error) {
      console.error(error);
      return "Invalid Date";
    }
  };

  const render_blogs = (blogs_to_render) => {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row justify-center items-center pt-10">
          <svg height="8" width="200">
            <defs>
              <linearGradient
                id="face_left"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="4"
              x2="190"
              y2="4"
              stroke="url(#face_left)"
              strokeWidth="1.5"
            />
            <circle cx="190" cy="4" r="2" fill="var(--accent)" />
          </svg>
          <span
            className="text-center py-10 text-3xl font-semibold uppercase"
            style={{ textShadow: "0 4px 4px var(--accent)" }}
          >
            full blogs
          </span>
          <svg height="8" width="200">
            <defs>
              <linearGradient
                id="fade_right"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="70%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line
              x1="10"
              y1="4"
              x2="200"
              y2="4"
              stroke="url(#fade_right)"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="4" r="2" fill="var(--accent)" />
          </svg>
        </div>
        <ul className="px-4 text-center flex flex-col w-full gap-6 h-full justify-center items-center">
          {blogs_to_render.map((blog, index) => (
            <div
              key={index}
              tabIndex="-1"
              className="flex transition-all btn-shadow h-1/7 w-full my-2 align-baseline hover:scale-105"
            >
              <li
                key={index}
                className="btn cp-panel bg-accent hover:bg-destructive-foreground flex text-primary font-bold text-xl h-full w-full"
              >
                <Link
                  href={{ pathname: "/blog/view", query: blog.$oid }}
                  as={`blog/view?id=${blog._id.$oid}`}
                  className="place-self-end"
                >
                  <div className="btn-content bg-white cp-panel items-center flex flex-col">
                    <div className="py-2 px-2 text-center w-full">
                      {`${blog.title}`}
                    </div>
                    <div className="flex flex-row overflow-scroll overflow-y-hidden h-fit w-full px-2 justify-center">
                      {blog.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="btn cp-tag bg-accent w-[9rem] h-[2rem] flex text-accent font-bold text-sm"
                        >
                          <div className="btn-content cp-tag bg-white items-center justify-center z-2">
                            {tag}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="py-2 px-2 text-sm w-fit h-fit absolute right-2 bottom-0">
                      {`${blog.author}`} - {`${from_date(blog.created_at)}`}
                    </div>
                  </div>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  const render_latest = (blogs_to_render) => {
    return (
      <div className="w-[85rem] h-[110rem] flex flex-col justify-center mx-auto">
        <div className="flex flex-row justify-center items-center ">
          <svg height="8" width="200">
            <defs>
              <linearGradient
                id="face_left"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="4"
              x2="190"
              y2="4"
              stroke="url(#face_left)"
              strokeWidth="1.5"
            />
            <circle cx="190" cy="4" r="2" fill="var(--accent)" />
          </svg>
          <span
            className="text-center py-10 text-3xl font-semibold uppercase"
            style={{ textShadow: "0 4px 4px var(--accent)" }}
          >
            latest
          </span>
          <svg height="8" width="200">
            <defs>
              <linearGradient
                id="fade_right"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="70%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line
              x1="10"
              y1="4"
              x2="200"
              y2="4"
              stroke="url(#fade_right)"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="4" r="2" fill="var(--accent)" />
          </svg>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[90rem] py-5">
          {/* Feature */}
          <div className="item-shadow transition-all col-span-2 row-span-2 row-start-1 col-start-3 z-2">
            <div className="btn cp-item item w-full h-full align-top bg-accent">
              <Link
                href={{
                  pathname: "/blog/view",
                  query: blogs_to_render[blogs_to_render.length - 1].$oid,
                }}
                as={`blog/view?id=${blogs_to_render[blogs_to_render.length - 1]._id.$oid}`}
                className="place-self-end"
              >
                <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white justify-center">
                  <Image
                    src="assets/image/morgana.jpg"
                    alt=""
                    className="image absolute bottom-[40px] align-baseline z-1"
                  />
                  <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                    <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                      <span className="item-title font-bold">
                        {blogs_to_render[blogs_to_render.length - 1].title}
                      </span>
                    </div>
                    <div className="blog-title view-btn w-full text-center content-center z-3">
                      explore
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="item-shadow transition-all">
            <div className="btn cp-item item w-full h-full align-top bg-accent">
              <Link
                href={{
                  pathname: "/blog/view",
                  query: blogs_to_render[blogs_to_render.length - 2].$oid,
                }}
                as={`blog/view?id=${blogs_to_render[blogs_to_render.length - 2]._id.$oid}`}
                className="place-self-end"
              >
                <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white justify-center">
                  <Image
                    src="assets/image/morgana.jpg"
                    alt=""
                    className="image absolute bottom-[40px] align-baseline z-1"
                  />
                  <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                    <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                      <span className="item-title font-bold">
                        {blogs_to_render[blogs_to_render.length - 2].title}
                      </span>
                    </div>
                    <div className="blog-title view-btn w-full text-center content-center z-3">
                      explore
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="item-shadow transition-all">
            <div className="btn cp-item item w-full h-full align-top bg-accent">
              <Link
                href={{
                  pathname: "/blog/view",
                  query: blogs_to_render[blogs_to_render.length - 3].$oid,
                }}
                as={`blog/view?id=${blogs_to_render[blogs_to_render.length - 3]._id.$oid}`}
                className="place-self-end"
              >
                <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white justify-center">
                  <Image
                    src="assets/image/morgana.jpg"
                    alt=""
                    className="image absolute bottom-[40px] align-baseline z-1"
                  />
                  <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                    <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                      <span className="item-title font-bold">
                        {blogs_to_render[blogs_to_render.length - 3].title}
                      </span>
                    </div>
                    <div className="blog-title view-btn w-full text-center content-center z-3">
                      explore
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="item-shadow transition-all row-start-2">
            <div className="btn cp-item item w-full h-full align-top bg-accent">
              <Link
                href={{
                  pathname: "/blog/view",
                  query: blogs_to_render[blogs_to_render.length - 4].$oid,
                }}
                as={`blog/view?id=${blogs_to_render[blogs_to_render.length - 4]._id.$oid}`}
                className="place-self-end"
              >
                <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white justify-center">
                  <Image
                    src="assets/image/morgana.jpg"
                    alt=""
                    className="image absolute bottom-[40px] align-baseline z-1"
                  />
                  <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                    <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                      <span className="item-title font-bold">
                        {blogs_to_render[blogs_to_render.length - 4].title}
                      </span>
                      {/* <span className="">
                                            {blogs_to_render[blogs_to_render.length - 4].tags.map((tag, index) => (
                                                <span className="w-fit h-fit py-[2px] px-[1px] text-[17px] font-medium">{tag}</span>
                                            ))}
                                        </span> */}
                    </div>
                    <div className="blog-title view-btn w-full text-center content-center z-3">
                      explore
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="item-shadow transition-all row-start-2">
            <div className="btn cp-item item w-full h-full align-top bg-accent">
              <Link
                href={{
                  pathname: "/blog/view",
                  query: blogs_to_render[blogs_to_render.length - 5].$oid,
                }}
                as={`blog/view?id=${blogs_to_render[blogs_to_render.length - 5]._id.$oid}`}
                className="place-self-end"
              >
                <div className="btn-content cp-item item-normal flex flex-col z-1 bg-white justify-center">
                  <Image
                    src="assets/image/morgana.jpg"
                    alt=""
                    className="image absolute bottom-[40px] align-baseline z-1"
                  />
                  <div className="z-5 align-baseline absolute right-0 bottom-0 left-0 bg-white">
                    <div className="flex flex-col w-full h-fit py-5 px-2 border-t-2 border-accent text-center content-center z-10 break-words">
                      <span className="item-title font-bold">
                        {blogs_to_render[blogs_to_render.length - 5].title}
                      </span>
                    </div>
                    <div className="blog-title view-btn w-full text-center content-center z-3">
                      explore
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {render_blogs(blogs_to_render)}
      </div>
    );
  };

  return (
    <div className="h-screen w-3/4 m-auto">
      {/* Body */}
      {/* {render_blogs(blogs)} */}
      {blogs.length > 0 ? (
        render_latest(blogs)
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <div className="transition-all btn-shadow w-fit fixed bottom-5 right-5">
        <div className="btn cp-add-button bg-accent hover:bg-destructive-foreground text-accent hover:text-destructive-foreground transition-all font-bold text-xl h-[60px] w-[60px] place-self-end">
          <Link href="/blog/add">
            <span className="btn-content bg-white cp-add-button items-center justify-center">
              <label htmlFor="">-</label>
              <span className="py-10">+</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
