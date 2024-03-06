import api from "@api/index.ts";
import {AUTH_CREATE_TEST_USER, AUTH_ERROR, AUTH_LOGIN, AUTH_SUCCESS} from "@stores/actions/auth.ts";

import {AuthRequest, AuthResponse} from "@api/types/auth";
import axios from "axios";

type AuthState = {
    token: string,
    status: string,
    hasLoadedOnce: boolean,
};

const state: AuthState = {
    token: localStorage.getItem('token') || "",
    status: "",
    hasLoadedOnce: false,
};

const getters = {
    isAuthenticated: (state: AuthState) => !!state.token,
    authStatus: (state: AuthState) => state.status
};

const actions = {
    // Запрос на авторизацию
    [AUTH_LOGIN]: ({ commit } : { commit: Function, dispatch?: Function }, user: AuthRequest) => {
        console.log(user);
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGIN);
            api.auth.login(user.username, user.password)
                .then(resp => {
                    const token = (resp.data as AuthResponse).token;
                    localStorage.setItem("token", token);
                    commit(AUTH_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("token");
                    reject(err);
                });
        });
    },
    // Запрос на создание тестового аккаунта
    [AUTH_CREATE_TEST_USER]: ({ commit } : { commit: Function, dispatch?: Function }) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGIN);
            api.auth.createTestAccount()
                .then((resp) => {
                    const token = (resp.data as AuthResponse).token;
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common['Authorization'] = token;
                    commit(AUTH_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("token");
                    reject(err);
                });
        });
    },
};

const mutations = {
    [AUTH_LOGIN]: (state: AuthState) => {
        state.status = "loading";
    },
    [AUTH_CREATE_TEST_USER]: (state: AuthState) => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state: AuthState, resp: AuthResponse) => {
        state.status = "success";
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: (state: AuthState) => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
}