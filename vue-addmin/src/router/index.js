import Vue from 'vue'
import VueRouter from 'vue-router'
import Uploadvideo from './Uploadvideo';
import Playlistvideo from './PlaylistVideo';
import Video from './Video'
import Tag from './Tag'
import TagDetail from "@/router/TagDetail";
import VideoDetail from "@/router/VideoDetail";
import User from "@/router/User"
import UserDetail from "@/router/UserDetail"
import UserUpload from "@//router/UserUpload"
import Challenge from "@/router/Challenge";
import PlaylistDetail from "@/router/PlaylistDetail";
import CreatePlaylist from "@/router/CreatePlaylist";
import CreateChallenge from "@/router/CreateChallenge";
import ChallengeList from "@/router/ChallengeList";
import PlaylistPage from "@/router/PlaylistPage";
import VideoChallenge from "@/router/VideoChallenge";



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import( '../views/Login')
    },
    {
        path: '/app',
        component: () => import( '../views/Home'),
        children: [
            {
                path: '',
                component: () => import('../views/VideoView/index')
            },
            Tag,
            TagDetail,
            Uploadvideo,
            Playlistvideo,
            Video,
            VideoDetail,
            User,
            UserUpload,
            UserDetail,
            ChallengeList,
            PlaylistDetail,
            CreatePlaylist,
            CreateChallenge,
            Challenge,
            PlaylistPage,
            VideoChallenge,
        ]
    },


]

const router = new VueRouter({
    routes
})

export default router
