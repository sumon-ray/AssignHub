import Navbar from "../../components/common/Navbar.jsx"
import Footer from "../../components/common/Footer.jsx"
import ProtectedRoute from "../../components/common/ProtectedRoute.jsx"

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <Navbar />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
