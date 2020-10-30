export  default  {
    path : "detail",
    component : () => import('../views/DetailVideo/Template'),
    children : [
        {
            path : "index",
            name : "detail",
            component : () => import('../views/DetailVideo/index')
        },
    ]
}