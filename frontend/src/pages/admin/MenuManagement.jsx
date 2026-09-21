"use client"

import { useEffect, useState } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useDisclosure,
  Image,
  Badge,
} from "@chakra-ui/react"
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi"
import axios from "axios"

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Entrées",
    image: "",
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menu`)
      setMenuItems(response.data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le menu",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image || "",
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "Entrées",
        image: "",
      })
    }
    onOpen()
  }

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/api/menu/${editingItem.id}`, formData)
        toast({
          title: "Plat modifié",
          status: "success",
          duration: 2000,
        })
      } else {
        await axios.post(`${API_URL}/api/menu`, formData)
        toast({
          title: "Plat ajouté",
          status: "success",
          duration: 2000,
        })
      }
      fetchMenuItems()
      onClose()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        status: "error",
        duration: 3000,
      })
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      try {
        await axios.delete(`${API_URL}/api/menu/${id}`)
        toast({
          title: "Plat supprimé",
          status: "success",
          duration: 2000,
        })
        fetchMenuItems()
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le plat",
          status: "error",
          duration: 3000,
        })
      }
    }
  }

  if (loading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="brand.500" />
      </Center>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Gestion du menu
        </Text>
        <Button leftIcon={<FiPlus />} colorScheme="brand" onClick={() => handleOpenModal()}>
          Ajouter un plat
        </Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Nom</Th>
            <Th>Catégorie</Th>
            <Th>Prix</Th>
            <Th>Statut</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {menuItems.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">{item.name}</Text>
                  <Text fontSize="sm" color="gray.600" noOfLines={1}>
                    {item.description}
                  </Text>
                </VStack>
              </Td>
              <Td>{item.category}</Td>
              <Td fontWeight="bold">{item.price}€</Td>
              <Td>
                <Badge colorScheme={item.available ? "green" : "red"}>
                  {item.available ? "Disponible" : "Indisponible"}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" leftIcon={<FiEdit />} onClick={() => handleOpenModal(item)}>
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<FiTrash2 />}
                    onClick={() => handleDelete(item.id)}
                  >
                    Supprimer
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingItem ? "Modifier le plat" : "Ajouter un plat"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nom</FormLabel>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Prix (€)</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Catégorie</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Entrées">Entrées</option>
                  <option value="Plats">Plats</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Boissons">Boissons</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>URL de l'image</FormLabel>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              {editingItem ? "Modifier" : "Ajouter"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default MenuManagement
