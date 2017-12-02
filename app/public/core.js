require.config({
    baseUrl: "js",
    paths: {
        'vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.7/vue.min',
        'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.1.1/vue-router.min'
    },
    shim: {
        vue: {
            exports: 'Vue'
        },
        vue_router: {
            exports: 'VueRouter'
        }
    }
});

require(['app']);