"use client";

import { motion } from "framer-motion";

const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

export default function AnimateReveal({
  children,
  variants = defaultVariants,
  amount = 0.15,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}
