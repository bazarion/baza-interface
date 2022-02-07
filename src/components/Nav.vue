<template>
    <div class="navbar-wrap nav-mobile">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand :href="`/`">
                <b-img :src="require('../assets/images/logo.svg')"></b-img>
            </b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="w-nav multi-network" right>
                        <b-card-img class="mr-1" style="width: 22px;" :src="logoURI || require('../assets/images/nologo.svg')" alt="Image"></b-card-img>
                        <span class="network-name">{{ networkName }}</span>
                    </b-nav-item>
                    <b-nav-item class="w-nav native-balance" right v-if="!isConnect && account">                        
                        {{ utils.bigToCommon(balance, 18) }} {{ symbol }}
                    </b-nav-item>
                    
                    <b-nav-item class="w-nav address" right v-if="!isConnect && account">
                        <jazzicon
                            :address="account"
                            :diameter="20"
                            class="w-icon"
                            />
                       {{ utils.truncate(account, 11) }}
                    </b-nav-item>
                    <b-nav-item-dropdown right v-if="!isConnect && account" class="nav-more w-nav">
                        <template #text>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="sc-hqyNC gQPoVR"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </template>
                        <b-dropdown-item :href="`/docs`">
                            Document
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-button v-if="isConnect" size="sm" class="w-button btn-wallet-connect" @click="connect()" right>
                        <svg width="18" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V6ZM1 0H16V4H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM13 11V13H16V11H13Z" fill="#fff"/>
                        </svg>
                        Connect to a wallet
                    </b-button>
                </b-navbar-nav>
            <!-- </b-collapse> -->
        </b-navbar>
        <b-toast id="invalid-network" variant="danger" solid no-auto-hide>
            <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                    <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                    <strong class="mr-auto">Invalid network</strong>
                </div>
            </template>
            Required to switch Metamask to <span style="cursor: pointer" @click="connect()"><b>{{ chainName }}</b></span>
        </b-toast>
        <b-toast id="required-metamask" variant="warning" solid>
            <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                    <strong class="mr-auto">Metamask</strong>
                </div>
            </template>
            You have to install <b-link href="https://metamask.io/" target="_blank"><b>Metamask Extension</b></b-link>
        </b-toast>
    </div>
</template>
<script>

import { ethers } from 'ethers'
import { constants } from '@bazarion/sdk'
import EventBus from '../eventBus'

const NETWORKS = constants.NETWORKS

export default {
    data: () => ({
        chainName: NETWORKS[0].chainName,
        networks: NETWORKS.filter(n => (n.isSupported)),
        account: '',
        networkName: '',
        symbol: '',
        balance: ethers.BigNumber.from(0),
        isConnect: false,
        logoURI: ''
    }),
    created: async function () {
        EventBus.$on('connect', () => this.connect())
        let provider = (window.ethereum)
            ? new ethers.providers.Web3Provider(window.ethereum, 'any') : this.provider
        this.isConnect = (provider.connection.url !== 'metamask')
        if (provider && typeof provider.getSigner === 'function') {
            this.chainName = this.network.chainName
            let self = this
            provider.getSigner().getAddress().then(async account => {
                self.account = account
                self.isConnect = self.isConnect || false
                self.balance = (await provider.getSigner().getBalance())
                let chainId = (await provider.getNetwork()).chainId
                const network = NETWORKS.find(n => (n.chainId === '0x' + chainId.toString(16)))

                if (!network
                    || !network.isSupported || chainId !== self.chainId) {
                    self.$bvToast.show('invalid-network')
                }

                self.networkName = (network) ? network.chainName : 'Unknown'
                self.logoURI = (network) ? network.logoURI : ''
                self.symbol = (network) ? network.nativeCurrency.symbol : ''

            }).catch(() => {
                self.isConnect = true
            })

        } else {
            this.$bvToast.show('invalid-network')
        }
    },
    methods: {
        async connect () {
            if (!window.ethereum) {
                this.$bvToast.show('required-metamask')
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
            let network = NETWORKS.find(n => (n.chainId === '0x' + this.chainId.toString(16)))
            network = network || NETWORKS[0]
            await provider.send(
                'wallet_addEthereumChain', [ {
                    chainId: network.chainId,
                    chainName: network.chainName,
                    nativeCurrency: network.nativeCurrency,
                    rpcUrls: network.rpcUrls
                } ]
            )
            await provider.send('eth_requestAccounts', [])
            this.$bvToast.hide('invalid-network')
            EventBus.$off('connect')
        },
        async switchNetwork (chainId) {
            if (!window.ethereum) {
                this.$bvToast.show('required-metamask')
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
            let network = NETWORKS.find(n => (n.chainId === '0x' + chainId.toString(16)))
            network = network || NETWORKS[0]
            await provider.send(
                'wallet_addEthereumChain', [ {
                    chainId: network.chainId,
                    chainName: network.chainName,
                    nativeCurrency: network.nativeCurrency,
                    rpcUrls: network.rpcUrls
                } ]
            )
            await provider.send('eth_requestAccounts', [])
            this.$router.push(`/${chainId}`)
        }        
    }
}
</script>
<style lang="scss">    
    .dropdown.nav-more{
        padding-left: 3px;
        padding-right: 3px;
        .nav-link{
            width: 36px;
            overflow: hidden;            
        }
        .dropdown-menu{
            min-width: 200px;
            padding: 0;
            border-radius: 8px;
            box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
            border: 1px solid rgb(255, 255, 255);
            .dropdown-item{
                padding: 10px 16px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .multi-network{               
        .chain-logo{
            max-width: 22px;
            margin-right: 3px;
        }
        .dropdown-menu{
            padding: 0;
            border-radius: 8px; 
            box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
            border: 1px solid rgb(255, 255, 255);
            width: 214px;
            overflow: hidden;
        }
        .active{
            .dropdown-item{
                background-color: #e9ecef;
                position: relative;
                &::after{
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-radius: 5px;
//                    background-color: #0fbc85;
                    display: inline-block;
                    position: absolute;
                    right: 8px;
                    top: 15px;
                }
            }
        }
        .dropdown-item{
            padding: 8px;     
        }

    }    
    .w-button, .w-nav{
        background-color: #fff;
        color: #212529;
        border-color: white;
        border-radius: 8px;
        margin-left: 15px;
        &:hover{
            background-color: #f6f6f6;
            color: inherit;
        }        
    }
    .w-button.btn-wallet-connect{
        background: #DE350B;
        padding-top:10px;
        padding-bottom: 10px;
        border: none;
        border-radius: 8px;
        color: #fff;
        &:hover{
            background-color: #e53b11;
        }
        &:focus{
            box-shadow: none;
            background-color: #e53b11;
        }
    }
    .w-nav{
        &.address{
            .nav-link{
                display:flex;
                align-items: center;
            }
            .w-icon{
                display: flex;
                margin-right: 5px;
            }    
        }
        em{
            color: #091E42!important;
        }
        a{
            color: #091E42!important;
            &:focus-visible{
                border: none;
                outline: none;
            }
        }
    }
    #dropdown-chains{
        color: #091E42!important;
    }
    @media(max-width: 991px){
        .nav-mobile{
            .navbar-nav{
                flex-direction: row;
                .dropdown-menu{
                    position: absolute;
                }
                .nav-link{
                    padding-left: 8px;
                    padding-right: 8px;
                }
            }
            .network-name{
                display: none;
            }
        }
    }
    @media(max-width: 580px){
        .nav-mobile{
            .navbar-nav{
                .native-balance{
                    display: none;
                }
            }
        }
        .multi-network{
            .dropdown-menu{
                &.dropdown-menu-right{
                    left: 0;
                    right: auto;
                }
            }
        }
    }
</style>
