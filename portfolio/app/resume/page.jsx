"use client";

import { FaHtml5, FaCss3, FaJs, FaFigma, FaNodeJs, FaAws  } from 'react-icons/fa'
import { SiKubernetes, SiDocker, SiRust, SiCplusplus, SiLinux } from 'react-icons/si'
import { VscAzure } from "react-icons/vsc";

const about = {
    title: "About me",
    description: "Software Engineering student specializing in Cybersecurity and DevOps. I bridge the gap between scalable microservices architecture and a strict security-first mindset.",
    info: [
        { field_name: "Name", field_value: "Nguyen Nhat Hieu" },
        { field_name: "Role", field_value: "DevSecOps / Cloud Engineer" },
        // { field_name: "Experience", field_value: "6 months (Projects)" },
        { field_name: "Email", field_value: "hieu180230@gmail.com" },
        // { field_name: "Freelance", field_value: "Available" },
        { field_name: "Languages", field_value: "English, Vietnamese" },
    ]
};

const exp = {
    icon: '/assets/resume/badge.svg',
    title: 'Core Experience',
    description: "Hands-on experience architecting cloud-native solutions, focusing on Identity and Access Management (IAM), container orchestration, and high-performance backend systems.",
    items: [
        {
            company: "Personal Portfolio",
            position: "DevSecOps Engineer",
            duration: "2026",
        },
        {
            company: "AWS / Azure Infrastructure",
            position: "Cloud Architect",
            duration: "2025 - 2026",
        },
        {
            company: "Salesforce LWC",
            position: "Developer",
            duration: "2026",
        }
    ]
};

const edu = {
    icon: '/assets/resume/cap.svg',
    title: 'My Education',
    description: "Building a strong academic foundation in Computer Science, with an upcoming focus on Electronic Engineering and Computer Science (EECS) at the Master's level.",
    items: [
        {
            institution: "University of Science, VNU-HCM",
            degree: "BSc. Software Engineering",
            duration: "2022 - Present",
        },
        // {
        //     institution: "Future Goal",
        //     degree: "MSc. EECS",
        //     duration: "Upcoming",
        // }
    ]
};

const skill = {
    title: 'Technical Arsenal',
    description: "My weapon of choice for building resilient infrastructure and blazingly fast backend services.",
    items: [
        { icon: <SiKubernetes />, name: "Kubernetes / GitOps" },
        { icon: <SiDocker />, name: "Docker" },
        { icon: <SiRust />, name: "Rust" },
        { icon: <SiCplusplus />, name: "C++" },
        { icon: <FaAws  />, name: "AWS (IAM/EC2)" },
        { icon: <VscAzure  />, name: "Azure" },
        { icon: <SiLinux />, name: "Linux / Shell" },
    ]
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

const Resume = () => {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.4, ease: "easeIn" }
        }}
        className="min-h-[80vh] flex items-center justify-center -py-12 xl:py-0">
        <div className="container mx-auto">
            <Tabs defaultValue="exp" className="flex flex-col xl:flex-row gap-[60px]">
                <TabsList className="flex xl:flex-col flex-row w-full max-w-[300px] mx-auto xl:mx-0 gap-6">
                    <TabsTrigger value="exp">Experience</TabsTrigger>
                    <TabsTrigger value="edu">Education</TabsTrigger>
                    <TabsTrigger value="skill">Skills</TabsTrigger>
                    <TabsTrigger value="about">About me</TabsTrigger>
                </TabsList>

                <div className="min-h-[70vh] w-full">
                    <TabsContent value="exp" className="w-full">
                        <div className="flex flex-col gap-[30px] text-center xl:text-left">
                            <h3 className="text-4xl font-bold">{exp.title}</h3>
                            <p className="max-w-[600px] text-primary mx-auto xl:mx-0 text-balance leading-relaxed">{exp.description}</p>
                            <ScrollArea className="h-[400px]">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] pr-4">
                                    {exp.items.map((item, index) => {
                                        return (
                                            <li key={index} className="bg-primary-hover border border-accent/20 h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 hover:border-accent hover:shadow-lg transition-all">
                                                <span className="text-accent font-medium text-lg">{item.duration}</span>
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
                            <p className="max-w-[600px] text-primary mx-auto xl:mx-0 text-balance leading-relaxed">{edu.description}</p>
                            <ScrollArea className="h-[400px]">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] pr-4">
                                    {edu.items.map((item, index) => {
                                        return (
                                            <li key={index} className="bg-primary-hover border border-accent/20 h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 hover:border-accent hover:shadow-lg transition-all">
                                                <span className="text-accent font-medium text-lg">{item.duration}</span>
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
                            <p className="max-w-[600px] text-primary mx-auto xl:mx-0 text-balance leading-relaxed">{skill.description}</p>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[25px] w-fit">
                                {skill.items.map((item, index) => {
                                    return (
                                        <li key={index} className="w-fit h-fit">
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="w-fit h-fit p-15 bg-primary-hover rounded-xl flex justify-center items-center group border-2 border-accent hover:border-primary transition-all duration-300 mx-4">
                                                        <div className="text-5xl transition-all duration-300 group-hover:scale-150">
                                                            {item.icon}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="capitalize text-accent font-bold">{item.name}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </TabsContent>
                    <TabsContent value="about" className="w-full text-center xl:text-left">
                        <div className="flex flex-col gap-[30px]">
                            <h3 className="text-4xl font-bold">{about.title}</h3>
                            <p className="max-w-[600px] text-primary mx-auto xl:mx-0 text-balance leading-relaxed">{about.description}</p>
                            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 w-fit">
                                {about.info.map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-center justify-center xl:justify-start gap-4 w-fit">
                                            <span className="text-accent font-mono text-md">{item.field_name}</span>
                                            <span className="text-lg text-primary font-semibold">{item.field_value}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    </motion.div>;
}

export default Resume;