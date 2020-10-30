export  default  {
    path : "user",
    component : () => import('../views/UserView/Template'),
    children : [
        {
            path : "index",
            name : "userlist",
            component : () => import('../views/UserView/index'),

        },
    ]
}