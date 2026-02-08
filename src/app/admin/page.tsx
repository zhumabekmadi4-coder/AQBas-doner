"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Flame, Save, Plus, Trash2, LogOut, Camera, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { MENU_DATA, MenuItem } from "@/lib/data";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [menu, setMenu] = useState<MenuItem[]>(MENU_DATA);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "AQBas9988") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Неверный пароль");
        }
    };

    const handleImageUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            const newMenu = [...menu];
            newMenu[idx].image = previewUrl;
            setMenu(newMenu);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl"
                >
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-red/20">
                            <Lock className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Вход в <span className="text-brand-red">AQBAS</span></h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest mt-2">Панель администратора</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-6 text-xl text-center font-bold focus:border-brand-red outline-none transition-all"
                            />
                            {error && <p className="text-brand-red text-center mt-4 font-bold text-sm uppercase italic">{error}</p>}
                        </div>
                        <button className="w-full bg-brand-red text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                            Войти
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Управление <span className="text-brand-red">Меню</span></h1>
                        <p className="text-zinc-500 uppercase tracking-widest text-xs mt-1">Редактируй позиции, цены и загружай фото</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-colors font-bold uppercase text-xs">
                            <Plus size={18} /> Добавить блюдо
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="bg-brand-red/10 text-brand-red border border-brand-red/20 px-4 py-3 rounded-xl hover:bg-brand-red hover:text-white transition-all font-bold"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <div className="grid gap-4">
                    {menu.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-zinc-700 transition-all group"
                        >
                            {/* Image Upload Area */}
                            <div className="relative w-24 h-24 flex-shrink-0 group/img">
                                {item.image ? (
                                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-800">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-zinc-950 border border-dashed border-zinc-800 flex items-center justify-center cursor-pointer hover:border-brand-red transition-colors">
                                        <Camera size={24} className="text-zinc-700" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(idx, e)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-brand-red/20 text-brand-red px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter">
                                            {item.category}
                                        </span>
                                        <input
                                            className="bg-transparent text-xl font-bold outline-none focus:text-brand-red w-full"
                                            value={item.name}
                                            onChange={(e) => {
                                                const newMenu = [...menu];
                                                newMenu[idx].name = e.target.value;
                                                setMenu(newMenu);
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-600 uppercase tracking-tighter">ID: {item.id}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₸</span>
                                    <input
                                        type="number"
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-7 pr-3 w-32 font-bold outline-none focus:border-brand-red"
                                        value={item.price}
                                        onChange={(e) => {
                                            const newMenu = [...menu];
                                            newMenu[idx].price = parseInt(e.target.value) || 0;
                                            setMenu(newMenu);
                                        }}
                                    />
                                </div>
                                <button className="p-3 text-zinc-500 hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="fixed bottom-10 right-10 flex gap-4">
                    <button
                        className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        onClick={() => alert("Сохранено (в реальности тут пойдет запрос в Supabase)")}
                    >
                        Сохранить изменения <Save size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
