export  default  {
    path : "playlist",
    component : () => import('../views/Playlist/Template'),
    children : [
        {
            path : "index",
            name : "playlistvideo",
            component : () => import('../views/Playlist/index')
        },
    ]
}