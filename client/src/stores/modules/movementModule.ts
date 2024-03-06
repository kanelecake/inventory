import {AxiosError} from "axios";

import api from "@api/index.ts";

import { InfiniteScrollDoneFn } from "@localTypes/vuetifyExtended.ts";
import { CreateMovementRequest, Movement } from "@api/types/movement";
import {
    MOVEMENT_CREATE,
    MOVEMENT_DATA,
    MOVEMENT_ERROR,
    MOVEMENT_GET_LIST,
    MOVEMENT_SUCCESS,
    MOVEMENT_UPDATE_STATUS,
} from "@stores/actions/movementActions.ts";

type MovementState = {
    status: string,
    error: string,
    movements: Movement[],
    newMovements: Movement[],
};

const state: MovementState = {
    status: "",
    error: "",
    movements: [],
    newMovements: [],
};

const getters = {
    getMovements: (state: MovementState) => state.movements as Movement[],
    getNewMovements: (state: MovementState) => state.newMovements as Movement[],
    isDataLoaded: (state: MovementState) => state.status != "loading",
    isError: (state: MovementState) => state.status == "error",
    getError: (state: MovementState) => state.error,
};

const actions = {
    // Создает новое перемещение оборудования
    [MOVEMENT_CREATE]: async ({ commit } : { commit: Function, dispatch?: Function }, data: CreateMovementRequest) => {
        commit(MOVEMENT_CREATE);
        await api.movement.create(data)
            .then((resp) => {
                commit(MOVEMENT_DATA, resp.data);
            })
            .catch(error => {
               commit(MOVEMENT_ERROR, error);
            });
    },
    // Получает список всех перемещений со смещением offset
    [MOVEMENT_GET_LIST]: async ({ commit } : { commit: Function, dispatch?: Function }, { offset, done } : { offset: number, done: InfiniteScrollDoneFn | undefined }) => {
        commit(MOVEMENT_GET_LIST);
        await api.movement.getList(offset)
            .then((resp) => {
                if (done !== undefined) {
                    if (resp.data.data.length > 0) {
                        done('ok');
                    } else {
                        done('empty');
                    }
                }
                commit(MOVEMENT_DATA, resp.data);
            })
            .catch(error => {
                commit(MOVEMENT_ERROR, error);

            });
    },
    // Обновляет статус перемещения
    [MOVEMENT_UPDATE_STATUS]: async ({ commit } : { commit: Function, dispatch?: Function }, status: number) => {
        commit(MOVEMENT_GET_LIST);
        await api.movement.updateStatus(status)
            .then((resp) => {
                commit(MOVEMENT_SUCCESS, resp.data);
            })
            .catch(error => {
                commit(MOVEMENT_ERROR, error);
            });
    },
}

const mutations = {
    [MOVEMENT_CREATE]: (state: MovementState) => {
        state.status = 'loading';
    },
    [MOVEMENT_GET_LIST]: (state: MovementState) => {
        state.status = 'loading';
    },
    [MOVEMENT_SUCCESS]: (state: MovementState) => {
        state.status = "success";
    },
    [MOVEMENT_DATA]: (state: MovementState, resp: unknown) => {
        state.status = "success";

        // Проверяем, является ли ответ сервера массивом.
        // Если является то разворачиваем его и добавляем в общую базу
        if (Array.isArray((resp as { data: Movement | Movement[] }).data)) {
            state.movements.push(...(resp as { data: Movement[] }).data);
        } else {
            state.movements.push((resp as { data: Movement }).data);
        }
    },
    [MOVEMENT_ERROR]: (state: MovementState, error: AxiosError) => {
        state.status = "error";
        state.error = error.response!.status.toString();
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}