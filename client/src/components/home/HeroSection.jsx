"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.6)", transition: { duration: 0.2 } },
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#f472b6" />
          <Sphere args={[1, 64, 64]} scale={2.5} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#8a2be2"
              attach="material"
              distort={0.6}
              speed={2.5}
              roughness={0.4}
              metalness={0.1}
            />
          </Sphere>
          <Sphere args={[1, 64, 64]} scale={1.8} position={[-3, 2, -2]}>
            <MeshDistortMaterial
              color="#4b0082"
              attach="material"
              distort={0.4}
              speed={1.8}
              roughness={0.6}
              metalness={0.2}
            />
          </Sphere>
          <Sphere args={[1, 64, 64]} scale={1.2} position={[3, -2, -1]}>
            <MeshDistortMaterial
              color="#9370db"
              attach="material"
              distort={0.8}
              speed={3}
              roughness={0.3}
              metalness={0.05}
            />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
        </Canvas>
      </div>
      <div className="relative z-10 text-center p-8 bg-black bg-opacity-70 rounded-xl shadow-2xl max-w-4xl mx-auto border border-purple-700 backdrop-blur-sm">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Elevate Your Learning Experience
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Seamlessly manage assignments, submit your best work, and track your progress with our intuitive and powerful platform. Designed for students and instructors alike.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 space-y-4 md:space-y-0"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.4 }}
        >
          <Link href="/register">
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-xl font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
              variants={buttonVariants}
              whileHover="hover"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/login">
            <motion.button
              className="px-10 py-5 border-2 border-purple-600 text-purple-300 text-xl font-semibold rounded-full shadow-lg transition-transform transform hover:bg-purple-600 hover:text-white"
              variants={buttonVariants}
              whileHover="hover"
            >
              Login
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
