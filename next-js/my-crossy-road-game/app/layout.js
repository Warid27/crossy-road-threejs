import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"], // Fixed the subset
});

export const metadata = {
  title: "Crossy Road",
  description: "Crossy Road by Warid",
  icons: {
    icon: "/favicon.ico", // Fixed metadata structure
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} antialiased`}>{children}</body>
    </html>
  );
}
