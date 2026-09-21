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
  Button,
  useToast,
  Link as RouterLink
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"

const MotionBox = motion.create(Box)

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setLoading(true)

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      navigate("/login")
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.response?.data?.detail || "Une erreur est survenue",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="80vh" display="flex" alignItems="center" py={12}>
      <Container maxW="500px">
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="xl">
            <VStack spacing={6}>
              <VStack spacing={2} textAlign="center">
                <Heading as="h1" fontSize="3xl" fontFamily="heading" color="brand.600">
                  Inscription
                </Heading>
                <Text color="gray.600">Créez votre compte One Rooftop</Text>
              </VStack>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <VStack spacing={4}>
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
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      size="lg"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    isLoading={loading}
                    loadingText="Inscription..."
                  >
                    S'inscrire
                  </Button>
                </VStack>
              </form>

              <Text color="gray.600">
                Déjà un compte ?{" "}
                <Link as={RouterLink} to="/login" color="blue.500">
                  Se connecter
                </Link>
              </Text>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Register
