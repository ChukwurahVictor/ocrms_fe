import { Link as ChakraLink, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface NavbarLinkProps {
  href?: string;
  icon?: IconType;
  tabName?: string;
  alt?: string;
  h?: string | number;
  w?: string | number;
  onclose: () => void;
  isMobile?: boolean;
  pl?: string;
  size?: string;
}

export const NavbarLink = ({
  href = "#",
  icon,
  w,
  tabName,
  onclose,
  isMobile,
  size,
  ...rest
}: NavbarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href as string);

  return (
    <ChakraLink
      href={href || "/"}
      display="flex"
      alignItems="center"
      as={Link}
      textDecoration="none"
      _hover={{
        bg: "#C9DCFF",
      }}
      w={w ?? "95%"}
      bg={isActive ? "linear-gradient(-90deg, #FFFFFF 0%, #C9DCFF 100%)" : ""}
      borderLeft={isActive ? "2px solid #0F62FE" : ""}
      transition="all 0.2s"
      p=".5rem"
      color={isActive ? "text.blue" : "text.grey"}
      onClick={() => {
        if (isMobile) onclose();
      }}
      {...rest}
    >
      {icon && (
        <Icon
          as={icon}
          ml={size === "small" ? "3" : 0}
          color={isActive ? "text.blue" : "text.grey"}
          boxSize={5}
        />
      )}
      <Text ml={icon ? "5" : "0"} fontWeight="medium">
        {tabName}
      </Text>
    </ChakraLink>
  );
};
