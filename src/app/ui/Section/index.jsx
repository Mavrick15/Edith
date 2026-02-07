"use client";

import { motion } from "framer-motion";
import Spacing from "../Spacing";

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function Section({
  topMd = "_",
  topLg = "_",
  topXl = "_",
  bottomMd = "_",
  bottomLg = "_",
  bottomXl = "_",
  children,
  ...props
}) {
  return (
    <motion.section
      {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.12, once: true }}
      variants={revealVariants}
    >
      <Spacing md={topMd} lg={topLg} xl={topXl} />
      {children}
      <Spacing md={bottomMd} lg={bottomLg} xl={bottomXl} />
    </motion.section>
  );
}
