export  default  {
    path : "playlistpage",
    component : () => import('../views/PlaylistPage/Template'),
    children : [
        {
            path : "index",
            name : "playlistpage",
            component : () => import('../views/PlaylistPage/index')
        },
    ]
}