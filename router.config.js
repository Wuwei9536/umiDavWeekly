module.exports = [
    // user
    // {
    //     path:'/login',
    //     component:'./src/layouts'
    // },
    // app
    {
        path: '/',
        component: '../layouts/index.js',
        routes: [
            {
                path: '/',
                exact: true,
                component: './index.js'
            },
            {
                path: '/edit',
                exact: true,
                component: './edit'
            },
            {
                path: '/info',
                exact: true,
                component: './info'
            }
        ]
    }
];
