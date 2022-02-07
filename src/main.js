import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import Jazzicon from 'vue3-jazzicon/src/components'
import routes from './routes'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import utils from './utils'
import { ethers } from 'ethers'
import { constants } from '@bazarion/sdk'
import stores from './stores'
import config from './config'

const NETWORKS = constants.NETWORKS

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueClipboard)
Vue.component('jazzicon', Jazzicon)
const router = new VueRouter({
    mode: 'history',
    routes
})

stores.updateTokens()

router.beforeEach(async (to, from, next) => {
    let reqChainId = getMarketConfig().chainId
    let network = NETWORKS.find(n => (n.chainId === '0x' + reqChainId.toString(16))) || []
    let provider = {}
    Vue.prototype.provider = provider
    Vue.prototype.network = network
    Vue.prototype.chainId = reqChainId
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        let chainId = (await provider.getNetwork()).chainId
        if (reqChainId !== chainId) {
            provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0])
        }
    } else {
        provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0])
    }
    Vue.prototype.provider = provider
    Vue.prototype.network = network
    next()
})

const getProvider = async () => {
    let reqChainId = getMarketConfig().chainId || parseInt(Number(NETWORKS[0].chainId), 10)
    let network = NETWORKS.find(n => (n.chainId === '0x' + reqChainId.toString(16))) || []
    let provider = {}
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        let chainId = (await provider.getNetwork()).chainId
        if (reqChainId !== chainId) {
            provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0])
        }
    } else {
        provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0])
    }

    return provider
} 

const getMarketConfig = () => ({
    ft: config.ft,
    nft: config.nft,
    chainId: config.chainId
})

Vue.prototype.getProvider = getProvider
Vue.prototype.getMarketConfig = getMarketConfig
Vue.prototype.utils = utils
Vue.prototype.constants = constants

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
