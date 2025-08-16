import { motion } from "framer-motion"

const stairs_animation = {
    initial: {
        top: "0%",
    },
    animate: {
        top: "100%",
    },
    exit: {
        top: ["100%", "0%"],
    },
};

const reverse_index = (index) => {
    const total_steps = 4;
    return total_steps - index - 1;
}

const Stairs = () => {
    return (
        <>
            {/* {[...Array(4)].map((_, index) => {
                return (<motion.div
                    key={index}
                    variants={stairs_animation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: reverse_index(index) * 0.1
                    }} className="h-full w-full bg-white relative"></motion.div>)
            })} */}
            <motion.div
                variants={stairs_animation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }} className="h-full w-full bg-accent relative"></motion.div>
        </>

    )
}

export default Stairs
