"use client"

import { motion } from "framer-motion"
import { FileText, PlusCircle, BarChart, MessageSquare, CheckCircle, UserCheck } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      title: "Create Assignments",
      description: "Instructors can easily create and manage assignments with titles, descriptions, and deadlines.",
      icon: PlusCircle,
      role: "Instructor",
    },
    {
      title: "Submit Assignments",
      description: "Students can submit their work via URL and add notes, tracking their progress effortlessly.",
      icon: FileText,
      role: "Student",
    },
    {
      title: "Review Submissions",
      description: "Instructors can view all student submissions, provide detailed feedback, and update statuses.",
      icon: MessageSquare,
      role: "Instructor",
    },
    {
      title: "Track Status",
      description: "Students can monitor the status of their submitted assignments (Pending, Accepted, Rejected).",
      icon: CheckCircle,
      role: "Student",
    },
    {
      title: "Submission Analytics",
      description: "Instructors gain insights with a dynamic pie chart visualizing submission statuses.",
      icon: BarChart,
      role: "Instructor",
    },
    {
      title: "Role-Based Access",
      description: "Secure access ensures instructors and students have tailored experiences and functionalities.",
      icon: UserCheck,
      role: "Both",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-card relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-primary/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-center mb-16 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Powerful Features for Every Role
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card p-8 rounded-xl shadow-glow-md border border-border backdrop-blur-sm bg-opacity-80 relative overflow-hidden group"
            >
              {/* Dynamic border effect */}
              <div
                className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none z-10"
                style={{
                  background: "linear-gradient(45deg, hsl(var(--primary)/0.5), hsl(var(--accent)/0.5)) border-box",
                  WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div className="relative z-20 flex flex-col items-start h-full">
                <div className="mb-6 p-3 rounded-full bg-primary/20 border border-primary/50 shadow-glow-sm">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-grow">{feature.description}</p>
                <div className="mt-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                      feature.role === "Instructor"
                        ? "bg-blue-600/20 text-blue-400 border border-blue-600"
                        : feature.role === "Student"
                          ? "bg-green-600/20 text-green-400 border border-green-600"
                          : "bg-purple-600/20 text-purple-400 border border-purple-600"
                    }`}
                  >
                    {feature.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
