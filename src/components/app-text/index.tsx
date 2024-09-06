"use client";

import { Text as ChakraText, TextProps } from "@chakra-ui/react";
import React from "react";
import { useMediaQuery } from "@chakra-ui/react";

interface AppTextProps extends Omit<TextProps, "fontSize" | "fontWeight"> {
  children: React.ReactNode;
  variant?:
    | "small"
    | "label"
    | "smallLabel"
    | "paragraph"
    | "heading6"
    | "heading5"
    | "heading4"
    | "heading3"
    | "heading2"
    | "heading1";
  fontWeight?: "regular" | "medium" | "semiBold" | "bold";
}

const Text = ({
  children,
  variant,
  fontWeight,
  ...otherProps
}: AppTextProps) => {
  const [isLowerThan340] = useMediaQuery("(max-width: 340px)");
  const [isLowerThan840] = useMediaQuery("(max-width: 840px)");

  const changeVariantFunc = React.useCallback(() => {
    if (isLowerThan840 && !isLowerThan340) {
      if (variant === "heading1") return "heading2";
      if (variant === "heading2") return "heading3";
      if (variant === "heading3") return "heading4";
      if (variant === "heading4") return "heading5";
      if (variant === "heading5") return "heading6";
      if (variant === "heading6" || variant === "paragraph") return "label";
      if (variant === "label") return "smallLabel";
      if (variant === "smallLabel") return "small";
    }

    if (isLowerThan340) {
      if (variant === "heading1") return "heading3";
      if (variant === "heading2") return "heading4";
      if (variant === "heading3") return "heading5";
      if (variant === "heading4") return "heading6";
      if (variant === "heading5") return "label";
      if (variant === "heading6" || variant === "paragraph")
        return "smallLabel";
      if (variant === "label") return "small";
    }

    return variant;
  }, [isLowerThan340, isLowerThan840, variant]);

  variant = changeVariantFunc();

  const paragraph =
    isLowerThan840 && !isLowerThan340
      ? "label"
      : isLowerThan340
      ? "smallLabel"
      : "paragraph";

  return (
    <ChakraText
      fontSize={variant || paragraph}
      fontWeight={fontWeight || "regular"}
      {...otherProps}
    >
      {children}
    </ChakraText>
  );
};

export { Text };
