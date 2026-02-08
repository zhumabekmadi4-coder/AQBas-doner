import type { Metadata } from "next";
import { Playfair_Display_SC, Karla } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display_SC({
    weight: ['400', '700'],
    subsets: ["latin", "cyrillic"],
    variable: '--font-playfair'
});

const karla = Karla({
    subsets: ["latin", "latin-ext"],
    variable: '--font-karla'
});

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
        <html lang="ru" className={`scroll-smooth ${playfair.variable} ${karla.variable}`}>
            <body className={`${karla.className} bg-black text-white antialiased selection:bg-brand-red/30`}>
                <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                {children}
            </body>
        </html>
    );
}
