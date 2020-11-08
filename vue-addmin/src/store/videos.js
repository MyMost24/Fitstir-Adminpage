import axios from "@/plugins/axios"
import {
    get,
    make,
    dispatch
} from "vuex-pathify"
import core from './core';

const CORE = core.actions;
const state = {
    rr: null,
    videoLists: [],
    videoChoose: {},

}
const getters = {

}
const mutations = make.mutations(state)

const actions = {


    async saveVideo(context, form) {
        var formData = new FormData();
        formData.append("video", form.video);
        formData.append("name", form.name);
        formData.append("image", form.image);
        formData.append("description", form.description);
        formData.append("tag_type", form.tag_type);
        return await CORE.post('/api/video', formData);
    },

    async updateVideo(context, params) {
        var formData = new FormData();
        formData.append("name", params.name);
        if (typeof (params.image) ===  'object') {
            formData.append('image', params.image)
        }
        formData.append("description", params.description);
        formData.append("tag_type", params.tag_type);
        let video = await axios.put(`/api/video/${params.id}`, formData)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return video;
    },
    getVideoData: async function (context, pk) {
        let video = await axios.get(`/api/video/${pk}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return video;
    },


    getListVideo: async function (context, params) {
        let video = await axios.get(`/api/videos/`)
            .then((r) => {
                state.videoLists = r.data;
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });

        return video;
    },
    deleteVideo: async function (context, pk) {
        let video = await axios.delete(`/api/video/${pk}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return video;
    },


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}