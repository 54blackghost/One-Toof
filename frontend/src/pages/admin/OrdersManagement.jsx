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
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react"
import axios from "axios"

const OrdersManagement = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`)
      setOrders(response.data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
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
      pending: "yellow",
      confirmed: "blue",
      preparing: "orange",
      delivered: "green",
      cancelled: "red",
    }
    return colors[status] || "gray"
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: "En attente",
      confirmed: "Confirmée",
      preparing: "En préparation",
      delivered: "Livrée",
      cancelled: "Annulée",
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

  if (orders.length === 0) {
    return (
      <Center py={8}>
        <Text color="gray.500">Aucune commande pour le moment</Text>
      </Center>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Client</Th>
            <Th>Total</Th>
            <Th>Statut</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>#{order.id}</Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">Commande #{order.id}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {order.delivery_city}
                  </Text>
                </VStack>
              </Td>
              <Td fontWeight="bold">{order.total.toFixed(2)}€</Td>
              <Td>
                <Badge colorScheme={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
              </Td>
              <Td>{new Date(order.created_at).toLocaleDateString("fr-FR")}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="brand">
                    Détails
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}

export default OrdersManagement
