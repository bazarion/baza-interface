
import Detail from './components/Detail.vue'
import Market from './components/Market.vue'
import Docs from './components/Docs.vue'

const routes = [
    { path: '/', component: Market, name: 'market' },
    { path: '/docs', component: Docs, name: 'docs' },
    { 
        path: '/:id',
        name: 'detail',
        component: Detail
    }
]

export default routes
