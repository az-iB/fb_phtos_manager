require.config({
    baseUrl: "js",
    paths: {
        'vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.7/vue',
        'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.1.1/vue-router.min',
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min'
    },
    shim: {
        vue: {
            exports: 'Vue'
        },
        vue_router: {
            exports: 'VueRouter'
        },
        axios: {
            exports: 'axios'
        }
    }
});

require(['app']);