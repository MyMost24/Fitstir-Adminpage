export  default  {
    path : "challengelist",
    component : () => import('../views/ChallengeList/Template'),
    children : [
        {
            path : "challengelist",
            name : "challengelist",
            component : () => import('../views/ChallengeList/index'),

        },
    ]
}