'use client'

import dynamic from 'next/dynamic'
import Footer from "../components/common/Footer.jsx"
import Navbar from "../components/common/Navbar.jsx"

// 👇 Dynamic import to avoid SSR errors caused by framer-motion
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  ssr: false,
  loading: () => <p className="text-white text-center mt-10">Loading Hero Section...</p>,
})

const FeaturesSection = dynamic(() => import('@/components/home/FeaturesSection'), {
  ssr: false,
  loading: () => <p className="text-white text-center mt-10">Loading Features...</p>,
})

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
