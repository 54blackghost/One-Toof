"use client"

import { Box, Container, Heading, Text, Button, Flex, SimpleGrid, Image, VStack, HStack, Icon } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FiCalendar, FiShoppingBag, FiStar, FiClock } from "react-icons/fi"

const MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box position="relative" h={{ base: "70vh", md: "85vh" }} overflow="hidden" bg="dark.900">
        <Image
          src="/luxury-rooftop-restaurant-terrace-at-sunset-with-c.jpg"
          alt="One Rooftop Restaurant"
          w="full"
          h="full"
          objectFit="cover"
          opacity="0.6"
        />
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          align="center"
          justify="center"
          direction="column"
          color="white"
          textAlign="center"
          px={4}
        >
          <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontFamily="heading"
              mb={6}
              letterSpacing="tight"
              textShadow="2px 2px 4px rgba(0,0,0,0.3)"
            >
              One Rooftop
            </Heading>
            <Text fontSize={{ base: "lg", md: "2xl" }} mb={8} maxW="600px" mx="auto" fontWeight="300">
              Une expérience culinaire unique avec vue panoramique sur la ville
            </Text>
            <HStack spacing={4} justify="center" flexWrap="wrap">
              <Link to="/reservation">
                <Button
                  size="lg"
                  colorScheme="brand"
                  leftIcon={<FiCalendar />}
                  _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                  transition="all 0.3s"
                >
                  Réserver une table
                </Button>
              </Link>
              <Link to="/menu">
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  borderColor="white"
                  color="white"
                  leftIcon={<FiShoppingBag />}
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  Voir le menu
                </Button>
              </Link>
            </HStack>
          </MotionBox>
        </Flex>
      </Box>

      {/* Features Section */}
      <Container maxW="1400px" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {[
            {
              icon: FiStar,
              title: "Cuisine Raffinée",
              description: "Des plats créatifs préparés par nos chefs étoilés",
            },
            {
              icon: FiClock,
              title: "Service Premium",
              description: "Une équipe dévouée à votre service",
            },
            {
              icon: FiCalendar,
              title: "Réservation Facile",
              description: "Réservez votre table en quelques clics",
            },
            {
              icon: FiShoppingBag,
              title: "Commande en Ligne",
              description: "Commandez et faites-vous livrer",
            },
          ].map((feature, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <VStack
                p={6}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                spacing={4}
                h="full"
                _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
                transition="all 0.3s"
              >
                <Icon as={feature.icon} boxSize={12} color="brand.500" />
                <Heading size="md" textAlign="center">
                  {feature.title}
                </Heading>
                <Text textAlign="center" color="gray.600">
                  {feature.description}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>

      {/* About Section */}
      <Box bg="warm.100" py={20}>
        <Container maxW="1400px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image src="/elegant-restaurant-interior.png" alt="Restaurant Interior" borderRadius="lg" boxShadow="2xl" />
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <VStack align="start" spacing={6}>
                <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontFamily="heading" color="brand.600">
                  Bienvenue chez One Rooftop
                </Heading>
                <Text fontSize="lg" color="gray.700" lineHeight="tall">
                  Perché au sommet de la ville, One Rooftop vous offre une expérience gastronomique inoubliable. Notre
                  chef étoilé crée des plats innovants qui marient tradition et modernité, dans un cadre élégant avec
                  une vue à couper le souffle.
                </Text>
                <Text fontSize="lg" color="gray.700" lineHeight="tall">
                  Que ce soit pour un dîner romantique, un événement d'entreprise ou une célébration spéciale, notre
                  équipe s'engage à rendre chaque moment mémorable.
                </Text>
                <Link to="/contact">
                  <Button size="lg" colorScheme="brand">
                    En savoir plus
                  </Button>
                </Link>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Menu Preview */}
      <Container maxW="1400px" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontFamily="heading" color="brand.600">
              Nos Spécialités
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              Découvrez une sélection de nos plats signature
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {[
              {
                name: "Filet de Bœuf Rossini",
                description: "Filet de bœuf, foie gras poêlé, truffe noire",
                price: "45€",
                image: "/gourmet-beef-filet-with-foie-gras.jpg",
              },
              {
                name: "Homard Breton",
                description: "Homard grillé, beurre aux agrumes, légumes de saison",
                price: "52€",
                image: "/grilled-lobster-with-citrus-butter.jpg",
              },
              {
                name: "Tarte Tatin Revisitée",
                description: "Pommes caramélisées, glace vanille bourbon",
                price: "14€",
                image: "/elegant-tarte-tatin-dessert.jpg",
              },
            ].map((dish, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <VStack
                  bg="white"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="lg"
                  _hover={{ boxShadow: "2xl", transform: "translateY(-4px)" }}
                  transition="all 0.3s"
                  h="full"
                >
                  <Image src={dish.image || "/placeholder.svg"} alt={dish.name} w="full" h="250px" objectFit="cover" />
                  <VStack p={6} align="start" spacing={3} w="full">
                    <Flex justify="space-between" w="full" align="start">
                      <Heading size="md">{dish.name}</Heading>
                      <Text fontSize="xl" fontWeight="bold" color="brand.500">
                        {dish.price}
                      </Text>
                    </Flex>
                    <Text color="gray.600">{dish.description}</Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          <Link to="/menu">
            <Button size="lg" colorScheme="brand" variant="outline">
              Voir le menu complet
            </Button>
          </Link>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="brand.500" py={20} color="white">
        <Container maxW="1400px">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontFamily="heading">
              Prêt à vivre l'expérience One Rooftop ?
            </Heading>
            <Text fontSize="xl" maxW="700px">
              Réservez dès maintenant votre table et découvrez une cuisine d'exception dans un cadre unique
            </Text>
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Link to="/reservation">
                <Button size="lg" bg="white" color="brand.500" _hover={{ bg: "gray.100" }}>
                  Réserver maintenant
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" borderColor="white" color="white" _hover={{ bg: "whiteAlpha.200" }}>
                  Nous contacter
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
