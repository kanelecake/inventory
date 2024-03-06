import {AxiosResponse} from "axios";

// Структуру данных "Перемещение оборудования"
export type Movement = {
    id: number,
    inventory_number:   string,
    item_name:          string,
    from:               string,
    to:                 string,
    moved_at:           number,
    user_id:            number,
    fullname:           string,
    status:             string,
    updated_at:         string,
    created_at:         string,
};

// Структура данных для создания перемещения
export type CreateMovementRequest = {
    inventory_number:   string,
    item_name:          string,
    from:               string,
    to:                 string,
    moved_at:           number,
};

// Позволяет убедиться, что необходимые методы иплементированы
export interface IMovementApi {
    create(data: CreateMovementRequest) : Promise<AxiosResponse<any, any>>,
    getList(offset: number) : Promise<AxiosResponse<any, any>>,
    updateStatus(status: number) : Promise<AxiosResponse<any, any>>
}