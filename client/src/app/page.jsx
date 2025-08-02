import HeroSection from "../components/home/HeroSection.jsx"
import Footer from "../components/common/Footer.jsx"
import Navbar from "../components/common/Navbar.jsx"
import FeaturesSection from "@/components/home/FeaturesSection.jsx"

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
