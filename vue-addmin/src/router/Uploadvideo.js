export  default  {
    path : "upload",
    component : () => import('../views/Upload/Template'),
    children : [
        {
            path : "index",
            name : "uploadvideo",
            component : () => import('../views/Upload/index')
        },
    ]
}