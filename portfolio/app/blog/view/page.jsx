export const dynamic = 'force-dynamic';

import Loading from "@/app/loading";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format, formatDate } from "date-fns";

async function get_blog(post_id) {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    console.warn(
      "API_URL is undefined!",
    );
    return undefined;
  }

  try {
    const res = await fetch(`${baseUrl}/blog?id=${post_id}`, {
      cache: "no-store",
      next: { tags: ["blogs"] },
    });

    if (!res.ok) throw new Error("Backend collapsed");
    return res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

const BlogView = async ({ searchParams }) => {
  const post_id = (await searchParams).id;
  console.log(post_id); 
  const blog = await get_blog(post_id);

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
