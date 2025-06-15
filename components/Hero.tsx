"use client"

import { ArrowDown, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const title = "Hi, I'm Your Name"
  const words = title.split(" ")

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center w-full">
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.img
              src="/placeholder.svg?height=200&width=200"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-800 shadow-lg"
              variants={imageVariants}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 px-4"
            variants={titleVariants}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 sm:mr-4">
                {word === "Your" || word === "Name" ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span key={letterIndex} variants={letterVariants} className="inline-block">
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ) : (
                  word.split("").map((letter, letterIndex) => (
                    <motion.span key={letterIndex} variants={letterVariants} className="inline-block">
                      {letter}
                    </motion.span>
                  ))
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto px-4 leading-relaxed"
            variants={itemVariants}
          >
            Full Stack Developer passionate about creating amazing web experiences with modern technologies and clean,
            efficient code.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Get In Touch
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto flex items-center gap-2 border-gray-300 dark:border-gray-700 dark:text-gray-300"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Download size={20} />
                </motion.div>
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="animate-bounce" variants={bounceVariants} animate="animate">
            <motion.a href="#about" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <ArrowDown size={24} className="text-gray-400 dark:text-gray-500" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
