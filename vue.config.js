const Mode = require('frontmatter-markdown-loader/mode')
module.exports = {
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        public: process.env.PUBLIC_URL,
        watchOptions: {
            ignored: [/node_modules/, '/public/images/'],
        }
    },
    chainWebpack: config => {
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('frontmatter-markdown-loader')
            .loader('frontmatter-markdown-loader')
            .tap(() => {
                return {
                    mode: [Mode.VUE_COMPONENT],
                    vue: {
                        root: 'markdown-body'
                    }
                }
            })
    }
}
