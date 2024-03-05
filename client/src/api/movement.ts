import * as axios from "axios";
import {Axios} from "axios";


export function createMovement(inventory_number: string, to: string, from: string, item_name: string) : Promise<Axios> {
    return axios.post('/movement/create', {
        inventory_number: inventory_number,
        to: to,
        from: from,
        item_name: item_name,
    }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
}

export function getMovements(offset: number, count: number) : Promise<Axios> {
    return axios.get('/movement/getList', null, {
        params: {
            offset: offset,
            count: count
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
}

// Status numbers: 0 - checking, 1 - accepted, 2 - reject
export function updateMovement(status: number) : Promise<Axios> {
    return axios.patch('/movement/status', {
        status: status,
    }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
}