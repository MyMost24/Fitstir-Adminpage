import axios from "@/plugins/axios" 
import {
    get,
    make
} from "vuex-pathify"
import core from './core'; 
const CORE = core.actions;
const state = {
    rr:null
}
const getters = {


}
const mutations = make.mutations(state)

const actions = {
    async storeVideo(context,form){
        var formData = new FormData();
        formData.append("video", form.video);
        formData.append("name", form.name);
        formData.append("image", form.image);
        formData.append("description", form.description);
        formData.append("tag_type", form.tag_type);
        return await CORE.post('/api/video',formData);
    },
    async getVideos(){
        let request = await axios.get('/api/videos/')
            .then((r)=>{
                return r.data;
            }).catch((e)=>{
                return e.response.data;
            })
        console.log(request)
        return request
    },
    async saveVideo(){
        let data = await axios.post('/api/video')
            .then(function (response){
                return response.data
            }).catch(function (error){
                console.log(error)
            })
        console.log(data)
        return data
    }


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}