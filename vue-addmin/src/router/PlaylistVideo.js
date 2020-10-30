export  default  {
    path : "playlists",
    component : () => import('../views/Playlist/Template'),
    children : [
        {
            path : "playlist",
            name : "videoplaylist",
            component : () => import('../views/Playlist/index')
        },
    ]
}