"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  Link,
  useToast,
} from "@chakra-ui/react"
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import { motion } from "framer-motion"
import axios from "axios"

const MotionBox = motion.create(Box)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      await axios.post(`${API_URL}/api/contact`, formData)
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: "Téléphone",
      content: "+33 1 23 45 67 89",
      link: "tel:+33123456789",
    },
    {
      icon: FiMail,
      title: "Email",
      content: "contact@onerooftop.fr",
      link: "mailto:contact@onerooftop.fr",
    },
    {
      icon: FiMapPin,
      title: "Adresse",
      content: "123 Avenue des Champs, 75008 Paris",
      link: "https://maps.google.com",
    },
    {
      icon: FiClock,
      title: "Horaires",
      content: "Lun-Ven: 12h-23h | Sam-Dim: 11h-00h",
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="1400px">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} fontFamily="heading">
              Contactez-nous
            </Heading>
            <Text fontSize="xl" maxW="700px">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Content */}
      <Container maxW="1200px" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
          {/* Contact Info */}
          <VStack spacing={8} align="stretch">
            <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Heading size="lg" mb={6} color="brand.600">
                Informations de contact
              </Heading>
              <VStack spacing={6} align="stretch">
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    p={6}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    transition="all 0.3s"
                  >
                    <HStack spacing={4}>
                      <Icon as={info.icon} boxSize={6} color="brand.500" />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="lg">
                          {info.title}
                        </Text>
                        {info.link ? (
                          <Link href={info.link} color="gray.600" _hover={{ color: "brand.500" }}>
                            {info.content}
                          </Link>
                        ) : (
                          <Text color="gray.600">{info.content}</Text>
                        )}
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              {/* WhatsApp Button */}
              <Box mt={6}>
                <Link href="https://wa.me/33123456789" isExternal _hover={{ textDecoration: "none" }}>
                  <Button
                    w="full"
                    size="lg"
                    colorScheme="whatsapp"
                    leftIcon={<FaWhatsapp />}
                    bg="#25D366"
                    _hover={{ bg: "#20BA5A" }}
                  >
                    Contactez-nous sur WhatsApp
                  </Button>
                </Link>
              </Box>
            </MotionBox>
          </VStack>

          {/* Contact Form */}
          <MotionBox initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
              <Heading size="lg" mb={6} color="brand.600">
                Envoyez-nous un message
              </Heading>
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Nom</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Sujet</FormLabel>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      size="lg"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    isLoading={loading}
                    loadingText="Envoi en cours..."
                  >
                    Envoyer le message
                  </Button>
                </VStack>
              </form>
            </Box>
          </MotionBox>
        </SimpleGrid>

        {/* Map */}
        <Box mt={16} borderRadius="lg" overflow="hidden" boxShadow="xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2916878079734!2d2.3014!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec70fb1d8f%3A0x40b82c3688c9460!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sfr!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="One Rooftop Location"
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Contact
