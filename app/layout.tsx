import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "WEIREN — Wear It Different", description: "Handpicked thrift finds, vintage essentials, and standout pieces that deserve another life.", applicationName: "WEIREN" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
