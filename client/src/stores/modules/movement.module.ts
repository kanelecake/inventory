import {MovementCreateRequest, MovementModel} from "@api/types/movement";
import {
    MOVEMENT_CREATE,
    MOVEMENT_DATA,
    MOVEMENT_ERROR,
    MOVEMENT_GET_LIST,
    MOVEMENT_SUCCESS, MOVEMENT_UPDATE_STATUS
} from "@stores/actions/movements.ts";
import api from "@api/index.ts";

type MovementState = {
    status: string,
    movements: MovementModel[],
};

const state: MovementState = {
    status: "",
    movements: [],
};

const getters = {
    getMovements: (state: MovementState) => state.movements,
    isDataLoaded: (state: MovementState) => state.status != "loading",
}

const actions = {
    // Создает новое перемещение оборудования
    [MOVEMENT_CREATE]: ({ commit, dispatch } : { commit: Function, dispatch: Function }, data: MovementCreateRequest) => {
        commit(MOVEMENT_CREATE);
        api.movement.create(data)
            .then((resp) => {
                commit(MOVEMENT_DATA, resp);
            })
            .catch(error => {
               commit(MOVEMENT_ERROR, error);
            });
    },
    // Получает список всех перемещений со смещением offset
    [MOVEMENT_GET_LIST]: ({ commit, dispatch } : { commit: Function, dispatch: Function }, offset: number) => {
        commit(MOVEMENT_GET_LIST);
        api.movement.getList(offset)
            .then((resp) => {
                commit(MOVEMENT_DATA, resp);
            })
            .catch(error => {
                commit(MOVEMENT_ERROR, error);
            });
    },
    // Обновляет статус перемещения
    [MOVEMENT_UPDATE_STATUS]: ({ commit, dispatch } : { commit: Function, dispatch: Function }, status: number) => {
        commit(MOVEMENT_GET_LIST);
        api.movement.updateStatus(status)
            .then((resp) => {
                commit(MOVEMENT_SUCCESS, resp);
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
    [MOVEMENT_ERROR]: (state: MovementState) => {
        state.status = "error";
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}