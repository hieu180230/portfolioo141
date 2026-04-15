"use client";

import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format, formatDate } from "date-fns";

const BlogView = () => {
  const [blog, set_blog] = useState();
  const [status, set_status] = useState(0);
  const params = useSearchParams();
  const post_id = params.get("id");

  const fetch_blog = async () => {
    try {
      const response = await axios.get(
        `https://portfolioo-141.shuttle.app/blog/view?id=${post_id}`,
        {},
      );
      set_blog(response.data);
      set_status(1);
      console.log(blog);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetch_blog = async () => {
      try {
        const response = await axios.get(
          `https://portfolioo-141.shuttle.app/blog/view?id=${post_id}`,
          {},
        );
        set_blog(response.data);
        set_status(1);
      } catch (err) {
        console.error(err);
        set_status(0);
      }
    };
    fetch_blog();
  });

  const from_date = (date_string) => {
    try {
      const date = new Date(date_string);
      return isNaN(date.getTime())
        ? "Invalid Date"
        : format(date, "iii LLL dd yyyy");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit w-7/8 mx-auto flex flex-col transition-all py-5 align-baseline ">
      {typeof blog !== "undefined" ? (
        <div className="py-10">
          <div className="btn cp-post bg-accent flex text-primary font-bold text-4xl h-30 w-full shadow-2xl shadow-black my-5">
            <div className="btn-content bg-white cp-post items-center justify-center flex py-10">
              <span>{`${blog.title}`}</span>
            </div>
          </div>
          <div className="py-5 px-5 self-center overflow-visible w-full markdown h-fit">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >{`${blog.content}`}</ReactMarkdown>
          </div>
          <div className="w-fit h-fit font-bold px-4 place-self-end text-right text-lg">
            {`${blog.author}`}
            <br />
            {`${from_date(blog.created_at)}`}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BlogView;
