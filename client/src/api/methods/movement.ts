import axios from "axios";
import {MovementCreateRequest} from "@api/types/movement";

export function getList(offset: number) {
    return axios.get('http://localhost/api/movement/getList', {
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
    return axios.post('http://localhost/api/movement/create', data, {
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
    return axios.patch('http://localhost/api/movement/status', {
       status
    }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
}