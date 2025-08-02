import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Plane, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 },
    },
  };

  // Animation variants for call-to-action buttons
  const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, delay: 1.8, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 15px 40px rgba(0, 191, 255, 0.6)", // Cyan glow
      transition: { duration: 0.4, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white font-inter">
      {/* 3D Background with Three.js - Abstract Flowing Plane */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 70 }} shadows dpr={[1, 2]}>
          <ambientLight intensity={0.2} /> {/* Subtle ambient light */}
          <pointLight position={[20, 20, 20]} intensity={2.5} color="#00FFFF" castShadow /> {/* Bright Cyan light */}
          <pointLight position={[-20, -20, -20]} intensity={2} color="#8A2BE2" castShadow /> {/* Blue-Violet light */}
          <pointLight position={[0, 0, 30]} intensity={1.5} color="#39FF14" castShadow /> {/* Neon Green light from front */}
          <pointLight position={[-10, 10, -10]} intensity={1.8} color="#FFD700" /> {/* Gold light for warmth */}

          {/* Large, subtly distorted plane for an abstract, flowing effect */}
          <Plane args={[100, 100, 128, 128]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <MeshDistortMaterial
              color="#1a202c" // Dark background color for the plane
              attach="material"
              distort={0.8} // Moderate distortion for a wave-like effect
              speed={1.5} // Moderate speed
              roughness={0.05} // Very smooth, reflective surface
              metalness={0.9} // High metalness for a liquid/metallic sheen
            />
          </Plane>

          {/* A few smaller, highly reflective spheres for accent */}
          <Sphere args={[1, 32, 32]} scale={0.8} position={[5, 3, -2]}>
            <MeshDistortMaterial color="#00BFFF" distort={0.5} speed={2} roughness={0.1} metalness={0.9} />
          </Sphere>
          <Sphere args={[1, 32, 32]} scale={0.6} position={[-6, -2, 1]}>
            <MeshDistortMaterial color="#FF69B4" distort={0.7} speed={2.5} roughness={0.05} metalness={0.8} />
          </Sphere>

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} /> {/* Slower, more subtle auto-rotation */}
        </Canvas>
      </div>

      {/* Content Overlay - Left-aligned and structured with Glassmorphism */}
      <div className="relative z-10 text-left p-8 md:p-16 ml-8 md:ml-20  bg-opacity-20 rounded-2xl shadow-3xl max-w-2xl border border-white border-opacity-30 backdrop-blur-2xl">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-green-400 drop-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Innovate Your Learning Ecosystem
        </motion.h1>
        <motion.p
          className="text-md md:text-xl text-gray-100 mb-10 max-w-xl leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.6 }}
        >
          Transforming academic interaction with a cutting-edge platform. Seamlessly manage assignments, deliver precise feedback, and track progress, fostering a dynamic environment for growth.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-5">
          <motion.a
            href="#student-dashboard" // Placeholder for actual student route
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white font-bold rounded-lg shadow-xl transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Start as a Student
          </motion.a>
          <motion.a
            href="#instructor-dashboard" // Placeholder for actual instructor route
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800 text-white font-bold rounded-lg shadow-xl transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-70"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 1.9 }}
          >
            Empower as an Instructor
          </motion.a>
        </div>
      </div>
    </section>
  );
}
