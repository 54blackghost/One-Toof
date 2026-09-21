import { Routes, Route } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Reservation from "./pages/Reservation"
import Order from "./pages/Order"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminDashboard from "./pages/admin/Dashboard"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/order" element={<Order />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

