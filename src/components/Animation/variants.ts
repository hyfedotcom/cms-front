import { Variants } from "framer-motion";

export const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // задержка между дочерними
    },
  },
};

export const item: Variants = {
  hidden: { opacity: 1, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
