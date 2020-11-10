export  default  {
    path : "videochallenge",
    component : () => import('../views/VideoChallengeView/Template'),
    children : [
        {
            path : "index",
            name : "videochallenge",
            component : () => import('../views/VideoChallengeView/index')
        },
    ]
}