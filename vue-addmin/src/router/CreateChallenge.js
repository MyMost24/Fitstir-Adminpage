export  default  {
    path : "createchallenge",
    component : () => import('../views/CreateChallenge/Template'),
    children : [
        {
            path : "index",
            name : "createchallenge",
            component : () => import('../views/CreateChallenge/index'),

        },
    ]
}