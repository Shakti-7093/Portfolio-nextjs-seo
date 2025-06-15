export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
}

export interface Skill {
  id: string
  name: string
  level: number
  category: "frontend" | "backend" | "tools" | "other"
}
