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
  Link as RouterLink,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"

const MotionBox = motion.create(Box)

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.detail) {
      const detail = error.response.data.detail;
      if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
        return detail.map(err => err.msg).join('; ');
      } else if (typeof detail === 'string') {
        return detail;
      } else if (typeof detail === 'object') {
        return JSON.stringify(detail);
      }
    }
    return "Une erreur inattendue est survenue.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur One Rooftop",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: getErrorMessage(error),
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
                  Connexion
                </Heading>
                <Text color="gray.600">Connectez-vous à votre compte One Rooftop</Text>
              </VStack>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <VStack spacing={4}>
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

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    isLoading={loading}
                    loadingText="Connexion..."
                  >
                    Se connecter
                  </Button>
                </VStack>
              </form>

              <Text color="gray.600">
                Pas encore de compte ?{" "}
                <Link as={RouterLink}  to="/register" fontWeight="semibold"  color="blue.500">
                  S'inscrire
                </Link>
              </Text>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Login
