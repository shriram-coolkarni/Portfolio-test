import React from 'react';

// Frontend / Languages
import { DiHtml5, DiCss3, DiJava } from 'react-icons/di';
import { SiJavascript, SiPython } from 'react-icons/si';

// Backend / DevOps
import { FaNodeJs, FaBootstrap, FaGithub, FaDocker, FaLinux } from 'react-icons/fa6';
import {
  SiMongodb,
  SiTailwindcss,
  SiSpringboot,
  SiPostman,
  SiMysql,
  SiGit,
  SiKubernetes,
  SiJenkins
} from 'react-icons/si';

import { RiReactjsLine } from 'react-icons/ri';
import { TbBrandNextjs, TbBrandVite } from 'react-icons/tb';
import { motion } from 'framer-motion';

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  return (
    <div className="pb-24">

      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-8">

        {/* HTML */}
        <motion.div variants={iconVariants(3)} initial="initial" animate="animate">
          <DiHtml5 className="text-7xl text-orange-600" />
        </motion.div>

        {/* CSS */}
        <motion.div variants={iconVariants(4)} initial="initial" animate="animate">
          <DiCss3 className="text-7xl text-blue-600" />
        </motion.div>

        {/* JavaScript */}
        <motion.div variants={iconVariants(5)} initial="initial" animate="animate">
          <SiJavascript className="text-7xl text-yellow-400" />
        </motion.div>

        {/* Python */}
        <motion.div variants={iconVariants(3)} initial="initial" animate="animate">
          <SiPython className="text-7xl text-blue-500" />
        </motion.div>

        {/* React */}
        <motion.div variants={iconVariants(4)} initial="initial" animate="animate">
          <RiReactjsLine className="text-7xl text-cyan-400" />
        </motion.div>

        {/* Node */}
        <motion.div variants={iconVariants(5)} initial="initial" animate="animate">
          <FaNodeJs className="text-7xl text-green-600" />
        </motion.div>

        {/* Git */}
        <motion.div variants={iconVariants(3)} initial="initial" animate="animate">
          <SiGit className="text-7xl text-orange-600" />
        </motion.div>

        {/* GitHub */}
        <motion.div variants={iconVariants(4)} initial="initial" animate="animate">
          <FaGithub className="text-7xl text-gray-800" />
        </motion.div>

        {/* Docker */}
        <motion.div variants={iconVariants(5)} initial="initial" animate="animate">
          <FaDocker className="text-7xl text-blue-500" />
        </motion.div>

        {/* Kubernetes */}
        <motion.div variants={iconVariants(3)} initial="initial" animate="animate">
          <SiKubernetes className="text-7xl text-blue-600" />
        </motion.div>

        {/* Jenkins */}
        <motion.div variants={iconVariants(4)} initial="initial" animate="animate">
          <SiJenkins className="text-7xl text-red-600" />
        </motion.div>

        {/* Linux */}
        <motion.div variants={iconVariants(5)} initial="initial" animate="animate">
          <FaLinux className="text-7xl text-black" />
        </motion.div>

      </div>
    </div>
  );
};

export default Technologies;
