import type { Metadata } from "next";
import "./globals.css";
import { TmaSDKProvider } from "@/components/tma";
import LayoutChild from "@/components/layoutChild";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "OpenPolls",
    description: "Your opinion matters.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <TmaSDKProvider>
                    <LayoutChild>{children}</LayoutChild>
                </TmaSDKProvider>
            </body>
        </html>
    );
}
