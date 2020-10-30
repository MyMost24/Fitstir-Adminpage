export  default  {
    path : "tagdetail",
    component : () => import('../views/TagDetail/Template'),
    children : [
        {
            path : "index",
            name : "tagdetail",
            component : () => import('../views/TagDetail/index')
        },
    ]
}