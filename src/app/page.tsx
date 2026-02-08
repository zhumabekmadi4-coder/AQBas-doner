"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Flame, MapPin, ChevronDown, ArrowLeft } from "lucide-react";
import { MENU_DATA, MenuItem } from "@/lib/data";
import { useCart } from "@/lib/store";
import MenuGrid from "@/components/Menu/MenuGrid";
import ModifierModal from "@/components/Menu/ModifierModal";
import CartDrawer from "@/components/Menu/CartDrawer";
import { BackgroundSpark } from "@/components/UI/BackgroundSpark";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedBranch, setSelectedBranch] = useState<{ name: string, phone: string } | null>(null);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const { addItem } = useCart();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

    return (
        <main ref={containerRef} className="relative min-h-[200vh] text-white">
            <BackgroundSpark />
            <AnimatePresence mode="wait">
                {!selectedBranch ? (
                    <motion.div
                        key="landing"
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        {/* Intro Section - Clean view for video */}
                        <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
                            <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-4" />

                            <div className="relative z-10 text-center px-4 w-full h-full">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, y: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex flex-col items-center gap-2 cursor-pointer"
                                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                    >
                                        <ChevronDown size={32} className="text-white/40 hover:text-brand-red transition-all duration-300 drop-shadow-[0_0_15px_rgba(235,33,46,0.3)]" />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Locations Section */}
                        <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-20">
                            <h2 className="text-4xl md:text-6xl font-black mb-16 text-center italic uppercase leading-tight">
                                Выбери свой <span className="text-brand-red">филиал</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-16 w-full max-w-screen-2xl px-12">
                                <BranchCard
                                    name="Тауелсиздик 23/1"
                                    phone="+77764144105"
                                    image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000"
                                    onClick={() => setSelectedBranch({ name: "Тауелсиздик 23/1", phone: "+77764144105" })}
                                />
                                <BranchCard
                                    name="Туран 43/1"
                                    phone="+77051283030"
                                    image="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000"
                                    onClick={() => setSelectedBranch({ name: "Туран 43/1", phone: "+77051283030" })}
                                />
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="min-h-screen p-6 md:p-12 relative z-10"
                    >
                        {selectedBranch && (
                            <>
                                <button
                                    onClick={() => setSelectedBranch(null)}
                                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
                                >
                                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Назад к выбору
                                </button>

                                <div className="mb-12">
                                    <h1 className="text-4xl md:text-6xl font-black uppercase italic mb-2 tracking-tighter">
                                        Меню <span className="text-brand-red">{selectedBranch.name.split(' ')[0]}</span>
                                    </h1>
                                    <p className="text-zinc-500 font-medium tracking-widest uppercase">Лучшее мясо на огне в Астане</p>
                                </div>

                                <MenuGrid
                                    items={MENU_DATA}
                                    onSelectItem={setSelectedItem}
                                    addItem={addItem}
                                />

                                <CartDrawer branch={selectedBranch.name} branchPhone={selectedBranch.phone} />

                                <ModifierModal
                                    item={selectedItem}
                                    isOpen={!!selectedItem}
                                    onClose={() => setSelectedItem(null)}
                                    onConfirm={(mods) => {
                                        if (selectedItem) addItem(selectedItem, mods);
                                        setSelectedItem(null);
                                    }}
                                />
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

function BranchCard({ name, phone, image, onClick }: { name: string; phone: string; image: string; onClick: () => void }) {
    return (
        <motion.div
            whileHover={{ y: -20, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className="group relative h-[850px] overflow-hidden rounded-[4rem] cursor-pointer border border-white/5 hover:border-brand-red/50 transition-all duration-700 shadow-2xl glass-card"
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

            <div className="absolute top-6 right-6">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <MapPin size={16} className="text-brand-red" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Астана</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 p-10 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-5xl font-black text-white mb-2 leading-tight uppercase italic tracking-tighter">
                    {name.split(' ')[0]} <span className="text-brand-red">{name.split(' ')[1]}</span>
                </h3>
                <p className="text-zinc-400 mb-8 font-bold tracking-[0.4em] text-[10px] uppercase opacity-60">{phone}</p>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full overflow-hidden bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl transition-all duration-500 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_20px_40px_-10px_rgba(235,33,46,0.5)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Перейти к меню <Flame size={16} />
                    </span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                </motion.button>
            </div>
        </motion.div>
    );
}
