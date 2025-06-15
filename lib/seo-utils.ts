import { projects, experiences, skills } from "../data/portfolio-data";

export function generateProjectStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects",
    description:
      "A collection of web development projects showcasing full-stack development skills",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      url: project.liveUrl || project.githubUrl,
      author: {
        "@type": "Person",
        name: "Shakti Singh Chundawat",
      },
      programmingLanguage: project.technologies,
      dateCreated: "2025",
      genre: "Web Application",
    })),
  };
}

// Generate structured data for work experience
export function generateExperienceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shakti Singh Chundawat",
    jobTitle: "Full Stack Developer",
    worksFor: experiences.map((exp) => ({
      "@type": "Organization",
      name: exp.company,
      employee: {
        "@type": "Person",
        name: "Shakti Singh Chundawat",
        jobTitle: exp.position,
        startDate: exp.duration.split(" - ")[0],
        endDate:
          exp.duration.split(" - ")[1] === "Present"
            ? new Date().getFullYear().toString()
            : exp.duration.split(" - ")[1],
      },
    })),
  };
}

// Generate structured data for skills
export function generateSkillsStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shakti Singh Chundawat",
    knowsAbout: skills.map((skill) => ({
      "@type": "Thing",
      name: skill.name,
      proficiencyLevel: `${skill.level}%`,
    })),
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technologies do you specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I specialize in React, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, and modern web development technologies.",
        },
      },
      {
        "@type": "Question",
        name: "How many years of experience do you have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I have over 4 years of experience in web development, working with both frontend and backend technologies.",
        },
      },
      {
        "@type": "Question",
        name: "What type of projects do you work on?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I work on full-stack web applications, e-commerce platforms, task management systems, and various web-based solutions using modern technologies.",
        },
      },
      {
        "@type": "Question",
        name: "Are you available for freelance work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, I'm open to discussing new opportunities and interesting projects. Feel free to contact me through the contact form.",
        },
      },
    ],
  };
}

// SEO meta tags generator
export function generateSEOTags(page: string) {
  const baseTitle = "Shakti Singh Chundawat - Full Stack Developer";
  const baseDescription =
    "Full Stack Developer passionate about creating amazing web experiences with modern technologies.";

  const seoData = {
    home: {
      title: baseTitle,
      description: baseDescription,
      keywords:
        "Full Stack Developer, React Developer, Next.js, TypeScript, Portfolio",
    },
    about: {
      title: `About | ${baseTitle}`,
      description:
        "Learn more about my journey as a Full Stack Developer, my skills, and passion for web development.",
      keywords:
        "About, Full Stack Developer, Web Developer, Skills, Experience",
    },
    projects: {
      title: `Projects | ${baseTitle}`,
      description:
        "Explore my portfolio of web development projects including e-commerce platforms, web applications, and more.",
      keywords:
        "Projects, Portfolio, Web Development, React Projects, Full Stack Applications",
    },
    contact: {
      title: `Contact | ${baseTitle}`,
      description:
        "Get in touch for collaboration opportunities, freelance work, or just to discuss web development.",
      keywords: "Contact, Hire Developer, Freelance, Web Development Services",
    },
  };

  return seoData[page as keyof typeof seoData] || seoData.home;
}
