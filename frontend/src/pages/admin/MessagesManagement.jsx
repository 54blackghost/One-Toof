"use client"

import { useEffect, useState } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  Text,
  useToast,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react"
import axios from "axios"

const MessagesManagement = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/messages`)
      setMessages(response.data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      new: "blue",
      read: "gray",
      replied: "green",
    }
    return colors[status] || "gray"
  }

  const getStatusLabel = (status) => {
    const labels = {
      new: "Nouveau",
      read: "Lu",
      replied: "Répondu",
    }
    return labels[status] || status
  }

  if (loading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="brand.500" />
      </Center>
    )
  }

  if (messages.length === 0) {
    return (
      <Center py={8}>
        <Text color="gray.500">Aucun message pour le moment</Text>
      </Center>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nom</Th>
            <Th>Email</Th>
            <Th>Sujet</Th>
            <Th>Date</Th>
            <Th>Statut</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {messages.map((message) => (
            <Tr key={message.id}>
              <Td>#{message.id}</Td>
              <Td fontWeight="medium">{message.name}</Td>
              <Td>{message.email}</Td>
              <Td>
                <Text noOfLines={1} maxW="200px">
                  {message.subject}
                </Text>
              </Td>
              <Td>{new Date(message.created_at).toLocaleDateString("fr-FR")}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(message.status)}>{getStatusLabel(message.status)}</Badge>
              </Td>
              <Td>
                <Button size="sm" colorScheme="brand">
                  Voir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}

export default MessagesManagement
