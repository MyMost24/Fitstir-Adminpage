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
        let challenge = await axios.get(`/api/challenge/`)
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
        formData.append("video",form.video);
        formData.append("name",form.name);
        formData.append("image", form.image);
        formData.append("description", form.description);
        formData.append("user", form.user);
        return await CORE.post('/api/challenge/', formData)

    },
    async getChallengeById(context, pk){
      let challenge = await axios.get(`/api/inchallenge/${pk}`)
          .then((r)=>{
              return r.data
          })
          .catch(async (e)=>{
             return false;
          });
      return challenge
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}