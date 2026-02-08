"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store";
import { ShoppingBag, X, Send, Clock, MapPin } from "lucide-react";
import { useState } from "react";

export default function CartDrawer({
    branch,
    branchPhone
}: {
    branch: string;
    branchPhone: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [timeType, setTimeType] = useState<"asap" | "scheduled">("asap");
    const [scheduledTime, setScheduledTime] = useState("");
    const [orderType, setOrderType] = useState<"here" | "takeaway">("here");
    const { items, total, removeItem } = useCart();

    const getMinTime = () => {
        const now = new Date();
        const minTime = new Date(now.getTime() + 45 * 60000);
        return minTime.toTimeString().slice(0, 5);
    };

    const isTimeValid = () => {
        if (timeType === "asap") return true;
        if (!scheduledTime) return false;

        const [hours, minutes] = scheduledTime.split(':').map(Number);
        const selectedDate = new Date();
        selectedDate.setHours(hours, minutes, 0, 0);

        const minDate = new Date();
        minDate.setMinutes(minDate.getMinutes() + 45);

        return selectedDate >= minDate;
    };

    const generateWhatsAppLink = () => {
        const orderDetails = items.map(i =>
            `- ${i.name} (₸${i.price}) [${i.selectedModifiers.join(", ") || "без изменений"}]`
        ).join("\n");

        const timeString = timeType === "asap" ? "Ближайшее время" : `Ко времени: ${scheduledTime}`;
        const text = `*Новый заказ - ${branch}*\n\n*Тип:* ${orderType === "takeaway" ? "Самовывоз" : "В зале"}\n*Время:* ${timeString}\n\n*Меню:*\n${orderDetails}\n\n*Итого: ₸ ${total.toLocaleString()}*`;
        const encodedText = encodeURIComponent(text);
        return `https://wa.me/${branchPhone.replace("+", "")}?text=${encodedText}`;
    };

    return (
        <>
            {/* ... Floating Cart Button ... */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[80] bg-brand-red text-white p-8 rounded-full shadow-[0_20px_50px_rgba(235,33,46,0.3)] flex items-center gap-4 border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative">
                    <ShoppingBag size={32} />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-brand-red w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
                            {items.length}
                        </span>
                    )}
                </div>
                <span className="font-black uppercase tracking-widest text-sm hidden md:block">Корзина</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="fixed top-0 right-0 z-[120] h-full w-full max-w-md bg-zinc-950/95 backdrop-blur-3xl border-l border-white/5 shadow-2xl flex flex-col"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                                <hgroup>
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Твоя <span className="text-brand-red">корзина</span></h2>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-2">Приятного аппетита</p>
                                </hgroup>
                                <button onClick={() => setIsOpen(false)} className="p-3 text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                                            <ShoppingBag size={40} className="opacity-20 translate-y-[-2px]" />
                                        </div>
                                        <p className="font-black uppercase tracking-[0.4em] text-[10px] text-zinc-500">Пока пусто</p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.cartId} className="group/cart-item relative bg-white/5 rounded-3xl p-6 flex justify-between items-center border border-white/5 hover:border-brand-red/20 transition-all">
                                            <div className="flex-1">
                                                <h4 className="font-black text-xl mb-1 leading-tight uppercase italic">{item.name}</h4>
                                                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-4 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-brand-red" />
                                                    {item.selectedModifiers.join(" • ") || "Классический вкус"}
                                                </p>
                                                <span className="text-brand-red font-black text-xl tracking-tighter">₸{item.price.toLocaleString()}</span>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.cartId)}
                                                className="p-4 text-zinc-600 hover:text-brand-red hover:bg-brand-red/10 rounded-2xl transition-all"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {items.length > 0 && (
                                <div className="p-8 bg-black/60 border-t border-white/5 space-y-8 pb-12">
                                    {/* Order Type */}
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Как подать?</span>
                                        <div className="grid grid-cols-2 gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                                            <button
                                                onClick={() => setOrderType("here")}
                                                className={`py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${orderType === "here" ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"
                                                    }`}
                                            >
                                                В зале
                                            </button>
                                            <button
                                                onClick={() => setOrderType("takeaway")}
                                                className={`py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${orderType === "takeaway" ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"
                                                    }`}
                                            >
                                                На вынос
                                            </button>
                                        </div>
                                    </div>

                                    {/* Time Logic */}
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Когда приготовим?</span>
                                        <div className="grid grid-cols-2 gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                                            <button
                                                onClick={() => setTimeType("asap")}
                                                className={`py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${timeType === "asap" ? "bg-brand-red text-white shadow-lg shadow-brand-red/20" : "text-zinc-500 hover:text-white"
                                                    }`}
                                            >
                                                Ближайшее
                                            </button>
                                            <button
                                                onClick={() => setTimeType("scheduled")}
                                                className={`py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${timeType === "scheduled" ? "bg-brand-red text-white shadow-lg shadow-brand-red/20" : "text-zinc-500 hover:text-white"
                                                    }`}
                                            >
                                                Ко времени
                                            </button>
                                        </div>

                                        {timeType === "scheduled" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="relative group"
                                            >
                                                <Clock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${scheduledTime ? 'text-brand-red' : 'text-zinc-600'}`} size={18} />
                                                <input
                                                    type="time"
                                                    min={getMinTime()}
                                                    value={scheduledTime}
                                                    onChange={(e) => setScheduledTime(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-5 font-black focus:border-brand-red/50 transition-all outline-none text-sm text-white"
                                                />
                                                {!isTimeValid() && scheduledTime && (
                                                    <p className="text-[10px] text-brand-red font-bold uppercase mt-2 ml-1 animate-pulse">
                                                        Минимум 45 минут на подготовку
                                                    </p>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.3em]">К оплате</span>
                                            <span className="text-5xl font-black italic tracking-tighter">₸{total.toLocaleString()}</span>
                                        </div>

                                        <a
                                            href={isTimeValid() ? generateWhatsAppLink() : "#"}
                                            onClick={(e) => !isTimeValid() && e.preventDefault()}
                                            target="_blank"
                                            className={`w-full py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all flex items-center justify-center gap-3 group ${isTimeValid()
                                                ? "bg-white text-black hover:bg-brand-red hover:text-white"
                                                : "bg-zinc-900 text-zinc-700 cursor-not-allowed border border-white/5"
                                                }`}
                                        >
                                            {isTimeValid() ? "Подтвердить заказ" : "Выбери корректное время"}
                                            <Send size={18} className={isTimeValid() ? "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" : "opacity-20"} />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
