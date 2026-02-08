import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: "AQBas - Meat & Fire",
    description: "Premium snacks and traditional fire-grilled meat in Astana.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="scroll-smooth">
            <body className={`${inter.className} bg-black text-white antialiased selection:bg-brand-red/30`}>
                <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                {children}
            </body>
        </html>
    );
}
