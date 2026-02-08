"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export const BackgroundSpark = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Generate stable random values for sparks only on the client
    const sparks = useMemo(() => {
        return [...Array(60)].map((_, i) => ({
            id: i,
            initialX: Math.random() * 100 + "%",
            delay: Math.random() * 10,
            duration: Math.random() * 4 + 4,
            animateScale: Math.random() * 2 + 0.5,
            animateX: (Math.random() * 110 - 5) + "%"
        }));
    }, []);

    if (!isMounted) {
        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] bg-[#020202]">
                <div className="absolute inset-0 bg-black" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] bg-[#020202]">
            {/* GLOBAL VIDEO BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] brightness-[0.5] saturate-[1.1]"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {/* Overlays for readability and depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.8)_100%)]" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            </div>

            {/* Ambient Base Glow (The 'Furnace' effect) */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-brand-red/15 via-brand-red/5 to-transparent blur-[120px] z-10" />

            {/* Spark System - Only renders on client */}
            <div className="absolute inset-0 z-20">
                {sparks.map((spark) => (
                    <motion.div
                        key={spark.id}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: spark.initialX,
                            y: "105%"
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, spark.animateScale, 0],
                            y: "-10%",
                            x: spark.animateX
                        }}
                        transition={{
                            duration: spark.duration,
                            repeat: Infinity,
                            delay: spark.delay,
                            ease: "easeOut"
                        }}
                        className="absolute w-[2px] h-[2px] bg-brand-red rounded-full shadow-[0_0_15px_6px_rgba(235,33,46,0.9)]"
                    />
                ))}
            </div>

            {/* Noise SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-soft-light z-30">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
};
