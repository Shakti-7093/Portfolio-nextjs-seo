"use client"

import { skills } from "../data/portfolio-data"
import { motion } from "framer-motion"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function Skills() {
  const { ref, isInView } = useScrollAnimation()

  const skillCategories = {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    tools: skills.filter((skill) => skill.category === "tools"),
    other: skills.filter((skill) => skill.category === "other"),
  }

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Tools & DevOps",
    other: "Other",
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.5 },
    }),
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
          <motion.div
            className="w-20 h-1 bg-blue-600 mx-auto mb-4"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            Here are the technologies and tools I work with to bring ideas to life.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ delay: categoryIndex * 0.2 + 0.3 }}
              >
                {categoryTitles[category as keyof typeof categoryTitles]}
              </motion.h3>

              <div className="space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div key={skill.name} variants={skillVariants} custom={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <motion.span
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 }}
                      >
                        {skill.name}
                      </motion.span>
                      <motion.span
                        className="text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.6 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 h-2 rounded-full"
                        variants={progressVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={skill.level}
                        whileHover={{
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                          transition: { duration: 0.2 },
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
