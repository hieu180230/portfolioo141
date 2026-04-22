export const dynamic = 'force-dynamic';

import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import Carousel from "@/components/carousel";
import Loading from "../loading";

async function get_works() {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    console.warn("API_URL is undefined! Returning empty array for prerender.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/projects`, {
      cache: "no-store",
      next: { tags: ["blogs"] },
    });

    if (!res.ok) throw new Error("Backend collapsed");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Work = async () => {
  const projects = await get_works();

  return (
    <section className="container w-screen flex flex-col justify-center mx-auto">
      {projects.length > 3 ? (
        <div className="h-fit w-full flex relative my-10 overflow-visible">
          <Carousel data={projects} />
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      {/* Full project */}
      <div className="flex flex-col">
        <span className="h-10 py-10 text-center font-bold text-2xl">
          {" "}
          Full projects{" "}
        </span>
        {projects.length > 0 ? (
          <div className="container mx-auto h-full py-10">
              {projects.map((service, index) => {
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col justify-center gap-6 group bg-primary-hover px-6 py-4 rounded-xl shadow hover:shadow-destructive-hover hover:shadow-lg border-b-4 border-accent hover:border-destructive-foreground hover:scale-110 transition-all mx-4"
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="text-3xl font-bold text-primary transition-all duration-500">
                        {service.title}
                      </div>
                      <Link
                        href={service.href}
                        className="min-w-[50px] min-h-[50px] rounded-full bg-accent group-hover:bg-destructive-hover transition-all duration-500 flex justify-center items-center group-hover:-rotate-45 "
                      >
                        <BsArrowDownRight className="text-primary-hover text-2xl" />
                      </Link>
                    </div>
                    <p className="text-primary font-medium whitespace-pre-wrap text-left">
                      {service.description}
                    </p>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
