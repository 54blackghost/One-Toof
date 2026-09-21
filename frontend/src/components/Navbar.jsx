"use client"

import {
  Box,
  Flex,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Text,
  Badge,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { HamburgerIcon } from "@chakra-ui/icons"
import { FiShoppingCart, FiUser } from "react-icons/fi"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isAuthenticated, user, logout } = useAuth()
  const { getItemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const NavLink = ({ to, children, onClick }) => (
    <Link to={to} onClick={onClick}>
      <Text fontSize="md" fontWeight="500" color="dark.700" _hover={{ color: "brand.500" }} transition="color 0.2s">
        {children}
      </Text>
    </Link>
  )

  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px"
      borderColor="warm.200"
    >
      <Flex maxW="1400px" mx="auto" px={{ base: 4, md: 8 }} py={4} align="center" justify="space-between">
        <Link to="/">
          <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color="brand.500" letterSpacing="tight">
            One Rooftop
          </Text>
        </Link>

        <Flex display={{ base: "none", md: "flex" }} gap={8} align="center">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reservation">Réserver</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Flex>

        <Flex gap={3} align="center">
          <Link to="/order">
            <IconButton
              icon={<FiShoppingCart />}
              variant="ghost"
              colorScheme="brand"
              position="relative"
              aria-label="Panier"
            >
              {getItemCount() > 0 && (
                <Badge position="absolute" top="-1" right="-1" colorScheme="red" borderRadius="full" fontSize="xs">
                  {getItemCount()}
                </Badge>
              )}
            </IconButton>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to={user?.role === "admin" ? "/admin" : "/profile"}>
                <IconButton icon={<FiUser />} variant="ghost" colorScheme="brand" aria-label="Profil" />
              </Link>
              <Button
                size="sm"
                variant="outline"
                colorScheme="brand"
                onClick={handleLogout}
                display={{ base: "none", md: "flex" }}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="solid" colorScheme="brand" display={{ base: "none", md: "flex" }}>
                Connexion
              </Button>
            </Link>
          )}

          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
            display={{ base: "flex", md: "none" }}
            aria-label="Menu"
          />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={12}>
            <VStack spacing={6} align="stretch">
              <NavLink to="/" onClick={onClose}>
                Accueil
              </NavLink>
              <NavLink to="/menu" onClick={onClose}>
                Menu
              </NavLink>
              <NavLink to="/reservation" onClick={onClose}>
                Réserver
              </NavLink>
              <NavLink to="/contact" onClick={onClose}>
                Contact
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to={user?.role === "admin" ? "/admin" : "/profile"} onClick={onClose}>
                    Profil
                  </NavLink>
                  <Button variant="outline" colorScheme="brand" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={onClose}>
                  <Button w="full" variant="solid" colorScheme="brand">
                    Connexion
                  </Button>
                </Link>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar
