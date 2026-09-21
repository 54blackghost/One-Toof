import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FFF5F0",
      100: "#FFE8DC",
      200: "#FFD1B9",
      300: "#FFBA96",
      400: "#FFA373",
      500: "#D97757",
      600: "#B35A3E",
      700: "#8C4329",
      800: "#662C18",
      900: "#40190B",
    },
    warm: {
      50: "#FAF5F0",
      100: "#F5EBE0",
      200: "#E8D5C4",
      300: "#DBBFA8",
      400: "#CEA98C",
      500: "#C19370",
      600: "#9A7659",
      700: "#735942",
      800: "#4D3C2C",
      900: "#261F16",
    },
    dark: {
      50: "#F7F7F7",
      100: "#E3E3E3",
      200: "#C8C8C8",
      300: "#A4A4A4",
      400: "#818181",
      500: "#666666",
      600: "#515151",
      700: "#434343",
      800: "#383838",
      900: "#1A1A1A",
    },
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: "warm.50",
        color: "dark.900",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          transition: "all 0.3s ease",
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.500",
          _hover: {
            bg: "brand.50",
          },
        },
      },
    },
  },
})

export default theme
