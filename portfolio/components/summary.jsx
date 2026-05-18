"use client";
import Image from "next/image";

async function get_resume_items () {
  const baseUrl = process.env.API_URL || "http://localhost:8000";

  if (!baseUrl) {
    console.warn("API_URL is undefined! Returning empty array for prerender.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/resumes`, {
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Loading from "@/app/loading";

const Summary = ({resumes}) => {
  const about = resumes[0].about;
  const exp = resumes[0].experience;
  const edu = resumes[0].education;
  const skill = resumes[0].skills;

  return (
    <div className="min-h-[80vh] flex justify-baseline -py-12 xl:py-0 w-full">
      {resumes.length > 0 ? (
        <div className="container mx-auto">
          <Tabs
            defaultValue="about"
            className="flex flex-col gap-[60px]"
          >
            <TabsList className="flex justify-center mx-auto xl:mx-0 gap-6 w-full">
              <TabsTrigger className="px-10" value="about">About me</TabsTrigger>
              <TabsTrigger className="px-10" value="exp">Experience</TabsTrigger>
              <TabsTrigger className="px-10" value="edu">Education</TabsTrigger>
              <TabsTrigger className="px-10" value="skill">Skills</TabsTrigger>
              
            </TabsList>

            <div className="min-h-[70vh] w-full">
              <TabsContent value="exp" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{exp.title}</h3>
                  <p className="w-fit text-primary mx-auto xl:mx-0 text-balance leading-relaxed">
                    {exp.description}
                  </p>
                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 gap-[30px] pr-4 overflow-scroll h-[400px]">
                      {exp.exp.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="bg-primary-hover border border-accent/20 h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 hover:border-accent hover:shadow-lg transition-all"
                          >
                            <span className="text-accent font-medium text-lg">
                              {item.duration}
                            </span>
                            <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left font-bold mt-2">
                              {item.position}
                            </h3>
                            <div className="flex items-center gap-3 mt-auto">
                              <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
                              <p className="text-primary">{item.company}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="edu" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{edu.title}</h3>
                  <p className="w-fit text-primary mx-auto xl:mx-0 text-balance leading-relaxed">
                    {edu.description}
                  </p>
                  <ScrollArea className="h-[400px] w-full">
                    <ul className="grid grid-cols-1 gap-[30px] pr-4 w-full">
                      {edu.edu.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="w-full bg-primary-hover border border-accent/20 h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 hover:border-accent hover:shadow-lg transition-all"
                          >
                            <span className="text-accent font-medium text-lg">
                              {item.duration}
                            </span>
                            <h3 className="text-xl w-full h-fit text-center lg:text-left font-bold mt-2">
                              {item.degree}
                            </h3>
                            <div className="flex items-center gap-3 mt-auto">
                              <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
                              <p className="text-primary">{item.institution}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>
              <TabsContent value="skill" className="w-full h-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skill.title}</h3>
                  <p className="w-fit text-primary mx-auto xl:mx-0 text-balance leading-relaxed">
                    {skill.description}
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[25px] w-fit">
                    {skill.skill.map((item, index) => {
                      return (
                        <li key={index} className="w-fit h-fit">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-fit h-fit p-10 bg-primary-hover rounded-xl flex justify-center items-center group border-2 border-accent hover:border-primary transition-all duration-300 mx-4">
                                <div className="text-5xl transition-all duration-300 group-hover:scale-150">
                                  <Image
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.icon_slug}/${item.icon_slug}-${item.color}.svg`}
                                    alt={skill.name}
                                    className="grayscale hover:grayscale-0 transition-all"
                                    width={48}
                                    height={48}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="capitalize text-accent font-bold">
                                  {item.name}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent
                value="about"
                className="w-full text-center xl:text-left"
              >
                <div className="flex flex-col gap-[30px]">
                  <h3 className="text-4xl font-bold">{about.title}</h3>
                  <p className="w-full text-primary mx-auto xl:mx-0 text-balance leading-relaxed">
                    {about.description}
                  </p>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 w-fit">
                    {about.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-center xl:justify-start gap-4 w-fit"
                        >
                          <span className="text-accent font-mono text-md">
                            {item.field_name}
                          </span>
                          <span className="text-lg text-primary font-semibold">
                            {item.field_value}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      ) : (
        <Loading desc="404" />
      )}
    </div>
  );
};

export default Summary
