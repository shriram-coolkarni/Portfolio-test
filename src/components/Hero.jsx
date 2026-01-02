import React from "react";
import profilePic from "../assets/123.jpg";
import { HERO_CONTENT } from "../constants";
import {motion} from "framer-motion"


const containerVariants={
  hidden:{opacity:0,x:-100},
  visible:{
    opacity:1,
    x:0,
    transition:{
      duration:0.5,
      staggerChildren:0.5,
    }
  }
}

const childVariants={
  hidden:{opacity:0,x:-100},
  visible:{opacity:1,x:0,transition:{duration:0.5}}
}

const Hero = () => {
  return (
    <div className="pb-4 lg:mb-36">
      <div className="flex flex-wrap lg:flex-nowrap lg:flex-row-reverse">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:p-8">
            <motion.img
              src={profilePic}
              alt="Shriram Shivaji Kulkarni"
              className="border border-stone-900 rounded-3xl w-full max-w-xs md:max-w-sm lg:max-w-md"
              width={650}
              height={650}
              initial={{x:100,opacity:0}}
              animate={{x:0,opacity:1}}
              transition={{duration:1,delay:1.5}}
            />
          </div>
        </div>
        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center lg:items-start mt-10 lg:mt-20 px-4 lg:px-8">
            <motion.h2 
              variants={childVariants}
              className="pb-2 text-3xl md:text-5xl lg:text-8xl tracking-tighter text-center lg:text-left">
              Shriram Shivaji Kulkarni
            </motion.h2>
            <motion.span 
              variants={childVariants}
              className="bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text text-2xl md:text-3xl lg:text-4xl tracking-tight text-transparent text-center lg:text-left">
              System Engineer/Devops and Automation Senior
            </motion.span>

            <motion.p 
              variants={childVariants}
              className="my-4 max-w-lg py-4 text-base md:text-lg lg:text-xl leading-relaxed tracking-tighter text-center lg:text-left">
              {HERO_CONTENT}
            </motion.p>
            <motion.a
              variants={childVariants}
              href="/Pratik_Ludarkar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-white rounded-full p-3 md:p-4 text-sm md:text-base lg:text-lg text-stone-800 mb-10"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
