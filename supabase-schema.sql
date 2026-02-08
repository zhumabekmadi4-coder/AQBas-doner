-- Таблица категорий
create table categories (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    display_order int default 0,
    created_at timestamp with time zone default now()
);
-- Таблица блюд
create table menu_items (
    id uuid default gen_random_uuid() primary key,
    category_id uuid references categories(id) on delete cascade,
    name text not null,
    description text,
    price decimal not null,
    image_url text,
    modifiers jsonb default '[]',
    -- Список ингредиентов ["Лук", "Огурцы"]
    available_days int [] default '{0,1,2,3,4,5,6}',
    -- 0=Вс, 1=Пн и т.д.
    is_active boolean default true,
    created_at timestamp with time zone default now()
);
-- Тестовые данные
insert into categories (name, display_order)
values ('Донер', 1),
    ('Бургер', 2),
    ('Закуски', 3),
    ('Напитки', 4);
-- Пример наполнения (нужно получить category_id)
-- insert into menu_items (category_id, name, price) values ('id_донера', 'Куриный 100г', 2390);