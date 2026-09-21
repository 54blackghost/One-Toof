"use client"

import { useState } from "react"
import { Box, Button, VStack, Text, useToast, FormControl, FormLabel, Input, SimpleGrid } from "@chakra-ui/react"
import { FiCreditCard, FiLock } from "react-icons/fi"

const StripeCheckout = ({ amount, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const toast = useToast()

  const handleChange = (e) => {
    let value = e.target.value

    // Format card number
    if (e.target.name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    }

    // Format expiry
    if (e.target.name === "expiry") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substr(0, 5)
    }

    // Format CVC
    if (e.target.name === "cvc") {
      value = value.replace(/\D/g, "").substr(0, 3)
    }

    setCardInfo({
      ...cardInfo,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, integrate with Stripe API here
      // const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY)
      // const { error } = await stripe.confirmCardPayment(clientSecret, {...})

      toast({
        title: "Paiement réussi",
        description: "Votre commande a été confirmée",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du paiement",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Informations de paiement
          </Text>

          <FormControl isRequired>
            <FormLabel>Nom sur la carte</FormLabel>
            <Input name="name" value={cardInfo.name} onChange={handleChange} placeholder="Jean Dupont" size="lg" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Numéro de carte</FormLabel>
            <Input
              name="cardNumber"
              value={cardInfo.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              size="lg"
              leftElement={<FiCreditCard />}
            />
          </FormControl>

          <SimpleGrid columns={2} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Date d'expiration</FormLabel>
              <Input name="expiry" value={cardInfo.expiry} onChange={handleChange} placeholder="MM/YY" size="lg" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>CVC</FormLabel>
              <Input
                name="cvc"
                value={cardInfo.cvc}
                onChange={handleChange}
                placeholder="123"
                type="password"
                size="lg"
              />
            </FormControl>
          </SimpleGrid>

          <Box p={4} bg="gray.50" borderRadius="md" display="flex" alignItems="center" gap={2}>
            <FiLock color="#D97757" />
            <Text fontSize="sm" color="gray.600">
              Paiement sécurisé par Stripe
            </Text>
          </Box>

          <Button type="submit" colorScheme="brand" size="lg" w="full" isLoading={loading} loadingText="Traitement...">
            Payer {amount.toFixed(2)}€
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default StripeCheckout
