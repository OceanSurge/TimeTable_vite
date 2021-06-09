import {ActionTree, createStore, GetterTree, MutationTree} from "vuex";
import axios, {AxiosResponse} from "axios";
import {queryInfo, User} from "../datasource";
import * as vxt from "./VuexTypes";

export interface State {
    LoginUser?: User;
    TeacherId?: number;
};

const myState: State = {
    LoginUser: JSON.parse(sessionStorage.getItem("LoginUser") as string) as User || {},
    TeacherId: JSON.parse(sessionStorage.getItem("TeacherId") as string) as number || 0,
}

const myMutations: MutationTree<State> = {
    [vxt.UPDATE_LoginUser]: (state, data: User) => {
        state.LoginUser = data;
        sessionStorage.setItem("LoginUser", JSON.stringify(data as User))
    },
    [vxt.UPDATE_TeacherId]: (state, data: number) => {
        state.TeacherId = data;
        sessionStorage.setItem("TeacherId", JSON.stringify(data))
    },
}

const myActions: ActionTree<State, State> = {}

const myGetters: GetterTree<State, State> = {}

export default createStore({
    state: myState,
    mutations: myMutations,
    actions: myActions,
    getters: myGetters,
    modules: {}
});