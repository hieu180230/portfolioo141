"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4, duration: 0.4, ease: "easeIn" }
        }}
        className="relative flex justify-center items-center">
        {/*Image motion*/}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.4, ease: "easeInOut" }
          }}
          className="flex relative h-[60px] w-[60px] justify-center items-center  ">
          <Image src="/assets/image/main.jpg" priority quality={100} fill alt="" className="object-cover object-bottom rounded-full" />
        </motion.div>

        {/* Frame circle
        <motion.svg className="w-[120px] h-[120px] relative" fill="transparent" viewBox="-70 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <motion.circle cx="-30" cy="60" r="35" stroke="#ff5ea0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ strokeDasharray: "24 10 0 0" }} animate={{ strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"], rotate: [120, 360], }} transition={{ duration: 10, repeat: Infinity}} />
        </motion.svg> */}
      </motion.div>
    </div>
  );
};

export default Photo;
