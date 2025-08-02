"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const iconVariants = {
    hover: { scale: 1.2, color: "hsl(270 100% 80%)" },
  };

  return (
    <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-black text-gray-400 p-8 text-center mt-auto shadow-inner border-t border-purple-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-left md:text-center">
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-3 drop-shadow-md">
            AssignHub
          </h3>
          <p className="text-base leading-relaxed text-gray-300">
            Your ultimate platform for seamless assignment management and
            submission. Empowering students and instructors.
          </p>
        </div>

        <div className="text-left md:text-center">
          <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-base">
            <li>
              <Link
                href="/dashboard/assignments"
                className="hover:text-purple-200 transition-colors"
              >
                Assignments
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/submissions"
                className="hover:text-purple-200 transition-colors"
              >
                Submissions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/analytics"
                className="hover:text-purple-200 transition-colors"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-purple-200 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-left md:text-right">
          <h4 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-3">
            Connect With Us
          </h4>
          <div className="flex justify-start md:justify-end space-x-5">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Twitter size={28} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Linkedin size={28} />
            </motion.a>
          </div>
          <p className="text-base mt-4 flex items-center justify-start md:justify-end gap-2">
            <Mail className="h-5 w-5 " />
            Email:{" "}
            <a
              href="mailto:info@assignmentportal.com"
              className="hover:underline bg-clip-text bg-gradient-to-r from-blue-400 text-transparent to-purple-600"
            >
              assignHub@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-purple-800 mt-8 pt-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Assignment Portal. All rights
        reserved.
      </div>
    </footer>
  );
}
