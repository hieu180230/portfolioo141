"use client";

import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link";
import { motion } from "framer-motion";

const works = [
    {
        num: "01",
        title: "A",
        description: "lorem ispum 1",
        href: "",
    },
    {
        num: "02",
        title: "B",
        description: "lorem ispum 2",
        href: "",
    },
    {
        num: "03",
        title: "C",
        description: "lorem ispum 3",
        href: "",
    },
]

const Work = () => {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 ">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
                >
                    {works.map((service, index) => {
                        return (
                            <div key={index} className="flex-1 flex flex-col justify-center gap-6 group bg-primary-hover px-6 py-4 rounded-xl shadow hover:drop-shadow-accent-alt hover:shadow-lg border-b-4 hover:border-accent transition-all mx-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-5xl font-extrabold text-accent transition-all duration-500">{service.num}</div>
                                    <Link href={service.href} className="w-[50px] h-[50px] rounded-full bg-accent group-hover:bg-destructive transition-all duration-500 flex justify-center items-center group-hover:-rotate-45 ">
                                        <BsArrowDownRight className="text-primary-hover text-2xl"/>
                                    </Link>
                                </div>
                                <h2 className="text-[42px] font-bold leading-none text-primary transition-all duration-500 ">{service.title}</h2>
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