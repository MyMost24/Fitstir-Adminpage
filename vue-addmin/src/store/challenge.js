import axios from "@/plugins/axios"
import {
    get,
    make
} from "vuex-pathify"
import core from "@/store/core";
const CORE = core.actions
const state = {
    challengeLists: [],
    challengeChoose:{},

}
const getters = {


}
const mutations = make.mutations(state)

const actions = {
    getListChallenge: async function(){
        let challenge = await axios.get(`/api/challenges/`)
            .then((r) => {
                state.challengeLists = r.data;
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return challenge
    },
    async createChallenge(context, form){
        var formData = new FormData();
        formData.append("name",form.name);
        formData.append("image", form.image);
        formData.append("description", form.description);
        formData.append("user", form.user);
        return await CORE.post('/api/challenge/', formData)

    },
    async createVideoChallenge(context, form){
        var formData = new FormData();
        formData.append("title",form.title);
        formData.append("video",form.video);
        formData.append("image", form.image);
        formData.append("challenge", form.challenge);
        formData.append("user", form.user);
        return await CORE.post('/api/videochallenge/', formData)
    },
    async postVideoChallenge(context,params){
        let request = await axios.post('/backend/inchallenge/',params)
            .then((r)=>{
                return r.data;
            })
            .catch((e)=>{
                return e.response.data;
            })
        return request;
    },

    async getChallengeById(context, pk){
        let challenge = await axios.get(`/api/challenge/${pk}`)
            .then((r)=>{
                return r.data
            })
            .catch(async (e)=>{
                return false;
            });
        return challenge
    },

    async getInChallengeById(context, pk){
      let inchallenge = await axios.get(`/api/inchallenge/${pk}`)
          .then((r)=>{
              return r.data
          })
          .catch(async (e)=>{
             return false;
          });
      return inchallenge
    },


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}