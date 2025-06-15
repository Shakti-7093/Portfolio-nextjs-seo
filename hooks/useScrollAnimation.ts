"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    threshold,
    once: true,
    margin: "-100px 0px",
  })

  return { ref, isInView }
}
