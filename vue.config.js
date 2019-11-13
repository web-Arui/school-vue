module.exports = {
    publicPath: './',
    configureWebpack: config => {

        // 用cdn方式引入
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'moment': 'moment',
    
        }

    },
}

