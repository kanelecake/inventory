import axios from "axios";

export function login(username: string, password: string) {
    return axios.post('http://localhost/api/auth/login', { username, password });
}

export function createTestAccount() {
    return axios.post('http://localhost/api/auth/createTestAccount', null);
}