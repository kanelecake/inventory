import {MovementCreateRequest, MovementModel} from "@api/types/movement";
import {
    MOVEMENT_CREATE,
    MOVEMENT_DATA,
    MOVEMENT_ERROR,
    MOVEMENT_GET_LIST,
    MOVEMENT_SUCCESS,
    MOVEMENT_UPDATE_STATUS,
} from "@stores/actions/movements.ts";
import api from "@api/index.ts";
import {InfiniteScrollDoneFn} from "@types/vuetifyExtended";

type MovementState = {
    status: string,
    movements: MovementModel[],
    newMovements: MovementModel[],
};

const state: MovementState = {
    status: "",
    movements: [],
    newMovements: [],
};

const getters = {
    getMovements: (state: MovementState) => state.movements as MovementModel[],
    getNewMovements: (state: MovementState) => state.newMovements as MovementModel[],
    isDataLoaded: (state: MovementState) => state.status != "loading",
    isError: (state: MovementState) => {
        console.log(state.status);
        return state.status == "error"
    },
}

const actions = {
    // Создает новое перемещение оборудования
    [MOVEMENT_CREATE]: async ({ commit } : { commit: Function, dispatch?: Function }, data: MovementCreateRequest) => {
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
                        console.log('ok');
                        done('ok');
                    } else {
                        console.log('empty');
                        done('empty');
                    }
                    console.log('ok');
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
        if (Array.isArray((resp as { data: MovementModel | MovementModel[] }).data)) {
            state.movements.push(...(resp as { data: MovementModel[] }).data);
        } else {
            state.movements.push((resp as { data: MovementModel }).data);
        }
    },
    [MOVEMENT_ERROR]: (state: MovementState, error: Error) => {
        console.log(error);
        state.status = "error";
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}