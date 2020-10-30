export  default  {
    path : "createplaylist",
    component : () => import('../views/CreatePlaylist/Template'),
    children : [
        {
            path : "index",
            name : "createplaylist",
            component : () => import('../views/CreatePlaylist/index')
        },
    ]
}