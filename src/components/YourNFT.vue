<template>
    <div class="account" v-if="account">
        <b-container>
            <div class="is-flex header-account">
                <h1 class="is-flex address mb-0">
                    <jazzicon
                        :address="marketAddress"
                        :diameter="30"
                        class="w-icon"
                    />
                    <span style="margin-left: 10px">{{ `${nftSymbol} - ${ftSymbol}` }}</span>
                </h1>
                <div class="action">
                    <span class="copy-address"
                        v-clipboard:copy="marketAddress"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    >   <span v-if="!isCopy">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg> Copy Address
                        </span>
                        <span v-if="isCopy">
                            <b-icon icon="check2"></b-icon> Copied
                        </span>
                    </span>
                    <b-link class="view-explorer" target="_blank" :href="utils.addressLink(chainId, marketAddress)"><b-icon icon="box-arrow-up-right"></b-icon> View Explorer</b-link>
                </div>
            </div>
            <div class="owner-nft mt-4">
                <b-tabs content-class="mt-4">
                    <b-tab :title="`NFTs (${iNFT})`" active>
                        <div class="no-item" v-if="!loading && nfts.length === 0">
                            <b-card-img class="nologo" :src="require('../assets/images/nologo.svg')" alt="Image"></b-card-img>
                            <b-card-text>Your NFTS will be shown here.</b-card-text>
                        </div>
                        <b-row class="is-multiline">
                            <b-col v-if="!loading && nfts.length > 0" class="is-flex">
                                <b-card v-for="(it, k) in nfts" :key="k" no-body class="nft-item">
                                    <router-link class="item-link" :to="`/${chainId}/market/${ftLink}/${nftAddress}/${it.tokenId}`">
                                        <b-card-img class="nft-image" :class="{ 'pixelated': isPixelated}" v-bind:src="it.image || `data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_17cb7089c7d text %7B fill:'%23DFE1E6';font-weight:bold;font-family:Poppins, monospace;font-size:50pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_17cb7089c7d'%3E%3Crect width='200' height='200' fill='%23EBECF0'%3E%3C/rect%3E%3Cg%3E%3Ctext x='44.421875' y='118.5' fill='%23DFE1E6'%3E%23${it.tokenId}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`" alt="image"></b-card-img>
                                        <b-card-body class="is-flex">
                                            <div class="nft-head">
                                                <b-card-title class="nft-title highlight-text-color">{{ utils.truncate(`#${it.tokenId}`, 8) }}</b-card-title>                                            
                                            </div>
                                        </b-card-body>
                                    </router-link>
                                </b-card>
                                <b-button class="btn-load-more mb-4" v-if="nfts.length < iNFT" @click="loadNFTs(nfts.length, nfts.length + limit)">Next <b-spinner v-if="loadingMore" small label="Small Spinner"></b-spinner></b-button>
                            </b-col>
                            <!-- Skeleton loading -->
                            <b-col v-if="loading" class="is-flex" style="margin-top: 20px">
                                <b-card v-for="(i) in [1,2,3,4]" :key="i" no-body class="nft-item">
                                    <b-skeleton-img></b-skeleton-img>
                                    <b-card-body class="is-flex space-between">
                                        <div class="nft-head">
                                            <b-skeleton animation="fade" width="100%"></b-skeleton>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                            <!-- End skeleton loading -->
                        </b-row>
                    </b-tab>
                    <b-tab :title="`Asks (${iAsk})`">
                        <div class="no-item" v-if="!loading && asks.length === 0">
                            <b-card-img class="nologo" :src="require('../assets/images/nologo.svg')" alt="Image"></b-card-img>
                            <b-card-text>Your Asks will be shown here.</b-card-text>
                        </div>
                        <b-row class="is-multiline">
                            <b-col v-if="!loading && asks.length > 0" class="is-flex">
                                <b-card v-for="(it, k) in asks" :key="k" no-body class="nft-item">
                                    <router-link class="item-link" :to="`/${chainId}/market/${ftLink}/${nftAddress}/${it.tokenId}`">
                                        <b-card-img class="nft-image" :class="{ 'pixelated': isPixelated}" v-bind:src="it.image || `data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_17cb7089c7d text %7B fill:'%23DFE1E6';font-weight:bold;font-family:Poppins, monospace;font-size:50pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_17cb7089c7d'%3E%3Crect width='200' height='200' fill='%23EBECF0'%3E%3C/rect%3E%3Cg%3E%3Ctext x='44.421875' y='118.5' fill='%23DFE1E6'%3E%23${it.tokenId}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`" alt="image"></b-card-img>
                                        <b-card-body class="is-flex">
                                            <div class="nft-head">
                                                <b-card-title class="nft-title highlight-text-color">{{ utils.truncate(it.name || `#${it.tokenId}`, 12) }}</b-card-title>
                                            </div>
                                        </b-card-body>
                                    </router-link>
                                </b-card>
                                <b-button class="btn-load-more mb-4" v-if="asks.length < iAsk" @click="loadAsks(asks.length, asks.length + limit)">Next <b-spinner v-if="loadingMore" small label="Small Spinner"></b-spinner></b-button>
                            </b-col>
                            <!-- Skeleton loading -->
                            <b-col v-if="loading" class="is-flex" style="margin-top: 20px">
                                <b-card v-for="(i) in [1,2,3,4]" :key="i" no-body class="nft-item">
                                    <b-skeleton-img></b-skeleton-img>
                                    <b-card-body class="is-flex space-between">
                                        <div class="nft-head">
                                            <b-skeleton animation="fade" width="100%"></b-skeleton>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                            <!-- End skeleton loading -->
                        </b-row>
                    </b-tab>
                    <b-tab :title="`Bids (${iBid})`">
                        <div class="no-item" v-if="!loading && bids.length === 0">
                            <b-card-img class="nologo" :src="require('../assets/images/nologo.svg')" alt="Image"></b-card-img>
                            <b-card-text>Your Bids will be shown here.</b-card-text>
                        </div>
                        <b-row class="is-multiline">
                            <b-col v-if="!loading && bids.length > 0" class="is-flex">
                                <b-card v-for="(it, k) in bids" :key="k" no-body class="nft-item">
                                    <router-link class="item-link" :to="`/${chainId}/market/${ftLink}/${nftAddress}/${it.tokenId}`">
                                        <b-card-img class="nft-image" :class="{ 'pixelated': isPixelated}" v-bind:src="it.image || `data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_17cb7089c7d text %7B fill:'%23DFE1E6';font-weight:bold;font-family:Poppins, monospace;font-size:50pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_17cb7089c7d'%3E%3Crect width='200' height='200' fill='%23EBECF0'%3E%3C/rect%3E%3Cg%3E%3Ctext x='44.421875' y='118.5' fill='%23DFE1E6'%3E%23${it.tokenId}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`" alt="image"></b-card-img>
                                        <b-card-body class="is-flex">
                                            <div class="nft-head">
                                                <b-card-title class="nft-title highlight-text-color">{{ utils.truncate(it.name || `#${it.tokenId}`, 12) }}</b-card-title>                                            
                                            </div>
                                        </b-card-body>
                                    </router-link>
                                </b-card>
                                <b-button class="btn-load-more mb-4" v-if="bids.length < iBid" @click="loadBids(bids.length, bids.length + limit)">Next <b-spinner v-if="loadingMore" small label="Small Spinner"></b-spinner></b-button>
                            </b-col>
                            <!-- Skeleton loading -->
                            <b-col v-if="loading" class="is-flex" style="margin-top: 20px">
                                <b-card v-for="(i) in [1,2,3,4]" :key="i" no-body class="nft-item">
                                    <b-skeleton-img></b-skeleton-img>
                                    <b-card-body class="is-flex space-between">
                                        <div class="nft-head">
                                            <b-skeleton animation="fade" width="100%"></b-skeleton>
                                        </div>
                                    </b-card-body>
                                </b-card>
                            </b-col>
                            <!-- End skeleton loading -->
                        </b-row>
                    </b-tab>
                </b-tabs>
            </div>

        </b-container>
    </div>
</template>
<script>
import { Market, Multicall, NFT } from '@bazarion/sdk'
import axios from 'axios'

export default {
    name: 'YourNFT',
    data: () => ({
        account: '',
        userBids: {},
        userAsks: {},
        asks: [],
        bids: [],
        nfts: [],
        loading: true,
        loadingMore: false,
        isCopy: false,
        isPixelated: false,
        limit: 12,
        iAsk: 0,
        iBid: 0,
        iNFT: 0
    }),
    props: ['ftLink', 'nftAddress', 'ftSymbol', 'nftSymbol'],
    updated: async function () {
        this.$nextTick().then(() => { 
            let nftImg = document.querySelector(".nft-image")
            if (nftImg) {
                if (nftImg.naturalWidth < 200) {
                    this.isPixelated = true
                } else {
                    this.isPixelated = false
                }
            }
        })
    },
    created: async function () {
        this.market = await Market.setMarket(this.ftLink, this.nftAddress, this.provider)
        this.marketAddress = this.market.market
        this.ft = this.market.ft
        this.nft = this.market.nft
        this.isNative = this.market.isNative
        this.address = await this.provider.getSigner().getAddress()

        this.account = this.address

        this.iAsk = (await this.market.askBalanceOf(this.address)).toNumber()
        this.iBid = (await this.market.bidBalanceOf(this.address)).toNumber()
        let nft = new NFT(this.nft, this.provider)
        this.iNFT = (await nft.balanceOf(this.address)).toNumber()

        this.loadAsks(0, (this.iAsk > this.limit) ? this.limit : this.iAsk)

        this.loadBids(0, (this.iBid > this.limit) ? this.limit : this.iBids)

        await this.loadNFTs(0, (this.iNFT > this.limit) ? this.limit : this.iNFT)

        this.loading = false

    }, 
    methods: {
        loadNFTs: async function (from, to) {
            this.loadingMore = true
            let calls = await Multicall.setMulticall(this.ft, this.nft, this.provider)
            let nfts = await calls.nftOfOwnerByIndex(this.address, from, to)
            nfts.forEach(async (tokenId) => {
                let uri = await this.market.tokenURI(tokenId)
                try {
                    let { data } = await axios.get(this.utils.nftIpfsLink(uri))
                    data.tokenId = tokenId.toString()
                    this.nfts.push(data)
                } catch(e) {
                    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
                }
            })
            this.loadingMore = false
        },
        loadBids: async function (from, to) {
            this.loadingMore = true
            let calls = await Multicall.setMulticall(this.ft, this.nft, this.provider)
            let bids = await calls.bidOfOwnerByIndex(this.address, from, to)
            bids.forEach(async (tokenId) => {
                let uri = await this.market.tokenURI(tokenId)
                try {
                    let { data } = await axios.get(this.utils.nftIpfsLink(uri))
                    data.tokenId = tokenId.toString()
                    this.bids.push(data)
                } catch(e) {
                    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
                }
            })
            this.loadingMore = false

        },
        loadAsks: async function (from, to) {
            this.loadingMore = true
            let calls = await Multicall.setMulticall(this.ft, this.nft, this.provider)
            let asks = await calls.askOfOwnerByIndex(this.address, from, to)
            asks.forEach(async (tokenId) => {
                let uri = await this.market.tokenURI(tokenId)
                try {
                    let { data } = await axios.get(this.utils.nftIpfsLink(uri))
                    data.tokenId = tokenId.toString()
                    this.asks.push(data)
                } catch(e) {
                    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
                }
            })
            this.loadingMore = false
        },
        onCopy: function () {
            this.isCopy = true
            setTimeout(()=>{
                this.isCopy = false
            },2000)
        },
        onError: function () {
            this.isCopy = false
        }

    }
};
</script>
<style lang="scss" scoped>
    .account{
        background-color: #fff;
        max-height: calc(100vh - 74px);
        .header-account{
            align-items: center;
            .w-icon{
                height: 30px;
            }
        }
        .address{
            font-size: 30px;
            font-weight: 700;
        }
        .action{
            margin-left: 40px;
        }
        .copy-address, .view-explorer{
            padding: 8px;
            display: inline-block;
            border-radius: 8px;    
        }
        .copy-address{
            color: #0065FF;
            background-color: #DEEBFF;
            margin-right: 16px;
            cursor: pointer;
        }
        .view-explorer{
            color: #9D22C1;
            background-color: #9D22C11A;

        }
        .owner-nft{
            .no-item{
                // position: absolute;
                // left: 50%;
                // top: 50%;
                // transform: translate(-50%,-50%);
                margin-top: 150px;
                text-align: center;
                color: #5E6C84;
                .nologo{
                    max-width: 80px;
                    margin-bottom: 16px;
                }
            }
            .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
                background-color: transparent;
                color: #091E42;
                &::after{
                    background: #091E42;
                }
            }
            .nav-tabs .nav-link{
                border: none;
                position: relative;
                color: #7A869A;
                margin-right: 20px;
                &::after{
                    position: absolute;
                    width: 100%;
                    content: '';
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    transition: all 0.35s ease;
                }
                &:hover, &:focus{
                    color: #091E42;
                    &:after{
                        background: #091E42;
                    }
                }

            }
        }
        .btn-load-more{
            margin: 0 auto;
            padding: 5px 10px;
            border-radius: 8px;
            color: #fff;
            background-color: #9D22C1;
        }
        .nft-item{
            width: calc(25% - 20px);
            margin-right: 24px;
            margin-bottom: 24px;
            padding: 16px;
            border-radius: 8px;
            background-color: #F4F5F7;
            border-color: transparent;
            transition: all 0.35s ease;
            cursor: pointer;
            .item-link{
                &:hover{
                    text-decoration: none;
                }
            }
            &:nth-child(4n) {
                margin-right: 0;
            }
            &:hover{
                background-color: #fff;
                box-shadow: 0px 0px 8px 2px #e9e9e9;
            }
            .card-body{
                padding: 16px 0 0 0;
            }
            .is-flex{
                justify-content: space-between;
            }
            .nft-head{
                width: 61%;
            }
            .nft-price{
                width: 39%;
            }
            .nft-acc{
                font-size: 12px;
                margin-bottom: 0;
                color: #FEBC11;
                line-height: 16px;
            }
            .nft-title{
                font-size: 20px;
                font-weight: 700;
                line-height: 30px;
                margin-bottom: 0;
            }
            .nft-price-text{
                font-size: 12px;
                margin-bottom: 0;
                color: #7A869A;
                text-align: right;
            }
            .nft-price-value{
                font-size: 20px;
                text-align: right;
            }
            @media(max-width: 767px){
                width: calc(50% - 14px);
                margin-right: 24px;
                &:nth-child(2n) {
                    margin-right: 0;
                }
            }
            @media(max-width: 560px){
                width: 100%;
                margin-right: 0;
            }
        }
        @media(max-width: 767px){
            .action{
                margin-left: 0;
                margin-top: 20px;
            }
        }
    }
</style>
