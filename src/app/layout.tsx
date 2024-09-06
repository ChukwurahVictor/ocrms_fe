import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Poppins, IBM_Plex_Sans } from "next/font/google";
import { Providers } from "./providers";
import { ErrorToast } from "@/utils/toasts";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "OCRMS App",
  description: "Online Complaint Registration and Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ibmPlexSans.variable}`}>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                borderLeft: "2px solid #4CAF50",
                borderRadius: "0",
                paddingLeft: "6px",
                padding: "8px 32px 8px 4px",
                color: "#4CAF50",
                fontSize: "16px",
                backgroundColor: "#DEFCE6",
                boxShadow: "none",
                width: "64rem",
              },
            },
            error: {
              style: {
                borderLeft: "2px solid #ab0000",
                borderRadius: "0",
                paddingLeft: "6px",
                padding: "8px 32px 8px 4px",
                color: "#ab0000",
                fontSize: "16px",
                backgroundColor: "#FEF0F1",
                boxShadow: "none",
                width: "64rem",
              },
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
