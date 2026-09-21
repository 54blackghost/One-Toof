"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Button,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { FiShoppingBag, FiCalendar, FiDollarSign, FiMenu } from "react-icons/fi"
import { useAuth } from "../../context/AuthContext"
import OrdersManagement from "./OrdersManagement"
import ReservationsManagement from "./ReservationsManagement"
import MenuManagement from "./MenuManagement"
import MessagesManagement from "./MessagesManagement"
import axios from "axios"

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isAdmin, user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      navigate("/")
      return
    }
    fetchStats()
  }, [isAdmin])

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/stats`)
      setStats(response.data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Center>
    )
  }

  return (
    <Box bg="warm.50" minH="100vh">
      <Box bg="brand.500" color="white" py={12}>
        <Container maxW="1400px">
          <VStack spacing={4} align="start">
            <Heading as="h1" fontSize="3xl" fontFamily="heading">
              Tableau de bord administrateur
            </Heading>
            <HStack>
              <Button variant="ghost" colorScheme="whiteAlpha" onClick={() => navigate("/")}>
                Retour au site
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1400px" py={8}>
        <Routes>
          <Route
            path="/"
            element={
              <VStack spacing={8} align="stretch">
                {/* Stats Cards */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                  <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Stat>
                      <HStack spacing={4}>
                        <Box p={3} bg="brand.100" borderRadius="lg" color="brand.600">
                          <FiShoppingBag size={24} />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <StatLabel>Commandes totales</StatLabel>
                          <StatNumber>{stats?.total_orders || 0}</StatNumber>
                        </VStack>
                      </HStack>
                    </Stat>
                  </Box>

                  <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Stat>
                      <HStack spacing={4}>
                        <Box p={3} bg="green.100" borderRadius="lg" color="green.600">
                          <FiDollarSign size={24} />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <StatLabel>Revenu total</StatLabel>
                          <StatNumber>{stats?.total_revenue?.toFixed(2) || 0}€</StatNumber>
                        </VStack>
                      </HStack>
                    </Stat>
                  </Box>

                  <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Stat>
                      <HStack spacing={4}>
                        <Box p={3} bg="blue.100" borderRadius="lg" color="blue.600">
                          <FiCalendar size={24} />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <StatLabel>Réservations</StatLabel>
                          <StatNumber>{stats?.total_reservations || 0}</StatNumber>
                        </VStack>
                      </HStack>
                    </Stat>
                  </Box>

                  <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Stat>
                      <HStack spacing={4}>
                        <Box p={3} bg="purple.100" borderRadius="lg" color="purple.600">
                          <FiMenu size={24} />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <StatLabel>Plats au menu</StatLabel>
                          <StatNumber>{stats?.total_menu_items || 0}</StatNumber>
                        </VStack>
                      </HStack>
                    </Stat>
                  </Box>
                </SimpleGrid>

                {/* Management Tabs */}
                <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
                  <Tabs colorScheme="brand" variant="enclosed">
                    <TabList>
                      <Tab>Commandes</Tab>
                      <Tab>Réservations</Tab>
                      <Tab>Menu</Tab>
                      <Tab>Messages</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <OrdersManagement />
                      </TabPanel>
                      <TabPanel>
                        <ReservationsManagement />
                      </TabPanel>
                      <TabPanel>
                        <MenuManagement />
                      </TabPanel>
                      <TabPanel>
                        <MessagesManagement />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </VStack>
            }
          />
        </Routes>
      </Container>
    </Box>
  )
}

export default Dashboard
