"use client";

import { FaHtml5, FaCss3, FaJs, FaFigma, FaNodeJs } from 'react-icons/fa'

const about = {
    title: "About me",
    description: "jdfkjshdfsskdhysd",
    info: [
        {
            field_name: "Field 1",
            field_value: "Value 1",
        },
        {
            field_name: "Field 2",
            field_value: "Value 2",
        },
        {
            field_name: "Field 3",
            field_value: "Value 3",
        },
    ]
};

const exp = {
    icon: '/assets/resume/badge.svg',
    title: 'My exp',
    description: "sdjhflksjflsjdfklsf",
    items: [
        {
            company: "A",
            position: "Ap",
            duration: "A1 - A2",
        }
    ]
};

const edu = {
    icon: '/assets/resume/cap.svg',
    title: 'My edu',
    description: "sdjhflksjflsjdfklsf",
    items: [
        {
            institution: "B",
            degree: "Bd",
            duration: "B1 - B2",
        }
    ]
};

const skill = {
    title: 'My skills',
    description: "sdjhflksjflsjdfklsf",
    items: [
        {
            icon: <FaHtml5 />,
            name: "HTML",
        }
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
                            <p className="max-w-[600px] text-accent mx-auto xl:mx-0 text-balance capitalize font-medium">{exp.description}</p>
                            <ScrollArea className="h-[400px]">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                    {exp.items.map((item, index) => {
                                        return (
                                            <li key={index} className="bg-primary-hover border-2 border-primary h-[184px] py-6 px-10 mx-4 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                <span className="text-primary font-medium text-2xl">{item.company}</span>
                                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                    <p className="text-primary">{item.duration}</p>
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
                            <p className="max-w-[600px] text-accent mx-auto xl:mx-0 text-balance capitalize font-medium">{edu.description}</p>
                            <ScrollArea className="h-[400px]">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                    {edu.items.map((item, index) => {
                                        return (
                                            <li key={index} className="bg-primary-hover border-2 border-primary h-[184px] py-6 px-10 mx-4 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                <span className="text-primary font-medium text-2xl">{item.institution}</span>
                                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                    <p className="text-primary">{item.duration}</p>
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
                            <p className="max-w-[600px] text-accent mx-auto xl:mx-0 text-balance capitalize font-medium">{skill.description}</p>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                                {skill.items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="w-full h-[150px] bg-primary-hover rounded-xl flex justify-center items-center group border-2 border-primary mx-4">
                                                        <div className="text-6xl group-hover:text-accent transition-all duration-300">
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
                            <p className="max-w-[600px] text-accent mx-auto xl:mx-0 text-balance capitalize font-medium">{about.description}</p>
                            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px]">
                                {about.info.map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                                            <span className="text-accent">{item.field_name}</span>
                                            <span className="text-xl">{item.field_value}</span>
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