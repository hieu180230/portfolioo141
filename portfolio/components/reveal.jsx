"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import Image from "next/image";

const Reveal = ({ children }) => {

    const ref = useRef(null);
    const is_in_view = useInView(ref, { once: true });

    const [click, set_click] = useState(false);

    const controller = useAnimation();
    const slide_controller = useAnimation();

    useEffect(() => {
        if (click) {
            controller.start("visible");
            slide_controller.start("visible");
        }
    }, [click, controller, slide_controller]);

    return (
        <div ref={ref} className="relative w-full h-full overflow-hidden">
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 100, y: 0 },
                }}
                initial="hidden"
                animate={controller}
                transition={{ duration: 0.5, delay: 0.25 }}>
                {children}
            </motion.div>
            <motion.div
                variants={{
                    hidden: { right: "50%" },
                    visible: { right: "100%" },
                }}
                onTapStart={() => {set_click(true)}}
                initial="hidden"
                animate={slide_controller}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="absolute top-0 bottom-0 left-0 right-0 background z-20" />
            <motion.div
                variants={{
                    hidden: { left: "50%" },
                    visible: { left: "100%" },
                }}
                onTapStart={() => {set_click(true)}}
                initial="hidden"
                animate={slide_controller}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="absolute top-0 bottom-0 left-0 right-0 background z-20" />
            <motion.div
                variants={{
                    hidden: { opacity: 100 },
                    visible: { opacity: 0 },
                }}
                onTapStart={() => {set_click(true)}}
                initial="hidden"
                animate={slide_controller}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="absolute top-0 bottom-0 left-0 right-0 background z-25">
                    <Image src="assets/image/constellation_emblem.svg" alt="" />
                </motion.div>
        </div>
    )
}

export default Reveal
