"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Description } from "@radix-ui/react-dialog";

const info = [
    {
        icon: <FaPhoneAlt />,
        title: "Phone number",
        description: "0000000",
    },
    {
        icon: <FaEnvelope />,
        title: "Email",
        description: "@@@@@@",
    },
    {
        icon: <FaMapMarkerAlt />,
        title: "Address",
        description: "ssdadas",
    },
]

import { motion } from "framer-motion";

const Contact = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 0.4, duration: 0.4, ease: "easeIn" }
            }}
            className="py-6">
                <div className="container mx-auto">
                    <div className="flex flex-col xl:flex-row gap-[30px]">
                        <div className="xl:w-[80%] order-2 xl:order-none">
                            <form className="flex flex-col gap-6 p-10 bg-primary-hover rounded-xl border-2 border-accent">
                                <h3 className="text-4xl text-primary">Contact me</h3>
                                <p className="text-accent">Lorem ipsum</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input type="name" placeholder="Name" />
                                    <Input type="email" placeholder="Email" />
                                    <Input type="phone" placeholder="Phone number" />
                                </div>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select something..."/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select something</SelectLabel>
                                            <SelectItem value="sth1">something 1</SelectItem>
                                            <SelectItem value="sth2">something 2</SelectItem>
                                            <SelectItem value="sth3">something 3</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Textarea className="h-[200px]" placeholder="Type your message" />
                                <Button size="md" className="max-w-40">Send!</Button>
                            </form>
                        </div>
                        <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                            <ul className="felx flex-col gap-10">
                                {info.map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-center gap-6">
                                            <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-background text-primary rounded-md flex items-center justify-center">
                                                <div className="text-[28px] px-2 py-2 rounded-md bg-accent-alt shadow-md shadow-foreground">{item.icon}</div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-primary/60">{item.title}</p>
                                                <h3 className="text-xl">{item.description}</h3>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
        </motion.section>
    );
}

export default Contact;