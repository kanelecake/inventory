// @ts-ignore
import {createStore} from "vuex";

import authModule from "@stores/modules/authModule.ts";
import movementModule from "@stores/modules/movementModule.ts";

export default createStore({
    modules: {
        authModule,
        movementModule,
    }
})