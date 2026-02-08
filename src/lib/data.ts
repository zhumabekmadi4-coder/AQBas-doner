export type MenuItem = {
    id: string;
    name: string;
    price: number;
    category: "Doner" | "Burger" | "Snacks" | "Drinks";
    description?: string;
    image?: string;
    modifiers?: string[];
};

export const MENU_DATA: MenuItem[] = [
    // Doner - Chicken
    { id: "d1", name: "Куриный 100г", price: 2390, category: "Doner", modifiers: ["Лук", "Огурцы", "Соус"] },
    { id: "d2", name: "Куриный 135г", price: 2890, category: "Doner" },
    { id: "d3", name: "Сырный 100г", price: 3190, category: "Doner" },
    { id: "d4", name: "Сырный 135г", price: 3890, category: "Doner" },

    // Doner - Meat
    { id: "dm1", name: "Мраморная говядина 100г", price: 3390, category: "Doner" },
    { id: "dm2", name: "Мраморная говядина 135г", price: 4190, category: "Doner" },

    // Doner - Assorti
    { id: "da1", name: "Ассорти 50/50", price: 3190, category: "Doner" },
    { id: "da2", name: "Ассорти 75/75", price: 3890, category: "Doner" },

    // Burgers
    { id: "b1", name: "Aqbas Фирменный", price: 4790, category: "Burger" },
    { id: "b2", name: "С Вишней (Классика)", price: 4690, category: "Burger" },
    { id: "b3", name: "Бургер с трюфелем", price: 4790, category: "Burger" },
    { id: "b4", name: "Детский", price: 2890, category: "Burger" },
    { id: "b5", name: "Rock that meat", price: 2490, category: "Burger" },
    { id: "b6", name: "Rock that chicken", price: 2290, category: "Burger" },

    // Snacks
    { id: "s1", name: "Картошка Фри", price: 1200, category: "Snacks" },
    { id: "s2", name: "Батат Фри", price: 1800, category: "Snacks" },
    { id: "s3", name: "Жареный Халапеньо", price: 1000, category: "Snacks" },
    { id: "s4", name: "Дерзкий Халапеньо", price: 300, category: "Snacks" },

    // Drinks
    { id: "dr1", name: "Coca-Cola/Fanta/Sprite", price: 700, category: "Drinks" },
    { id: "dr2", name: "Айран", price: 550, category: "Drinks" },
    { id: "dr3", name: "Морс/Компот", price: 800, category: "Drinks" },
];
