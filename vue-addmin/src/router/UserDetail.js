export  default  {
    path : "userdetail",
    component : () => import('../views/UserDetail/Template'),
    children : [
        {
            path : "index",
            name : "userdetail",
            component : () => import('../views/UserDetail/index'),

        },
    ]
}