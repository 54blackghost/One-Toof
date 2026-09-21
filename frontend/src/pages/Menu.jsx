"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FiPlus } from "react-icons/fi"
import { useCart } from "../context/CartContext"
import axios from "axios"

const MotionBox = motion.create(Box)

const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menu`)
      setMenuItems(response.data)
    } catch (error) {
      console.error("Error fetching menu:", error)
      // Fallback to mock data if API fails
      setMenuItems(mockMenuData)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (item) => {
    addToCart(item)
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    })
  }

  const categories = ["Entrées", "Plats", "Desserts", "Boissons"]

  const getItemsByCategory = (category) => {
    return menuItems.filter((item) => item.category === category)
  }

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Center>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="1400px">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} fontFamily="heading">
              Notre Menu
            </Heading>
            <Text fontSize="xl" maxW="700px">
              Découvrez nos créations culinaires préparées avec des ingrédients frais et de saison
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Menu Items */}
      <Container maxW="1400px" py={16}>
        <Tabs colorScheme="brand" variant="soft-rounded" size="lg">
          <TabList mb={12} flexWrap="wrap" justifyContent="center" gap={2}>
            {categories.map((category) => (
              <Tab key={category} fontWeight="600">
                {category}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {categories.map((category) => (
              <TabPanel key={category}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                  {getItemsByCategory(category).map((item, index) => (
                    <MotionBox
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <VStack
                        bg="white"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
                        transition="all 0.3s"
                        h="full"
                        align="stretch"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          w="full"
                          h="200px"
                          objectFit="cover"
                        />
                        <VStack p={6} align="start" spacing={4} flex="1">
                          <VStack align="start" spacing={2} flex="1" w="full">
                            <HStack justify="space-between" w="full">
                              <Heading size="md">{item.name}</Heading>
                              <Text fontSize="xl" fontWeight="bold" color="brand.500">
                                {item.price}€
                              </Text>
                            </HStack>
                            <Text color="gray.600" fontSize="sm">
                              {item.description}
                            </Text>
                          </VStack>
                          <Button
                            w="full"
                            colorScheme="brand"
                            leftIcon={<FiPlus />}
                            onClick={() => handleAddToCart(item)}
                          >
                            Ajouter au panier
                          </Button>
                        </VStack>
                      </VStack>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}

// Mock data for development
const mockMenuData = [
  {
    id: 1,
    name: "Tartare de Saumon",
    description: "Saumon frais, avocat, citron vert, coriandre",
    price: 18,
    category: "Entrées",
    image: "/salmon-tartare-with-avocado.jpg",
  },
  {
    id: 2,
    name: "Foie Gras Poêlé",
    description: "Foie gras, chutney de figues, pain brioché",
    price: 24,
    category: "Entrées",
    image: "/seared-foie-gras-with-fig-chutney.jpg",
  },
  {
    id: 3,
    name: "Salade César",
    description: "Laitue romaine, poulet grillé, parmesan, croûtons",
    price: 16,
    category: "Entrées",
    image: "/caesar-salad-with-grilled-chicken.jpg",
  },
  {
    id: 4,
    name: "Filet de Bœuf Rossini",
    description: "Filet de bœuf, foie gras poêlé, truffe noire, jus de viande",
    price: 45,
    category: "Plats",
    image: "/beef-rossini-with-foie-gras-and-truffle.jpg",
  },
  {
    id: 5,
    name: "Homard Breton",
    description: "Homard grillé, beurre aux agrumes, légumes de saison",
    price: 52,
    category: "Plats",
    image: "/grilled-lobster-with-citrus-butter.jpg",
  },
  {
    id: 6,
    name: "Risotto aux Truffes",
    description: "Riz carnaroli, truffe noire, parmesan, beurre",
    price: 32,
    category: "Plats",
    image: "/truffle-risotto-with-parmesan.jpg",
  },
  {
    id: 7,
    name: "Tarte Tatin",
    description: "Pommes caramélisées, pâte feuilletée, glace vanille",
    price: 14,
    category: "Desserts",
    image: "/tarte-tatin-with-vanilla-ice-cream.jpg",
  },
  {
    id: 8,
    name: "Fondant au Chocolat",
    description: "Chocolat noir 70%, cœur coulant, glace pistache",
    price: 12,
    category: "Desserts",
    image: "/chocolate-fondant-with-pistachio-ice-cream.jpg",
  },
  {
    id: 9,
    name: "Crème Brûlée",
    description: "Crème vanille, sucre caramélisé, fruits rouges",
    price: 11,
    category: "Desserts",
    image: "/creme-brulee-with-berries.jpg",
  },
  {
    id: 10,
    name: "Champagne Brut",
    description: "Champagne français, notes florales",
    price: 85,
    category: "Boissons",
    image: "/champagne-bottle-and-glass.jpg",
  },
  {
    id: 11,
    name: "Vin Rouge Bordeaux",
    description: "Bordeaux AOC, notes de fruits rouges",
    price: 45,
    category: "Boissons",
    image: "/red-wine-bordeaux-bottle.jpg",
  },
  {
    id: 12,
    name: "Cocktail Signature",
    description: "Gin, citron, basilic, sirop de sureau",
    price: 15,
    category: "Boissons",
    image: "/signature-cocktail-with-gin-and-basil.jpg",
  },
]

export default Menu
