"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: -50, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const skillBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-blue-600 mx-auto"
            variants={itemVariants}
            whileInView={{ scaleX: [0, 1] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={imageVariants} whileHover={{ scale: 1.02, rotate: 1 }} transition={{ duration: 0.3 }}>
            <img src="/placeholder.svg?height=400&width=400" alt="About me" className="rounded-lg shadow-lg w-full" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6" variants={itemVariants}>
              Passionate Developer & Problem Solver
            </motion.h3>

            <motion.p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" variants={itemVariants}>
              With over 4 years of experience in web development, I specialize in creating robust, scalable applications
              using modern technologies. I'm passionate about writing clean, efficient code and staying up-to-date with
              the latest industry trends.
            </motion.p>

            <motion.p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" variants={itemVariants}>
              My journey in tech started with a curiosity about how websites work, and it has evolved into a career
              where I get to solve complex problems and build solutions that make a real impact on users' lives.
            </motion.p>

            <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
              {[
                { title: "Frontend", skills: "React, TypeScript, Next.js, Tailwind CSS" },
                { title: "Backend", skills: "Node.js, Express, PostgreSQL, MongoDB" },
                { title: "Tools", skills: "Git, Docker, AWS, Figma" },
                { title: "Interests", skills: "AI/ML, Open Source, Photography" },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={skillBoxVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{category.skills}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
