export  default  {
    path : "challenge",
    component : () => import('../views/Challenge/Template'),
    children : [
        {
            path : "index",
            name : "challenge",
            component : () => import('../views/Challenge/index'),

        },
    ]
}