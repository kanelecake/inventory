// Описывает структуру данных "Перемещения оборудования"
export type MovementModel = {
    "id": number,
    "inventory_number": string,
    "item_name": string,
    "from": string,
    "to": string,
    "moved_at": number,
    "user_id": number,
    "updated_at": string,
    "created_at": string,
};

// Структура данных для создания перемещения
export type MovementCreateRequest = {
    inventory_number: string,
    item_name: string,
    from: string,
    to: string,
    moved_at: number,
};