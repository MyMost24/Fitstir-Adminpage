import axios from "@/plugins/axios"
import {
    make
} from "vuex-pathify"
import core from './core';
import error from "@/store/error";

const CORE = core.actions;

const state = {
    userLists :[],
    adminList:[],
    userChoose : {},
    userProfile :{}
}

const getters = {



}

const mutations = make.mutations(state)


const actions = {
   async storeToken(){
        axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access_token')}`;
    },
    //Login admin
    getUserToken: async function (context, params) {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('access_token')

        let data = await axios.post(`/rest-auth/login/`, params)
            .then((response) => {
                localStorage.setItem('access_token', response.data.key)
                axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access_token')}`;
                return response.data
            })
            .catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
            })
        console.log(data)
        return data
    },
    async logout(context) {
        return await axios.post(`/rest-auth/logout/`)
            .then((response) => {
                // console.log("response", response.data)
                delete axios.defaults.headers.common["Authorization"];
                localStorage.removeItem('access_token')
                return response.data
            })
            .catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
            })
    },

    async myProfile(context, params){
    let res =  await axios.get(`/rest-auth/user/`)
        .then((r) =>{
            context.commit('setUser', r.data)
            return r.data
        })
        .catch((e)=>{
            context.dispatch("error/serError", error.r.data, {root:true})
            return null;
        })
        state.userProfile = res
        return res
},

    async changePassword(context, params) {

        return await axios.post('/rest-auth/password/change/', params)
            .then((response) => {
                context.dispatch("success/setSuccess", response.data, {root: true})
                return response.data
            }).catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
            })
    },
    //Get User
    async getUserList(context, params){
        let user = await axios.get(`/api/user/`)
            .then((r) => {
                state.userLists = r.data;
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });

        return user;
    },
    //Get Admin
    async getAdminList(context, params){
        let admin = await axios.get(`/api/admin/`)
            .then((r) => {
                state.adminList = r.data;
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });

        return admin;
    },
    //Create User by admin
    async createUser(context, params){
        var formData = new FormData();
        formData.append("first_name", params.first_name);
        formData.append("last_name", params.last_name);
        formData.append("username", params.username);
        formData.append("password", params.password);
        formData.append("password_confirm", params.password_confirm);
        formData.append("email", params.email);
        return await CORE.post('/accounts/register/', formData)
    },
    //Add admin
    async changeToAdmin(context, params){
        var formData = new FormData();
        formData.append("user", params.user);
        return await CORE.post('/api/changetoadmin/', formData)
    },

    //Get User by id

    async getUserById(context, pk){
        let user = await axios.get(`/api/user/${pk}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return user;
    },
    //Update User By admin
    async UpdateUser(context, params){
        var formData = new FormData();
        formData.append('first_name',params.first_name)
        formData.append('last_name',params.last_name)
        formData.append('email',params.email)
        formData.append('is_staff',params.is_staff)
        return await CORE.put(`/api/user/${params.id}`, params, formData)

    },
    deleteUser: async function (context, pk) {
        let user = await axios.delete(`/api/user/${pk}`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return user;
    },




}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}