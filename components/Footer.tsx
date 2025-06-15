"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type SocialLink = {
  href: string;
  name: string;
};

const QUICK_LINKS = ["Home", "About", "Experience", "Projects", "Contact"];

const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://github.com/Shakti-7093", name: "GitHub" },
  {
    href: "https://www.linkedin.com/in/shakti-singh-chundawat-63409a304/",
    name: "Linkedin",
  },
  { href: "mailto:shaktisinghchundawat7093@gmail.com", name: "Mail" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const FooterSection = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
      <motion.h3
        className="text-xl font-bold mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      {children}
    </motion.div>
  )
);

FooterSection.displayName = "FooterSection";

const QuickLink = memo(
  ({
    link,
    index,
    isInView,
  }: {
    link: string;
    index: number;
    isInView: boolean;
  }) => (
    <motion.li>
      <motion.a
        href={`#${link.toLowerCase()}`}
        className="text-gray-400 hover:text-white transition-colors"
        whileHover={{ x: 5 }}
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.2, delay: index * 0.1 + 0.5 }}
      >
        {link}
      </motion.a>
    </motion.li>
  )
);

QuickLink.displayName = "QuickLink";

const SocialLink = memo(
  ({
    social,
    index,
    isInView,
  }: {
    social: SocialLink;
    index: number;
    isInView: boolean;
  }) => (
    <motion.li>
      <motion.a
        href={social.href}
        className="text-gray-400 hover:text-white transition-colors"
        whileHover={{ x: 5, scale: 1.05 }}
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.2, delay: index * 0.1 + 0.7 }}
      >
        {social.name}
      </motion.a>
    </motion.li>
  )
);

SocialLink.displayName = "SocialLink";

function Footer() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.footer
      className="bg-gray-900 dark:bg-gray-950 text-white py-12"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <FooterSection title="Shakti Singh Chundawat">
            <p className="text-gray-400 leading-relaxed">
              Full Stack Developer passionate about creating amazing web
              experiences with modern technologies.
            </p>
          </FooterSection>

          <FooterSection title="Quick Links">
            <ul className="space-y-2">
              {QUICK_LINKS.map((link, index) => (
                <QuickLink
                  key={link}
                  link={link}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Connect">
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink
                  key={social.name}
                  social={social}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </ul>
          </FooterSection>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          variants={itemVariants}
        >
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            © {new Date().getFullYear()} Shakti Singh Chundawat. All rights
            reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default memo(Footer);
