"use client"

import React from 'react'
import Link from "next/link";
import { useSearchParams } from 'next/navigation'

const BlogView = (context) => {

  const params = useSearchParams()
  const post_id = params.get("id");
  const blog = context.query;
  return (
    <div>
      {post_id}
      <div className="container py-[20px] flex flex-row w-full mx-auto">
        <div className="flex  w-full px-[10px]">
          <div className="btn cp-post bg-accent text-foreground w-full">
            <div className="btn_content bg-white cp-post flex flex-col justify-start px-[10px] py-[10px] gap-4">
              <div className="w-fit self-center text-[30px] px-10 text-center font-bold shadow-md shadow-accent rounded-xs">
                <span>{`${blog.title}`}</span>
              </div>
              <div className="py-5 self-center mr-10 ml-10 overflow-hidden overflow-x-hidden w-full markdown h-full">
                <ReactMarkdown>{`${blog.content}`}</ReactMarkdown>
              </div>
              <div className="grid grid-cols-2 mt-auto">
                <div className="w-fit h-fit font-bold px-4 place-self-start my-auto">{`${blog.author}`}<br />{`${from_date(blog.created_at)}`}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogView
