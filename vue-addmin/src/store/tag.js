import axios from "@/plugins/axios"
import {
    get,
    make,
    dispatch
} from "vuex-pathify"
import core from './core';

const CORE = core.actions;


const state = {
    tagLists: [],
    tagDetailList:[],
}
const getters = {}
const mutations = make.mutations(state)

const actions = {
    getTagList: async function (context, params) {
        let tags = await axios.get(`/api/tag/`)
            .then((r) => {
                state.tagLists = r.data;
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tags;
    },
    getTagDataById: async function (context, id) {
        let tag = await axios.get(`/api/tag/${id}`)
            .then((r) => {
                state.tagDetailList = r.data
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tag;
    },

    // TAG

    async storeTag(context, params) {
        return await CORE.post(`/api/tag/`, params);
    },

    async updateTag(context, params) {
        let tag = await axios
            .put(`backend/tag/${params.id}/`, params)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tag;
    },

    deleteTag: async function (context, id) {
        let tag = await axios.delete(`/api/tag/${id}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tag;
    },
    //TAG DETAIL
    storeTagdetail: async function(context, params) {
        let tagdetail = await axios
            .post(`backend/tagdetail/`, params)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tagdetail;
    },
    updateTagdetail : async function(context, params){
        let tagdetails = await axios
            .put(`backend/tagdetail/${params.id}/`, params)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tagdetails;
    },

    deleteTagDetail: async function(context, id) {
        let tagdetail = await axios.delete(`/api/tagdetail/${id}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tagdetail;
    },



}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}