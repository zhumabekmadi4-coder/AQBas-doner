"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/lib/data";
import { Flame, Plus, Info } from "lucide-react";

type GroupedItem = {
    baseName: string;
    variants: MenuItem[];
    category: string;
    image?: string;
};

export default function MenuGrid({
    items,
    onSelectItem,
    addItem
}: {
    items: MenuItem[];
    onSelectItem: (item: MenuItem) => void;
    addItem: (item: MenuItem, modifiers: string[]) => void;
}) {
    const categories = ["Doner", "Burger", "Snacks", "Drinks"];

    const groupItems = (catItems: MenuItem[]): GroupedItem[] => {
        const groups: Record<string, GroupedItem> = {};

        catItems.forEach(item => {
            // Grouping logic: extract base name (everything before digits/size)
            const match = item.name.match(/^([^\d]+)(\d+г|50\/50|75\/75)?$/);
            const baseName = match ? match[1].trim() : item.name;

            if (!groups[baseName]) {
                groups[baseName] = {
                    baseName,
                    variants: [],
                    category: item.category,
                    image: item.image || getPlaceholderImage(item.category, baseName)
                };
            }
            groups[baseName].variants.push(item);
        });

        return Object.values(groups);
    };

    const getPlaceholderImage = (category: string, name: string) => {
        if (category === "Doner") return "https://images.unsplash.com/photo-1529006557810-274b9b2fc78a?q=80&w=800";
        if (category === "Burger") return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800";
        if (category === "Snacks") return "https://images.unsplash.com/photo-1573016608244-7d5ef19745ae?q=80&w=800";
        return "https://images.unsplash.com/photo-1544145945-f904253d0c7e?q=80&w=800";
    };

    return (
        <div className="space-y-20">
            {categories.map((cat) => {
                const catItems = items.filter(i => i.category === cat);
                if (catItems.length === 0) return null;

                const grouped = groupItems(catItems);

                return (
                    <div key={cat} className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-red/30" />
                            <h3 className="text-4xl font-black italic uppercase text-white flex items-center gap-3">
                                <Flame size={32} className="text-brand-red" />
                                {cat === "Doner" ? "Донеры" : cat === "Burger" ? "Бургеры" : cat === "Snacks" ? "Закуски" : "Напитки"}
                            </h3>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-red/30" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {grouped.map((group) => (
                                <motion.div
                                    key={group.baseName}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card overflow-hidden rounded-3xl group"
                                >
                                    <div className="flex flex-col md:flex-row h-full">
                                        <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                                            <img
                                                src={group.image}
                                                alt={group.baseName}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent md:hidden" />
                                        </div>

                                        <div className="flex-1 p-8 flex flex-col justify-between bg-gradient-to-br from-zinc-900/50 to-transparent">
                                            <div>
                                                <h4 className="text-2xl font-black uppercase italic mb-2 tracking-tight group-hover:text-brand-red transition-colors">
                                                    {group.baseName}
                                                </h4>
                                                <p className="text-zinc-500 text-sm mb-6 font-medium line-clamp-2">
                                                    Традиционный рецепт на открытом огне с фирменным соусом.
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                {group.variants.map((variant) => (
                                                    <div
                                                        key={variant.id}
                                                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group/variant"
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-black uppercase text-zinc-500 group-hover/variant:text-white transition-colors">
                                                                {variant.name.includes('г') ? variant.name.match(/\d+г|50\/50|75\/75/)?.[0] : 'Стандарт'}
                                                            </span>
                                                            <span className="text-lg font-bold">₸{variant.price.toLocaleString()}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                if (variant.category === "Doner" || variant.category === "Burger") {
                                                                    onSelectItem(variant);
                                                                } else {
                                                                    // For Snacks and Drinks, add to cart immediately with empty mods
                                                                    addItem(variant, []);
                                                                }
                                                            }}
                                                            className="bg-brand-red text-white p-3 rounded-lg hover:bg-white hover:text-black transition-all active:scale-90"
                                                        >
                                                            <Plus size={20} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

