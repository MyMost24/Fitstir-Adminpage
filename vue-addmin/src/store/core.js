import axios from "@/plugins/axios" 
import {
    get,
    make
} from "vuex-pathify"
const state = {
    
}
const getters = {


}
const mutations = make.mutations(state)

const actions = {
     
    async get(url){
        return await axios.get(url).then((r)=>{r.data}).catch((e)=>{r.response.data});
    },
    async post(url,form){
        return await axios.post(url,form).then((r)=>{r.data}).catch((e)=>{r.response.data});
    },
    async put(url,form){
        return await axios.put(url,form).then((r)=>{r.data}).catch((e)=>{r.response.data});
    },
    async delete(url){
        return await axios.delete(url).then((r)=>{r.data}).catch((e)=>{r.response.data});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}