import { createTestAccount, login } from "@api/methods/auth.ts";
import {create, getList, updateStatus} from "@api/methods/movement.ts";

export default {
    auth: { login, createTestAccount },
    movement: { create, getList, updateStatus }
}