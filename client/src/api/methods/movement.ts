import axios from "axios";

import {CreateMovementRequest, IMovementApi} from "@api/types/movement";
import { API_URL } from "@api/constants.ts";

function create(data: CreateMovementRequest) {
    return axios.post(`${API_URL}/movement/create`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

function getList(offset: number) {
    return axios.get(`${API_URL}/movement/getList`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
            'count': 10,
            'offset': offset,
        }
    });
}

// status может принимать следующие значения
// 0 - рассмотрение
// 1 - принято
// 2 - отклонено
function updateStatus(status: number) {
    if (!(status in [0, 1, 2]))
        throw new Error('Provided status is invalid');

    return axios.patch(`${API_URL}/movement/status`, {
           status
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
}

export default {
    create,
    getList,
    updateStatus,
} as IMovementApi;