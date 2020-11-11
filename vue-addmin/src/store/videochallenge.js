import axios from "@/plugins/axios"
import {
    get,
    make
} from "vuex-pathify"

import core from "@/store/core";

const CORE = core.actions

const state = {
    videochallenge: [],

}
const getters = {}
const mutations = make.mutations(state)

const actions = {
    async getVideoChallengeById(context, id) {
        let request = await CORE.get(`/backend/invideochallenge/${id}`)

        return request;
    },
    async getVideoChallenge(context, params) {
        let request = await CORE.get('/backend/invideochallenge/', params)

        return request;
    },
    async getVideoUpdate(context, id) {
        let request = await CORE.get(`/backend/videochallenge/${id}`)
        return request
    },
    async editVideoChallenge(context, params) {
        let request = await CORE.put(`/backend/videochallenge/${params.id}`, params)

        return request;
    },
    async storeComment(context, params) {
        let request = await CORE.post('/backend/comment/', params)
        return request;
    },
    async postComment(context, params) {
        let request = await CORE.post('/backend/invideochallenge/', params)
        return request;
    },
    async deleteCommentById(context, id) {
        let request = await CORE.delete(`/api/invideochallenge/${id}`)
        return request

    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}