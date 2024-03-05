import * as axios from "axios";
import {Axios} from "axios";


export function login(username: string, password: string) : Promise<Axios> {
    return axios.post('/auth/login', {
        username: username,
        password: password,
    });
}

export function createTestUser() : Promise<Axios> {
    return axios.post('/auth/createTestUser');
}