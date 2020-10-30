export  default  {
    path : "video",
    component : () => import('../views/VideoView/Template'),
    children : [
        {
            path : "listvideo",
            name : "listvideo",
            component : () => import('../views/VideoView/index'),

        },
    ]
}