"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/lib/data";
import { X, Flame, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ModifierModal({
    item,
    isOpen,
    onClose,
    onConfirm
}: {
    item: MenuItem | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (modifiers: string[]) => void;
}) {
    const [selectedMods, setSelectedMods] = useState<string[]>(item?.modifiers || []);

    if (!item) return null;

    const toggleMod = (mod: string) => {
        setSelectedMods(prev =>
            prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        {/* Premium Header Image */}
                        <div className="h-44 relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000"
                                className="w-full h-full object-cover scale-110 blur-[2px] opacity-60"
                                alt="Background"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Flame size={48} className="text-brand-red drop-shadow-[0_0_20px_rgba(235,33,46,0.8)]" />
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-2xl text-white hover:bg-brand-red transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-10 -mt-6 relative z-10">
                            <h3 className="text-4xl font-black uppercase italic mb-2 tracking-tighter leading-tight">
                                Настрой свой <span className="text-brand-red">{item.name.split(' ')[0]}</span>
                            </h3>
                            <p className="text-zinc-500 mb-10 font-medium text-sm tracking-wide">Добавь огня или убери лишнее. Твой идеальный вкус.</p>

                            <div className="grid grid-cols-1 gap-3 mb-12">
                                {["Острый соус", "Лук", "Огурцы", "Сыр", "Халапеньо"].map((mod) => (
                                    <label
                                        key={mod}
                                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group/mod ${selectedMods.includes(mod)
                                            ? "border-brand-red/50 bg-brand-red/5"
                                            : "border-white/5 bg-white/5 hover:border-white/10"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full transition-all ${selectedMods.includes(mod) ? "bg-brand-red shadow-[0_0_10px_rgba(235,33,46,1)]" : "bg-zinc-800"}`} />
                                            <span className={`font-black uppercase tracking-[0.2em] text-[10px] transition-colors ${selectedMods.includes(mod) ? "text-white" : "text-zinc-500"}`}>
                                                {mod}
                                            </span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedMods.includes(mod)}
                                            onChange={() => toggleMod(mod)}
                                        />
                                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedMods.includes(mod) ? "bg-brand-red border-brand-red shadow-lg shadow-brand-red/30" : "border-white/10"
                                            }`}>
                                            {selectedMods.includes(mod) && <Plus size={14} className="text-white" strokeWidth={4} />}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <button
                                onClick={() => onConfirm(selectedMods)}
                                className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-brand-red hover:text-white transition-all flex items-center justify-center gap-3 group"
                            >
                                Сохранить вкус <Flame size={18} className="group-hover:animate-pulse" />
                            </button>
                            <p className="mt-6 text-center text-zinc-600 text-[10px] font-black uppercase tracking-widest">₸{item.price.toLocaleString()} • Готовность за 10-15 мин</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
