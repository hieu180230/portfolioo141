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
    const [error, set_error] = useState(null);

    useEffect(() => {
        const fetch_projects = async () => {
        try {
            const response = await axios.get("https://portfolioo-141.shuttle.app/project", {});
            set_projects(response.data);
            set_error(null);
        } catch (err) {
            console.error("Failed to fetch projects:", err);
            set_error("Failed to load projects. The backend might be burning.");
            set_projects([]);
        };

        fetch_projects();
    }
    }, [count]);


    return (
        <section className="container w-screen flex flex-col justify-center mx-auto">
            {projects.length > 0 ?
                (
                    <div className="h-fit w-full flex relative my-10 overflow-visible">
                        <Carousel data={projects} />
                    </div>
                ) :
                (
                    <div>
                        <Loading />
                    </div>
                )}

            <div className="flex flex-col">
                <span className="h-10 py-10 text-center font-bold text-2xl"> Full projects </span>
                <div className="container mx-auto h-full py-10">

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
                                        <div className="text-3xl font-bold text-primary transition-all duration-500">{service.title}</div>
                                        <Link href={service.href} className="min-w-[50px] min-h-[50px] rounded-full bg-accent group-hover:bg-destructive-hover transition-all duration-500 flex justify-center items-center group-hover:-rotate-45 ">
                                            <BsArrowDownRight className="text-primary-hover text-2xl" />
                                        </Link>
                                    </div>
                                    <p className="text-primary font-medium whitespace-pre-wrap text-left">{service.description}</p>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Work;