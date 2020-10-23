export  default  {
    path : "upload",
    component : () => import('../views/UploadVideo/Template'),
    children : [
        {
            path : "index",
            name : "uploadvideo",
            component : () => import('../views/UploadVideo/index')
        },
    ]
}