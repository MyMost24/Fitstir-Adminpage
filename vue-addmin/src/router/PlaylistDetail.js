export  default  {
    path : "playlistdetail",
    component : () => import('../views/PlaylistDetail/Template'),
    children : [
        {
            path : "index",
            name : "playlistdetail",
            component : () => import('../views/PlaylistDetail/index')
        },
    ]
}