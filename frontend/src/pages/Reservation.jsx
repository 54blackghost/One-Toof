"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import axios from "axios"

const MotionBox = motion.create(Box)

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${API_URL}/api/reservations`, formData)
      toast({
        title: "Réservation confirmée",
        description: "Nous avons bien reçu votre réservation. Un email de confirmation vous a été envoyé.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Une erreur est survenue lors de la réservation",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const timeSlots = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ]

  return (
    <Box>
      {/* Header */}
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="1400px">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} fontFamily="heading">
              Réserver une Table
            </Heading>
            <Text fontSize="xl" maxW="700px">
              Réservez votre table et profitez d'une expérience culinaire exceptionnelle
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Reservation Form */}
      <Container maxW="800px" py={16}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Nom complet</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    size="lg"
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@email.com"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Téléphone</FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      size="lg"
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Heure</FormLabel>
                    <Select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="Sélectionner une heure"
                      size="lg"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Nombre de personnes</FormLabel>
                  <Select name="guests" value={formData.guests} onChange={handleChange} size="lg">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "personne" : "personnes"}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Message (optionnel)</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Allergies, préférences, occasion spéciale..."
                    rows={4}
                    size="lg"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  w="full"
                  isLoading={loading}
                  loadingText="Réservation en cours..."
                >
                  Confirmer la réservation
                </Button>
              </VStack>
            </form>
          </Box>
        </MotionBox>

        {/* Info Section */}
        <Box mt={12} p={6} bg="warm.100" borderRadius="lg">
          <VStack spacing={4} align="start">
            <Heading size="md" color="brand.600">
              Informations importantes
            </Heading>
            <Text color="gray.700">• Les réservations sont confirmées sous 24h par email</Text>
            <Text color="gray.700">
              • Pour les groupes de plus de 10 personnes, veuillez nous contacter directement
            </Text>
            <Text color="gray.700">• En cas d'empêchement, merci de nous prévenir au moins 24h à l'avance</Text>
            <Text color="gray.700">• Une tenue correcte est exigée (pas de shorts ni de tongs)</Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Reservation
