// @ts-ignore
import {createStore} from "vuex";

import authModule from "@stores/modules/auth.module.ts";
import movementModule from "@stores/modules/movement.module.ts";

export default createStore({
    modules: {
        authModule,
        movementModule,
    }
})