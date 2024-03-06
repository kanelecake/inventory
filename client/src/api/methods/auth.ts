import axios from "axios";
import { API_URL } from "@api/constants.ts";
import {IAuthApi} from "@api/types/auth";

function login(username: string, password: string) {
    return axios.post(`${API_URL}/auth/login`, { username, password });
}

function createTestUser() {
    return axios.post(`${API_URL}/auth/createTestUser`, null);
}

export default {
    login, createTestUser
} as IAuthApi;