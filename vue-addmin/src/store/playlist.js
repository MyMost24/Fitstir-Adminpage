import axios from "@/plugins/axios"
import {
    get,
    make
} from "vuex-pathify"
import core from "@/store/core";

const CORE = core.actions

const state = {
    playLists : [],
    playListChoose: {},
    videoplaylist: [],

}
const getters = {


}
const mutations = make.mutations(state)

const actions = {
    //get admin playlist
    async getPlaylist(){
        let playlist = await axios.get(`/api/adminplaylist/`)
            .then((r) => {
                state.playLists = r.data;
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return playlist
    },
    async getPlaylistById(context, pk){
        let playlist = await axios.get(`/api/playlist/${pk}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return playlist;
    },
    async getVideoPlaylist(context,id){
        let request = await axios.get('/backend/videoplaylist/'+id)
            .then((r)=>{
                return r.data;
            })
            .catch((e)=>{
                return e.response.data;
            })
        return request;
    },

    //Create Playlist
    async createPlaylist(context, form){
        var formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append("image", form.image);
        formData.append("user", form.user)
        return await CORE.post('/api/playlist/', formData)
    },
    async updatePlaylist(context, params){
        console.log(params)
        var formData = new FormData();
        if (typeof (params.image) === 'object') {
            formData.append('image', params.image)
        }
        formData.append('name', params.name);
        formData.append('description', params.description);
        return await  CORE.put(`/api/playlist/${params.id}`, formData)
    },
    //Delete playlist
    async deletePlaylist(context, pk){
        let playlist = await CORE.delete(`/api/playlist/${pk}`)
        return playlist;
    },

    async postVideoPlaylist(context,params){
        let request = await CORE.post('/backend/videoplaylist/',params)

        return request;
    },
    async deleteVideoPlaylist(context,id){
        let request = await CORE.delete(`/backend/videoplaylist/${id}`)

        return request;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}