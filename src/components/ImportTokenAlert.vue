<template>
    <div class="import-token">
        <div class="icon-info">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2453 0.332993H10.757C4.35029 0.332993 0.333622 4.32133 0.333622 10.7547V14.6247C0.331955 15.328 0.901955 15.8997 1.60529 15.8997H1.60862H1.62362C2.31862 15.8997 2.88362 15.3363 2.88362 14.6397V14.6097V10.7547C2.88362 5.68299 5.68362 2.88299 10.7553 2.88299H23.2453C28.3336 2.88299 31.117 5.68299 31.117 10.7547V23.2547C31.117 28.3263 28.317 31.1113 23.2453 31.1113H10.757C5.67029 31.1113 2.88529 28.3113 2.88529 23.2547C2.88529 22.5513 2.31362 21.9797 1.61029 21.9797C0.905288 21.9797 0.335288 22.5513 0.335288 23.2547C0.333622 29.6797 4.32029 33.6663 10.7403 33.6663H23.2453C29.6803 33.6663 33.667 29.6797 33.667 23.2597V10.7597C33.667 4.32133 29.6803 0.332993 23.2453 0.332993ZM16.9911 24.5762C16.3011 24.5762 15.7411 24.0162 15.7411 23.3262V15.9595C15.7411 15.2695 16.3011 14.7095 16.9911 14.7095C17.6811 14.7095 18.2411 15.2695 18.2411 15.9595V23.3262C18.2411 24.0162 17.6811 24.5762 16.9911 24.5762ZM16.9916 11.9232H17.0083C17.6983 11.9232 18.2583 11.3632 18.2583 10.6732C18.2583 9.98316 17.6983 9.42316 17.0083 9.42316C16.3183 9.42316 15.75 9.98316 15.75 10.6732C15.75 11.3632 16.3016 11.9232 16.9916 11.9232Z" fill="#9D22C1"/>
            </svg>
        </div>
        <div class="info-desc">
            This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.
        </div>
        <div class="is-flex token-box mb-3" v-if="isNewFt">
            <b-img width="48" height="48" class="token-icon mr-3" :src="require('../assets/images/nologo.svg')"></b-img>                                
            <div>
                <b-card-title class="token-symbol">
                    {{ ftSymbol }}
                </b-card-title>
                <b-card-text class="token-name">{{ ftName }} (ERC20)</b-card-text>
                <b-card-text class="token-address">{{ ftAddress }}</b-card-text>
            </div>
        </div>
        <div class="is-flex token-box mb-3" v-if="isNewNft">
            <b-img width="48" height="48" class="token-icon mr-3" :src="require('../assets/images/nologo.svg')"></b-img>                                
            <div>
                <b-card-title class="token-symbol">
                    {{ nftSymbol }}
                </b-card-title>
                <b-card-text class="token-name">{{ nftName }} (ERC721)</b-card-text>
                <b-card-text class="token-address">{{ nftAddress }}</b-card-text>
            </div>
        </div>
        <b-button
            class="btn-import"
            @click="importToken()"
            >
            Import
        </b-button>                
    </div>
</template>
<script>
import { Multicall } from '@bazarion/sdk'
import store from '../stores'

export default {
    name: 'ImportTokenAlert',
    data: () => ({
        ftAddress: '',
        nftAddress: '',
        ftSymbol: '',
        ftDecimals: 18,
        ftName: '',
        nftSymbol: '',
        nftName: '',
        isNewFt: false,
        isNewNft: false
    }),
    props: [ 'tokens' ],
    created: async function () {
        let { ft, nft } = this.tokens

        let { ftAddress, nftAddress } = this.utils.getAddressFromLink(this.chainId, ft, nft)

        let calls = await Multicall.setMulticall(ftAddress, nftAddress, this.provider)

        let { ftName, ftSymbol, ftDecimals, nftName, nftSymbol } = await calls.getBasicTokenInfo()
        this.ftName = ftName
        this.ftSymbol = ftSymbol
        this.ftDecimals = ftDecimals
        this.nftSymbol = nftSymbol
        this.nftName = nftName
        this.ftAddress = ftAddress
        this.nftAddress = nftAddress
        let b = this.utils.checkTokenAlert(this.chainId, ft, nft)
        this.isNewFt = b === 1 || b === 3
        this.isNewNft = b === 2 || b === 3
    }, 
    methods: {
        importToken () {
            if (this.isNewFt) {
                store.importToken({
                    address: this.ftAddress,
                    chainId: this.chainId,
                    name: this.ftName,
                    symbol: this.ftSymbol,
                    decimals: this.ftDecimals,
                    standard: 'ERC20'
                })
            }
            if (this.isNewNft) {
                store.importToken({
                    address: this.nftAddress,
                    chainId: this.chainId,
                    name: this.nftName,
                    symbol: this.nftSymbol,
                    decimals: 0,
                    standard: 'ERC721'
                })
            }
            this.$emit('import-success')
        }
    }
};
</script>

<style lang="scss">
    .import-token{
        .icon-info{
            text-align: center;
            padding-top: 15px;
            padding-bottom: 15px;
        }
        .info-desc{
            font-size: 16px;
            line-height: 28px;
            text-align: center;
            margin-bottom: 32px;
        }
        .token-box{
            align-items: center;
            background-color: #F4F5F7;
            border-radius: 8px;
            padding: 18px 16px;
            flex-wrap: nowrap;
            .token-symbol{
                font-size: 16px;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 0;
                line-height: 24px;
            }
            .token-name{
                font-size: 12px;
                color: #7A869A;
                margin-bottom: 0;
                line-height: 16px;
                padding: 5px 0;
            }
            .token-address{
                line-height: 20px;
                color: #0065FF;
                word-break: break-all;
            }
        }
        .btn-import{
            width: 100%;
            height: 48px;
            background-color: #9D22C1;
            font-weight: 700;
            border-radius: 8px;
            border: none;
            &:hover,&:focus,&:active{
                background-color: #891daa!important;
                box-shadow: none!important;
            }
        }
    }
</style>
