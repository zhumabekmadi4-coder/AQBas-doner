import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    red: "#FF0000",
                    black: "#000000",
                    orange: "#FF4500",
                },
            },
            backgroundImage: {
                'fire-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(255,0,0,0.5))',
            },
        },
    },
    plugins: [],
};
export default config;
