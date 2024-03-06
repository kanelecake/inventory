import axios from "axios";
import {MovementCreateRequest} from "@api/types/movement";
import {API_URL} from "../../global.ts";

export function getList(offset: number) {
    return axios.get(`${API_URL}/api/movement/getList`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
            'count': 10,
            'offset': offset,
        }
    });
}

export function create(data: MovementCreateRequest) {
    return axios.post(`${API_URL}/api/movement/create`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

// status может принимать следующие значения
// 0 - рассмотрение
// 1 - принято
// 2 - отклонено
export function updateStatus(status: number) {
    return axios.patch(`${API_URL}/api/movement/status`, {
       status
    }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
}