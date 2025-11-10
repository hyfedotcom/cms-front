"use client";

import Link from "next/link";
import { motion } from "../lib/motion";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-50 text-neutral-50 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[8rem] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-2xl sm:text-3xl font-semibold  text-black"
      >
        Page not found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-gray-600 max-w-[500px]"
      >
        The page you’re looking for doesn’t exist or has been moved.
        Double-check the URL, or head back to the homepage.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex gap-3"
      >
        <Link
          href="/"
          className="rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-3 text-white font-medium shadow-md hover:shadow-lg transition"
        >
          Go Home
        </Link>
      </motion.div>
    </main>
  );
}
