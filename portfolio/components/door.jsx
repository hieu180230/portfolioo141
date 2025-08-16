"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const Door = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    console.log("Click");
    setOpen(true);
    setTimeout(() => setHidden(true), 700);
  };

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-primary">
      <motion.div
        className="w-1/2 h-full bg-primary"
        animate={open ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <motion.div
        className="w-1/2 h-full bg-primary"
        animate={open ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <button
        onClick={handleClick}
        className="absolute left-1/2 top-1/2 z-60 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent text-primary-foreground flex items-center justify-center"
      >
        Enter
      </button>
    </div>
  );
};

export default Door;