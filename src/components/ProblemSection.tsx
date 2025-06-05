"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Code, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProblemCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

function ProblemCard({ icon, title, description, className }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(255,145,0,0.1)] border border-orange-400/20 bg-gradient-to-br from-[#0A1A3A]/90 to-[#1A1B51]/90 backdrop-blur-xl p-1.5 h-full",
        "hover:shadow-[0_25px_50px_-12px_rgba(255,145,0,0.2)] transition-shadow duration-300",
        className
      )}
    >
      <div className="relative bg-gradient-to-br from-[#0A1A3A] to-[#1A1B51] p-1 rounded-xl overflow-hidden h-full">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 h-14 w-14 mb-6">
            {React.cloneElement(icon as React.ReactElement, {
              className: "h-6 w-6 text-orange-400"
            })}
          </div>
          <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-gray-300 flex-grow">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

interface ProblemSectionProps {
  className?: string
}

export function ProblemSection({ className }: ProblemSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const problems = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      title: "Complexidade Desnecessária",
      description:
        "Muitos desenvolvedores perdem tempo com configurações complexas e ferramentas que não agregam valor real ao produto final."
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      title: "Performance Negligenciada",
      description:
        "Aplicações web modernas frequentemente sacrificam performance por conveniência, resultando em experiências lentas para os usuários."
    },
    {
      icon: <Code className="h-6 w-6 text-orange-500" />,
      title: "Código Difícil de Manter",
      description:
        "Arquiteturas mal planejadas levam a código frágil e difícil de manter, aumentando o custo de desenvolvimento a longo prazo."
    }
  ]

  return (
    <section
      id="problema"
      ref={sectionRef}
      className={cn(
        "w-full py-24 relative overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51]",
        className
      )}
    >
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-800/10 to-transparent rounded-full mix-blend-screen blur-3xl"></div>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">Problemas que </span>
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 bg-clip-text text-transparent">Resolvemos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-[800px] leading-relaxed">
            Identificamos os principais desafios que desenvolvedores enfrentam hoje e criamos soluções eficientes para superá-los.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ProblemSectionExample() {
  return <ProblemSection />
}
