"use client";

import { motion } from "framer-motion";
import { Code, Bug, MessageSquare, Users, Cpu, Zap } from "lucide-react";

const iconVariants = {
  idle: {
    scale: 1,
    rotate: 0,
    y: 0,
  },
  hover: {
    scale: 1.2,
    rotate: 15,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function InteractiveIcons() {
  const icons = [
    { Icon: Code, label: "Code", color: "text-blue-400" },
    { Icon: Bug, label: "Debug", color: "text-red-400" },
    { Icon: MessageSquare, label: "Discuss", color: "text-green-400" },
    { Icon: Users, label: "Collaborate", color: "text-purple-400" },
    { Icon: Cpu, label: "Compute", color: "text-yellow-400" },
    { Icon: Zap, label: "Performance", color: "text-orange-400" },
  ];

  return (
    <>
      {/* Desktop Layout - Vertical Stack */}
      <motion.div
        className="hidden lg:flex flex-col space-y-6 absolute left-8 xl:left-12 top-1/2 transform -translate-y-1/2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {icons.map(({ Icon, label, color }, index) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover="hover"
            initial="idle"
            className="relative group"
          >
            <motion.div
              variants={iconVariants}
              className={`w-12 h-12 bg-gray-800/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl flex items-center justify-center cursor-pointer border border-gray-600/50 shadow-lg ${color}`}
              aria-label={label}
            >
              <Icon size={24} />
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tablet Layout - Horizontal Row */}
      <motion.div
        className="hidden md:flex lg:hidden justify-start space-x-4 absolute top-20 left-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {icons.slice(0, 4).map(({ Icon, label, color }, index) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover="hover"
            initial="idle"
            className="relative group"
          >
            <motion.div
              variants={iconVariants}
              className={`w-10 h-10 bg-gray-800/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer border border-gray-600/50 shadow-lg ${color}`}
              aria-label={label}
            >
              <Icon size={20} />
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
