module.exports = [
    // user
    {
        path: '/login',
        exact: true,
        component: './login'
    },
    // app
    {
        path: '/',
        component: '../layouts/index.js',
        Routes:['./src/pages/Authorized.js'],
        authority:['wien'],
        routes: [
            {
                path: '/',
                exact: true,
                // redirect:'/weekly',
                component: './weekly'
            },
            {
                path: '/okr',
                exact: true,
                component: './okr'
            },
            {
                path: '/edit',
                exact: true,
                component: './edit'
            },
            {
                path: '/okrEdit',
                exact: true,
                component: './okrEdit'
            },
            {
                path: '/info',
                exact: true,
                component: './info'
            },
            {
                path:'/staff',
                exact:true,
                component:'./staff'
            },
            {
                path:'/attention',
                exact:true,
                component:'./attention'
            }
        ]
    }
];
