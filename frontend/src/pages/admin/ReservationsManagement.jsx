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

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/reservations`)
      setReservations(response.data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
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
      confirmed: "green",
      cancelled: "red",
    }
    return colors[status] || "gray"
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: "En attente",
      confirmed: "Confirmée",
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

  if (reservations.length === 0) {
    return (
      <Center py={8}>
        <Text color="gray.500">Aucune réservation pour le moment</Text>
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
            <Th>Contact</Th>
            <Th>Date & Heure</Th>
            <Th>Personnes</Th>
            <Th>Statut</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservations.map((reservation) => (
            <Tr key={reservation.id}>
              <Td>#{reservation.id}</Td>
              <Td fontWeight="medium">{reservation.name}</Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm">{reservation.email}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {reservation.phone}
                  </Text>
                </VStack>
              </Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text>{reservation.date}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {reservation.time}
                  </Text>
                </VStack>
              </Td>
              <Td>{reservation.guests}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(reservation.status)}>{getStatusLabel(reservation.status)}</Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="green">
                    Confirmer
                  </Button>
                  <Button size="sm" colorScheme="red" variant="outline">
                    Annuler
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

export default ReservationsManagement
