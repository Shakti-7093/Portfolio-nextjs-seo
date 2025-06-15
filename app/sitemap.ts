import type { MetadataRoute } from "next"
import { projects } from "../data/portfolio-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.shaktisinghchundawat.online"
  const currentDate = new Date()

  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ]

  const projectRoutes = projects
    .filter((project) => project.liveUrl)
    .map((project) => ({
      url: project.liveUrl!,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  const githubRoutes = projects
    .filter((project) => project.githubUrl)
    .map((project) => ({
      url: project.githubUrl!,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

  return [...routes, ...projectRoutes, ...githubRoutes]
}
