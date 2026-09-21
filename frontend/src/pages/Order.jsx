"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  IconButton,
  Divider,
  useToast,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const Order = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    notes: "",
  })
  const toast = useToast()
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour passer commande",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      navigate("/login")
      return
    }
    onOpen()
  }

  const handleSubmitOrder = async () => {
    setLoading(true)
    try {
      const orderData = {
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        delivery_address: deliveryInfo.address,
        delivery_city: deliveryInfo.city,
        delivery_postal_code: deliveryInfo.postalCode,
        phone: deliveryInfo.phone,
        notes: deliveryInfo.notes,
        total: getTotal(),
      }

      await axios.post(`${API_URL}/api/orders`, orderData)

      toast({
        title: "Commande confirmée",
        description: "Votre commande a été enregistrée avec succès",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      clearCart()
      onClose()
      navigate("/")
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Une erreur est survenue",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <Container maxW="1400px" py={20}>
        <VStack spacing={8} textAlign="center">
          <FiShoppingBag size={80} color="#D97757" />
          <Heading size="lg">Votre panier est vide</Heading>
          <Text color="gray.600">Découvrez notre menu et ajoutez des plats à votre panier</Text>
          <Link to="/menu">
            <Button colorScheme="brand" size="lg">
              Voir le menu
            </Button>
          </Link>
        </VStack>
      </Container>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="1400px">
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} fontFamily="heading">
              Votre Panier
            </Heading>
            <Text fontSize="xl">Finalisez votre commande</Text>
          </VStack>
        </Container>
      </Box>

      {/* Cart Content */}
      <Container maxW="1200px" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          {/* Cart Items */}
          <Box gridColumn={{ base: "1", lg: "1 / 3" }}>
            <VStack spacing={4} align="stretch">
              {cart.map((item) => (
                <Box key={item.id} bg="white" p={6} borderRadius="lg" boxShadow="md">
                  <HStack spacing={4} align="start">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack flex="1" align="start" spacing={2}>
                      <Heading size="md">{item.name}</Heading>
                      <Text color="gray.600" fontSize="sm">
                        {item.description}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="brand.500">
                        {item.price}€
                      </Text>
                    </VStack>
                    <VStack spacing={2}>
                      <HStack>
                        <IconButton
                          icon={<FiMinus />}
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuer"
                        />
                        <Text fontWeight="bold" minW="30px" textAlign="center">
                          {item.quantity}
                        </Text>
                        <IconButton
                          icon={<FiPlus />}
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Augmenter"
                        />
                      </HStack>
                      <IconButton
                        icon={<FiTrash2 />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Supprimer"
                      />
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Order Summary */}
          <Box>
            <Box bg="white" p={6} borderRadius="lg" boxShadow="xl" position="sticky" top="100px">
              <VStack spacing={4} align="stretch">
                <Heading size="md">Résumé</Heading>
                <Divider />

                <HStack justify="space-between">
                  <Text>Sous-total</Text>
                  <Text fontWeight="bold">{getTotal().toFixed(2)}€</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Livraison</Text>
                  <Text fontWeight="bold">5.00€</Text>
                </HStack>

                <Divider />

                <HStack justify="space-between" fontSize="xl">
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold" color="brand.500">
                    {(getTotal() + 5).toFixed(2)}€
                  </Text>
                </HStack>

                <Button colorScheme="brand" size="lg" w="full" onClick={handleCheckout}>
                  Passer commande
                </Button>

                <Link to="/menu">
                  <Button variant="outline" colorScheme="brand" w="full">
                    Continuer mes achats
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Checkout Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informations de livraison</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Adresse</FormLabel>
                <Input
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  placeholder="123 Rue de la Paix"
                />
              </FormControl>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Ville</FormLabel>
                  <Input
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                    placeholder="Paris"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Code postal</FormLabel>
                  <Input
                    value={deliveryInfo.postalCode}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })}
                    placeholder="75001"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Téléphone</FormLabel>
                <Input
                  type="tel"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Instructions de livraison</FormLabel>
                <Textarea
                  value={deliveryInfo.notes}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                  placeholder="Sonnez à l'interphone, 3ème étage..."
                  rows={3}
                />
              </FormControl>

              <Button
                colorScheme="brand"
                size="lg"
                w="full"
                onClick={handleSubmitOrder}
                isLoading={loading}
                loadingText="Commande en cours..."
              >
                Confirmer et payer {(getTotal() + 5).toFixed(2)}€
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Order
