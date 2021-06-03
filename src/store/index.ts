import {ActionTree, createStore, GetterTree, MutationTree} from "vuex";
import axios, {AxiosResponse} from "axios";

export interface State {
    
};

const myState: State = {}

const myMutations: MutationTree<State> = {}

const myActions: ActionTree<State, State> = {}

const myGetters: GetterTree<State, State> = {}

export default createStore({
    state: myState,
    mutations: myMutations,
    actions: myActions,
    getters: myGetters,
    modules: {}
});