import {AxiosResponse} from "axios";

/** Позволяет быть уверенным, что необходимые методы иплементированны **/
export interface IAuthApi {
    login(username: string, password: string) : Promise<AxiosResponse<any, any>>;
    createTestUser() : Promise<AxiosResponse<any, any>>;
}


export type SignInRequest = {
    username: string,
    password: string,
};

/**
 * Стандартная структура данных,
 * прислылаемая от API на запрос связанный с авторизацией
 **/
export type AuthResponse = {
    message: string,
    token:   string,
};