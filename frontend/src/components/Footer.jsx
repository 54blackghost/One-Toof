import { Box, Container, Flex, Text, VStack, HStack, Link, Icon } from "@chakra-ui/react"
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"

const Footer = () => {
  return (
    <Box bg="dark.900" color="white" py={12} mt={20}>
      <Container maxW="1400px">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8}>
          <VStack align="start" spacing={4} flex={1}>
            <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color="brand.400">
              One Rooftop
            </Text>
            <Text color="gray.400" maxW="300px">
              Découvrez une expérience culinaire unique sur notre rooftop avec une vue imprenable sur la ville.
            </Text>
          </VStack>

          <VStack align="start" spacing={3} flex={1}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Contact
            </Text>
            <HStack spacing={3}>
              <Icon as={FiPhone} />
              <Text color="gray.400">+33 1 23 45 67 89</Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FiMail} />
              <Text color="gray.400">contact@onerooftop.fr</Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FiMapPin} />
              <Text color="gray.400">123 Avenue des Champs, Paris</Text>
            </HStack>
          </VStack>

          <VStack align="start" spacing={3} flex={1}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Horaires
            </Text>
            <Text color="gray.400">Lundi - Vendredi: 12h - 23h</Text>
            <Text color="gray.400">Samedi - Dimanche: 11h - 00h</Text>
          </VStack>

          <VStack align="start" spacing={3} flex={1}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Suivez-nous
            </Text>
            <HStack spacing={4}>
              <Link href="#" _hover={{ color: "brand.400" }}>
                <Icon as={FiFacebook} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: "brand.400" }}>
                <Icon as={FiInstagram} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: "brand.400" }}>
                <Icon as={FiTwitter} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: "brand.400" }}>
                <Icon as={FaWhatsapp} boxSize={6} />
              </Link>
            </HStack>
          </VStack>
        </Flex>

        <Box borderTop="1px" borderColor="gray.700" mt={8} pt={8}>
          <Text textAlign="center" color="gray.500" fontSize="sm">
            © 2025 One Rooftop. Tous droits réservés.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
