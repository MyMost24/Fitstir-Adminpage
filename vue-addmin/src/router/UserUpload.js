export  default  {
    path : "createuser",
    component : () => import('../views/CreateUser/Template'),
    children : [
        {
            path : "index",
            name : "createuser",
            component : () => import('../views/CreateUser/index'),

        },
    ]
}