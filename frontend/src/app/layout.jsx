import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { CartProvider } from "@/context/CartContext";
import '@mantine/carousel/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sewa Chikan",
  description: "Chikankari products from Sewa Chikan Industries",
};
const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider
          defaultColorScheme="light"
          theme={theme}>
          <CartProvider>
            {children}
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
