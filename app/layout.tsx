import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Trello clone",
  description: "An application to manage taches he also contain openAi api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
