import axios from "@/plugins/axios"

import {
    get,
    make
} from "vuex-pathify"
import core from "@/store/core";
const CORE = core.actions;


const state = {

}
const getters = {

}
const mutations = make.mutations(state)

const actions = {
    async getPlaylist(){
        return await CORE.get()
    }


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}