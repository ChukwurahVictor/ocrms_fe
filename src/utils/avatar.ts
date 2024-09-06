import { avatarAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys);

const square = definePartsStyle({
  container: {
    borderRadius: "0",
  },
  excessLabel: {
    borderRadius: "0",
  },
});

export const avatarTheme = defineMultiStyleConfig({
  variants: { square },
});
