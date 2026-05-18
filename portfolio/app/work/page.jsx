export const dynamic = "force-dynamic";

import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import Carousel from "@/components/carousel";
import Loading from "../loading";

async function get_works() {
  const baseUrl = process.env.API_URL || "http://localhost:8000";

  if (!baseUrl) {
    console.warn("API_URL is undefined! Returning empty array for prerender.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/projects`, {
      cache: "force-cache",
      next: { tags: ["works"] },
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
      {/* Full project */}
      <div className="flex flex-col">
        <span className="h-10 pt-10 text-center font-bold text-3xl uppercase">
          « Full projects »
        </span>
        {projects.length > 0 ? (
          <div className="container mx-auto h-full py-10">
            {projects.map((service, index) => {
              return (
                <Link
                  key={index}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col justify-center gap-6 bg-primary-hover px-6 py-4 rounded-xl shadow hover:shadow-destructive-hover hover:shadow-sm border-b-4 border-accent hover:border-destructive-foreground transition-all mx-9 my-7">
                    <div className="text-xl font-bold text-primary">
                      {service.title}
                    </div>
                    <p className="text-primary font-mono text-left">
                      {service.description}
                    </p>
                  </div>
                </Link>
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
