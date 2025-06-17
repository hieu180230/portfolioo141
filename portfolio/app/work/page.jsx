"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link";
import { motion } from "framer-motion";
import Carousel from "@/components/carousel";
import Loading from "../loading";

const Work = () => {

    const [projects, set_projects] = useState([]);
    const [count, set_count] = useState(0);

    useEffect(() => {
        fetch_projects();
    }, [count]);

    const fetch_projects = async () => {
        try {
            const response = await axios.get("https://portfolioo-141.shuttle.app/project", {});
            set_projects(response.data);
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <section className="w-3/4 m-auto flex flex-col justify-center py-12 xl:py-10">
            {projects.length > 0 ?
                (
                    <div className="h-3/4 py-10 flex">
                        <Carousel data={projects} />
                    </div>
                ) :
                (
                    <div>
                        <Loading />
                    </div>
                )}
            <div className="container mx-auto h-full">

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
                >
                    {projects.map((service, index) => {
                        return (
                            <div key={index} className="flex-1 flex flex-col justify-center gap-6 group bg-primary-hover px-6 py-4 rounded-xl shadow hover:shadow-destructive-hover hover:shadow-lg border-b-4 border-accent hover:border-destructive-foreground hover:scale-110 transition-all mx-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-5xl font-extrabold text-primary transition-all duration-500">{service.title}</div>
                                    <Link href={service.href} className="w-[50px] h-[50px] rounded-full bg-accent group-hover:bg-destructive-hover transition-all duration-500 flex justify-center items-center group-hover:-rotate-45 ">
                                        <BsArrowDownRight className="text-primary-hover text-2xl" />
                                    </Link>
                                </div>
                                <p className="text-primary/80 ">{service.description}</p>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default Work;