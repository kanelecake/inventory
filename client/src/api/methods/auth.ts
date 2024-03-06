import axios from "axios";
import {API_URL} from "../../global.ts";

export function login(username: string, password: string) {
    return axios.post(`${API_URL}/api/auth/login`, { username, password });
}

export function createTestAccount() {
    return axios.post(`${API_URL}/api/auth/createTestUser`, null);
}