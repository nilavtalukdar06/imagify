import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Imagify",
  description: "Convert your ideas to images with the power of imagify",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
