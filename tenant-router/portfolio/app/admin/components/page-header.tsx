"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {actions && (
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  )
}
