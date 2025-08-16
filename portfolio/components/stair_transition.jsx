"use client";

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

import Stairs from "./stairs";
import Door from "./door";

const StairTransition = () => {
    const path_name = usePathname();
    return (
        <>
            <AnimatePresence mode="wait" className="h-screen w-screen absolute">
                <div key={path_name}>
                    {/* <motion.div
                        className="h-screen w-screen fixed bg-transition-bg top-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.4,
                                easy: "easeInOut"
                            }
                        }}
                    /> */}
                    <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex">
                        <Door />
                    </div>

                </div>
            </AnimatePresence>
        </>
    )
}

export default StairTransition