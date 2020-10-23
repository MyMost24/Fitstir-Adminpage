import axios from "@/plugins/axios"

import {
    make
} from "vuex-pathify"
const state = {
}
const getters = {


}
const mutations = make.mutations(state)

const actions = {
    async getTags(){
        let request = await axios.get('/api/tag/')
            .then((r) => {
                return r.data;
            }).catch((e) =>{
                return e.response.data;
            })
        console.log(request)
        return request
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}