export  default  {
    path : "tag",
    component : () => import('../views/Tag/Template'),
    children : [
        {
            path : "index",
            name : "tag",
            component : () => import('../views/Tag/index')
        },
    ]
}