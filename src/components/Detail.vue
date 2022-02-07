<template>
    <div class="detail-wrap">
        <b-container>
            <b-row class="mb-3">
                <b-col md="5">
                    <b-card class="content-left mb-3" no-body>
                        <!--data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_17cb7089c7d text %7B fill:'%23DFE1E6';font-weight:bold;font-family:Poppins, monospace;font-size:50pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_17cb7089c7d'%3E%3Crect width='200' height='200' fill='%23EBECF0'%3E%3C/rect%3E%3Cg%3E%3Ctext x='44.421875' y='118.5' fill='%23DFE1E6'%3E%23${tokenId}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E-->

                        <b-card-img class="nft-image" :class="{ 'pixelated': isPixelated}" v-if="!loadingData" v-bind:src="utils.nftIpfsLink(nftData.image) || `data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_17cb7089c7d text %7B fill:'%23DFE1E6';font-weight:bold;font-family:Poppins, monospace;font-size:50pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_17cb7089c7d'%3E%3Crect width='200' height='200' fill='%23EBECF0'%3E%3C/rect%3E%3Cg%3E%3Ctext x='44.421875' y='118.5' fill='%23DFE1E6'%3E%23${tokenId}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`" alt="image"></b-card-img>
                        <b-skeleton-img v-else></b-skeleton-img>
                        <b-card-body v-if="nftData.attributes && !loadingData" class="list-attr p-0 is-flex space-between">
                            <b-card class="mt-3 attr-item" no-body v-for="(it, key) in nftData.attributes" :key="key">
                                <div>
                                    <b-card-text class="type">{{ it.trait_type.toUpperCase() }}</b-card-text>
                                    <b-card-text class="name highlight-text-color"><b-link :href="`/?flt=${encodeURIComponent(JSON.stringify({ [it.trait_type] : { [it.value]: true }}))}`">{{ it.value }}</b-link></b-card-text>
                                </div>
                                <div v-if="it.rarity">
                                    <b-card-text class="rarity">{{ (it.rarity || 0).toFixed(2) }}% have this trait</b-card-text>
                                </div>
                            </b-card>
                        </b-card-body>
                        <b-card-body v-if="loadingData" class="list-attr p-0 is-flex space-between">
                            <b-card class="mt-3 attr-item" no-body v-for="(i, key) in [1,2,3,4]" :key="key">
                                <div>
                                    <b-skeleton animation="fade" width="100%"></b-skeleton>
                                    <b-skeleton animation="fade" width="100%"></b-skeleton>
                                </div>
                                <div>
                                    <b-skeleton animation="fade" width="100%"></b-skeleton>
                                </div>
                            </b-card>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col class="content-right" md="7">
                    <router-view v-if="$route.name !== 'detail' && $route.name !== 'detaildefault'" :nftData="nftData"></router-view>
                    <b-card v-else no-body class="nft-info mb-3">
                        <div>
                            <b-card-body class="p-0">
                                <b-card-text v-if="ftSymbol || nftName" class="mb-4 mt-1 nft-acc"><b-link :href="`/`"><b-icon icon="chevron-double-left"></b-icon> {{ ftSymbol }} - {{ nftName }}</b-link></b-card-text>
                                <b-skeleton v-else animation="fade" width="50px"></b-skeleton>
                                <div class="is-flex space-between">
                                    <div>
                                        <b-card-title v-if="nftData.name || tokenId" class="nft-name mb-3">{{ nftData.name || `# ${tokenId}` }}</b-card-title>
                                        <b-skeleton v-else animation="fade" width="100px" heihgt="36px"></b-skeleton>
                                        <b-card-text class="mb-4 nft-address">
                                            <b-card-text class="is-flex mb-2">
                                                <span class="equal">Owned by:</span> 
                                                <b-link v-if="chainId && owner" :href="utils.addressLink(chainId, owner)" target="_blank">{{ utils.truncate(owner, 20) }}</b-link>
                                                <b-skeleton v-else animation="fade" width="160px"></b-skeleton>
                                            </b-card-text>
                                            <b-card-text class="is-flex">
                                                <span class="equal">Contract:</span>
                                                <b-link v-if="chainId && nft" :href="utils.addressLink(chainId, nft)" target="_blank">{{ utils.truncate(nft, 20) }}</b-link>
                                                <b-skeleton v-else animation="fade" width="160px"></b-skeleton>
                                            </b-card-text>
                                        </b-card-text>
                                    </div>
                                    <div>                                        
                                        <b-card-text v-if="isPublished">
                                            <b-card-text class="price-info" v-if="isPublished">
                                                Price: <span class="value highlight-text-color">{{ utils.bigToCommon(price, ftDecimals) }}</span> <span class="token-symbol">{{ ftSymbol }}</span>
                                            </b-card-text>
                                            
                                        </b-card-text>
                                        <div v-if="!isPublished && bestPrice && !bestPrice.eq(0)" class="price-info">
                                            <span>Top Bid: </span>
                                            <span>
                                                <span class="value highlight-text-color">{{ utils.bigToCommon(bestPrice, ftDecimals) }}</span> <span class="token-symbol highlight-text-color">{{ ftSymbol }}</span>
                                            </span>
                                        </div>
                                        <div v-if="!loadingData">
                                            <b-button @click="$bvModal.show('bid-nft')" :disabled="isBidded" v-if="owner !== address" class="btn-custom btn-market-order">Make Offer</b-button>

                                            <b-btn
                                                v-if="owner !== address && isPublished"
                                                @click="$bvModal.show('buy-nft')"
                                                class="btn-custom btn-buy-now ml-3"
                                                >
                                                Buy Now
                                            </b-btn>       
                                            <div v-if="owner === address">
                                                <b-button v-if="!isPublished" class="btn-custom btn-ask-sell" @click="$bvModal.show('ask-nft')">
                                                    Ask to sell
                                                </b-button>
                                            </div> 
                                        </div>
                                        <b-skeleton v-else type="button"></b-skeleton>
                                    </div>                                    
                                </div>
                            </b-card-body>                            
                        </div>

                    </b-card>
                    <div v-if="isPublished && (owner === address)" class="your-stake mb-4">
                        <b-card no-body>
                            <div class="head">
                                <b-card-text class="mb-0"> Your Order</b-card-text>
                            </div>
                            <b-row class="p-3">
                                <b-col>
                                    <b-card-text class="mb-0 label">Price</b-card-text>
                                    <b-card-text>{{ utils.bigToCommon(price, ftDecimals) }}</b-card-text>
                                </b-col>
                                <b-col>
                                    <b-card-text class="mb-0 label">Share</b-card-text>
                                    <b-card-text>{{ utils.bigToCommon(askShare, 18) }}</b-card-text>
                                </b-col>
                                <b-col>
                                    <b-button v-if="isPublished" @click="$bvModal.show('update-ask-nft')" class="btn-update card-link">Update</b-button>
                                    <b-button
                                        v-if="isPublished"
                                        @click="removeAsk()"
                                        class="btn-remove"
                                        >
                                        Remove
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>
                    <div class="your-offer mb-4" v-if="isBidded">
                        <b-card no-body>
                            <div class="head">
                                <b-card-text class="mb-0"> Your Offer </b-card-text>
                            </div>
                            <b-row class="p-3">
                                <b-col>
                                    <b-card-text class="mb-0 text-price">Price/Stake ({{ ftSymbol }})</b-card-text>
                                    <b-card-text class="highlight-text-color">{{ utils.bigToCommon(bidStake, ftDecimals) }}</b-card-text>
                                </b-col>
                                <b-col>
                                    <b-card-text class="mb-0 text-reward">Reward ({{ ftSymbol }})</b-card-text>
                                    <b-card-text class="highlight-text-color">{{ utils.bigToCommon(bidReward, ftDecimals) }}</b-card-text>
                                </b-col>
                                <b-col>
                                    <b-button @click="$bvModal.show('update-bid-nft')" class="card-link btn-update">Update</b-button>
                                    <b-button @click="removeBid()" class="btn-remove">Remove</b-button>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>
                    <div class="best-offer mb-3">
                        <b-card no-body v-if="!loadingData">
                            <div class="head is-flex space-between">
                                <b-card-text class="mb-0 highlight-text-color"> Best Offer </b-card-text>
                                <b-card-text class="total-offer">Total {{ utils.bigToCommon(bidSize.add(sizeOfListMarket), 0, 0) }} offers</b-card-text>
                            </div>
                            
                            <b-row class="p-3" v-if="bestPrice.gte(bestBidMarketPrice) && bestPrice.gt(0)"> 
                                <b-col>
                                    <b-card-text class="mb-0 text-address">Address</b-card-text>
                                    <b-link target="_blank" :href="utils.addressLink(chainId, bestBidder)">{{ utils.truncate(bestBidder, 20) }}</b-link>
                                </b-col>
                                <b-col>
                                    <b-card-text class="mb-0 text-price">Price ({{ ftSymbol }})</b-card-text>
                                    <b-card-text class="text-balance highlight-text-color">{{ utils.bigToCommon(bestPrice, ftDecimals) }}</b-card-text>                                    
                                </b-col>
                                <div v-if="owner === address">
                                    <div>
                                        <b-button @click="$bvModal.show('sell-nft')" class="btn-custom btn-sell mr-3" :disabled="(isPublished && (owner === address))">Sell  <b-icon v-if="(isPublished && (owner === address))" icon="info-circle-fill" v-b-tooltip.hover.top="`You have to remove your order before selling the item`"></b-icon></b-button>
                                    </div>
                                </div>
                            </b-row>
                            <b-row class="p-3" v-if="bestBidMarketPrice.gt(bestPrice)"> 
                                <b-col>
                                    <b-card-text class="mb-0 text-address">Address</b-card-text>
                                    <b-link target="_blank" :href="utils.addressLink(chainId, bestBidMarketOwner)">{{ utils.truncate(bestBidMarketOwner, 20) }}</b-link>
                                </b-col>
                                <b-col>
                                    <b-card-text class="mb-0 text-price">Price ({{ ftSymbol }})</b-card-text>
                                    <b-card-text class="text-balance highlight-text-color">{{ utils.bigToCommon(bestBidMarketPrice, ftDecimals) }}</b-card-text>                                    
                                </b-col>
                                <div v-if="owner === address">
                                    <div>
                                        <b-button @click="$bvModal.show('sell-market')" class="btn-custom btn-sell mr-3" :disabled="(isPublished && (owner === address))">Sell  <b-icon v-if="(isPublished && (owner === address))" icon="info-circle-fill" v-b-tooltip.hover.top="`You have to remove your order before selling the item`"></b-icon></b-button>
                                    </div>
                                </div>
                            </b-row>
                            <div class="best-offer-empty" v-if="bidSize.add(sizeOfListMarket).eq(0)">
                                <b-card-img :src="require('../assets/images/nologo.svg')" alt="Image"></b-card-img>
                                <div class="best-offer-empty-text">No Offer Yet.</div>
                            </div>
                        </b-card>
                        <b-skeleton-table
                            v-else
                            :rows="1"
                            :columns="3"
                            :table-props="{ bordered: true, striped: true }"
                            ></b-skeleton-table>
                    </div>

                </b-col>
            </b-row>
        </b-container>
        <div>
            <b-modal id="bid-nft" no-close-on-backdrop centered hide-footer title="Make an offer">
				<Bid @bid-success="getMarketInfo().then(() => $bvModal.hide('bid-nft'))" @bid-cancel="$bvModal.hide('bid-nft')" />
            </b-modal>
            <b-modal id="update-bid-nft" no-close-on-backdrop centered hide-footer title="Update your offer">
				<UpdateBid @update-bid-success="getMarketInfo().then(() => $bvModal.hide('update-bid-nft'))" @update-bid-cancel="$bvModal.hide('update-bid-nft')" />
            </b-modal>
            <b-modal id="ask-nft" no-close-on-backdrop centered hide-footer title="Ask to sell your NFT">
				<Ask @ask-success="getMarketInfo().then(() => $bvModal.hide('ask-nft'))" @ask-cancel="$bvModal.hide('ask-nft')" />
            </b-modal>
            <b-modal id="update-ask-nft" no-close-on-backdrop centered hide-footer title="Update your NFT price">
				<UpdateAsk @update-ask-success="getMarketInfo().then(() => $bvModal.hide('update-ask-nft'))" @update-ask-cancel="$bvModal.hide('update-ask-nft')" />
            </b-modal>
            <b-modal id="buy-nft" no-close-on-backdrop centered hide-footer title="Buy NFT">
				<Buy @buy-success="getMarketInfo().then(() => $bvModal.hide('buy-nft'))" @buy-cancel="$bvModal.hide('buy-nft')" />
            </b-modal>
            <b-modal id="sell-nft" no-close-on-backdrop centered hide-footer title="Sell NFT">
				<Sell :bidder="bestBidder" :price="bestPrice" @sell-success="getMarketInfo().then(() => $bvModal.hide('sell-nft'))" @sell-cancel="$bvModal.hide('sell-nft')" />
            </b-modal>
            <b-modal id="sell-market" no-close-on-backdrop centered hide-footer title="Sell NFT">
				<SellMarket :bidder="bestBidMarketOwner" :price="bestBidMarketPrice" @sell-success="getMarketInfo().then(() => $bvModal.hide('sell-market'))" @sell-cancel="$bvModal.hide('sell-market')" />
            </b-modal>
            <b-modal id="import-token-alert" no-close-on-backdrop centered hide-footer title="Import tokens">
                <ImportTokenAlert @import-success="$bvModal.hide('import-token-alert')" :tokens="{ ft: ft, nft: nft }"/>
            </b-modal>

        </div>
        <b-toast id="tx-confirm" title="Transaction Process" variant="info" solid no-auto-hide>
            Your transaction is being processed.
        </b-toast>
        <b-toast id="tx-success" title="Transaction Success" variant="success" solid auto-hide-delay="8000">
            Your transaction is successful.
        </b-toast>
        <b-toast id="tx-error" title="Transaction Failed" variant="danger" solid auto-hide-delay="8000">
            Your transaction was not successfully broadcasted.
        </b-toast>
    </div>
</template>
<script>
import { ethers } from 'ethers'
import axios from 'axios'
import utils from '../utils'
import { Market, Multicall } from '@bazarion/sdk'
import Bid from './Bid.vue'
import Ask from './Ask.vue'
import Buy from './Buy.vue'
import Sell from './Sell.vue'
import SellMarket from './SellMarket.vue'
import UpdateBid from './UpdateBid.vue'
import UpdateAsk from './UpdateAsk.vue'
import ImportTokenAlert from './ImportTokenAlert.vue'
import urljoin from 'url-join'
import config from '../config'

export default {
    name: 'Detail',
    components: {
        Bid, UpdateBid, Ask, UpdateAsk, Buy, Sell, ImportTokenAlert, SellMarket
    },
    data: () => ({
        showBid: false,
        isBidded: false,
        address: '',
        bestBidder: '',
        bestPrice: ethers.BigNumber.from(0),
        bestBidMarketOwner: '',
        bestBidMarketPrice: ethers.BigNumber.from(0),
        tokenId: 0,
        owner: '',
        price: '0',
        bidStake: '0',
        askShare: ethers.BigNumber.from(0),
        bazaMPTotalSupply: ethers.BigNumber.from(0),
        bidReward: '0',
        bidSize: 0,
        isPublished: false,
        ft: '',
        nft: '',
        marketAddress: '',
        ftSymbol: '',
        nftSymbol: '',
        nftName: '',
        ftDecimals: '',
        nftData: {},
        isNative: false,
        ftLink: '',
        market: {},
        loadingData: true,
        isPixelated: false
    }),
    updated: async function () {
        this.$nextTick().then(() => { 
            setTimeout(() => {
                let nftImg = document.querySelector(".nft-image")
                if (nftImg) {
                    if (nftImg.naturalWidth < 200) {
                        this.isPixelated = true
                    } else {
                        this.isPixelated = false
                    }
                }
            }, 5000)
        })
    },
    created: async function () {
        this.tokenId = this.$route.params.id
        let { ft, nft, chainId } = this.getMarketConfig()
        this.chainId = chainId

        this.provider = await this.getProvider(parseInt(chainId))
        this.market = await Market.setMarket(ft, nft, this.provider)

        this.marketAddress = this.market.market
        this.ft = ethers.utils.getAddress(this.market.ft)
        this.nft = ethers.utils.getAddress(this.market.nft)
        this.isNative = this.market.isNative
        this.address = this.market.address

        let uri = await this.market.tokenURI(this.tokenId)

        try {
            let { data } = await axios.get(this.utils.nftIpfsLink(uri))
            data.attributes = (data.attributes || []).filter((el) => {
                return el.trait_type !== 'id' && el.value.trim()
                    && el.trait_type !== 'name'
                    && el.trait_type !== 'image'
            })
            this.nftData = data
        } catch (e) {
            console.log(e)
        }

        await this.getMarketInfo()

        try {
            let item = await axios.get(urljoin(config.apiBaseUrl, `/api/${this.chainId}/data/${this.nft}/get/${this.tokenId}`))
            this.nftData.attributes = this.nftData.attributes.map(attr => {
                attr.rarity = item.data.data[attr.value] * 100 / item.data.totalSupply
                return attr
            })
        } catch(e) {
            console.log(e)
        }

        let b = this.utils.checkTokenAlert(this.chainId, this.ft, this.nft)
        if (b) {
            this.$bvModal.show('import-token-alert')
        }
        this.loadingData = false

    }, 
    methods: {
        async getBidInfo() {
            if (!this.bazaMPTotalSupply.eq(0)) {
                let totalStakedBaza = (await this.market.ftBalanceOf(this.marketAddress))
                let bidShare = (await this.market.getBidShare(this.tokenId, this.address))
                let bidStake = (await this.market.getBidPrice(this.tokenId, this.address))
                let total = bidShare.mul(totalStakedBaza).div(this.bazaMPTotalSupply)
                this.bidReward = total.sub(bidStake)
                this.bidStake = bidStake

                this.isBidded = !bidShare.eq(0)
            } else {
                this.isBidded = false
                this.bidStake = ethers.BigNumber.from(0)
            }
        },
        async getNftInfo() {
            let calls = await Multicall.setMulticall(this.ft, this.nft, this.provider)
            let { owner, askPrice, bidSize, bestBid, askShare } = await calls.getNftInfo(this.tokenId)
            this.owner = owner
            this.price = askPrice
            this.bidSize = bidSize
            this.bestBidder = bestBid[0]
            this.bestPrice = bestBid[1]
            this.askShare = askShare

            await this.getBidInfo()

            this.isPublished = !this.price.eq(0)
            if (this.isPublished) {
                this.owner= await this.market.getOwnerByTokenId(this.tokenId)
            }

        },
        async getMarketInfo() {
            let calls = await Multicall.setMulticall(this.ft, this.nft, this.provider)
            let {
                totalSupply, exchangeFee, withdrawFee, treasuryFee, stakeRate, tvl, ftDecimals,
                ftSymbol, nftSymbol, nftName, marketTotalSupply, bestBidMarketOwner, bestBidMarketPrice, sizeOfListMarket
            } = await calls.getMarketInfo()
            this.totalSupply = totalSupply
            this.exchangeFee = exchangeFee
            this.withdrawFee = withdrawFee
            this.treasuryFee = treasuryFee
            this.stakeRate = stakeRate
            this.tvl = tvl
            this.ftDecimals = ftDecimals
            this.ftSymbol = ftSymbol
            this.nftName = nftName
            this.nftSymbol = nftSymbol
            this.bazaMPTotalSupply = marketTotalSupply
            this.bestBidMarketOwner = bestBidMarketOwner
            this.bestBidMarketPrice = bestBidMarketPrice
            this.sizeOfListMarket = sizeOfListMarket
            if (!this.totalSupply.eq(0) && !marketTotalSupply.eq(0)) {
                this.roi = utils.calROI(this.tvl, marketTotalSupply)
            }

            await this.getNftInfo()
        },
        async removeBid () {
            let tx = await this.market.removeBid(this.tokenId)
            this.$bvToast.show('tx-confirm')
            await tx.wait()
            this.$bvToast.show('tx-success')
            this.$bvToast.hide('tx-confirm')
            await this.getMarketInfo()
        },
        async removeAsk () {
            let tx = await this.market.removeAsk(this.tokenId)
            this.$bvToast.show('tx-confirm')
            await tx.wait()
            this.$bvToast.show('tx-success')
            this.$bvToast.hide('tx-confirm')
            await this.getMarketInfo()
        }
    }
};
</script>
<style lang="scss">
    .detail-wrap{
        height: calc(100vh - 74px);
        background-color: #fff;
        .space-between{
            justify-content: space-between;
        }
        .list-attr{
            margin-top: 10px;
        }
        .content-left{
            padding: 24px;
            background-color: #F4F5F7;
            border-radius: 16px;
            border: none;
            .attr-item{
                padding: 10px;
                border-radius: 8px;
                text-align: center;
                width: calc(50% - 7px);
                .type{
                    margin-bottom: 0;
                    font-size: 10px;
                    color: #9D22C1;
                    text-transform: uppercase;
                }
                .name{
                    font-weight: 600;
                }
                .rarity{
                    font-size: 14px;
                    color: #5E6C84;
                }
            }
        }
        .content-right{
            .nft-info{
                border: none;
                .equal{
                    min-width: 95px;
                }
                .price-info{
                    margin-bottom: 10px;
                    font-weight: normal;
                    align-items: flex-end;
                    text-align: right;
                    .value{
                        font-weight: 700;
                        font-size: 30px;
                    }
                    .token-symbol{
                        font-weight: 700;
                        font-size: 20px;
                    }        
                }
                .card-link{
                    display: inline-block;
                }
                .btn-custom{
                    padding: 8px 16px;
                    border: none;
                    font-weight: 700;
                    border-radius: 8px;
                    &:focus{
                        box-shadow: none;
                    }            
                }
                .btn-market-order{
                    color: #196EC2;
                    background-color: rgba(25, 110, 194, 0.1);                                        
                    border-radius: 8px;
                    &:hover{
                        background-color: rgba(25, 110, 194, 0.295);
                    }
                }
                .btn-buy-now,.btn-update,.btn-ask-sell{
                    color: #fff;
                    background-color: #9D22C1;
                    &:hover{
                        background-color: #891daa;
                    }                
                }
                .btn-cancel{
                    color: #196EC2;
                    background-color: rgba(25, 110, 194, 0.1);
                    &:hover{
                        background-color: rgba(25, 110, 194, 0.295);
                    }

                }
            }
            .nft-acc{
                font-size: 14px;
                color: #0065FF;
            }
            .head{
                padding: 8px 16px;
                background-color: #F4F5F7;
            }
            .nft-name{
                color: #091E42;
                font-size: 30px;
                font-weight: 700;
            }
            .your-stake{
                > .card{
                    border-radius: 8px;
                    overflow: hidden;
                }
                .label{
                    color: #5E6C84;
                    font-weight: 400;
                    font-size: 14px;
                }
            }
            .your-offer,.your-stake{
                > .card{
                    border-radius: 8px;
                    overflow: hidden;
                }
                .text-reward,.text-price{
                    color: #5E6C84;
                    font-weight: 400;
                    font-size: 14px;
                }
                .card-link{
                    padding: 0.375rem 0.75rem;
                    margin-right: 10px;
                    background-color: #9D22C1;
                    color: #fff;
                    margin-top: 5px;
                    font-size: 12px;
                    border-radius: 8px;
                    border: none;
                    font-weight: 700;
                    &:hover{
                        background-color: #891daa;
                    }
                }
                .btn-remove{
                    background-color: #e53b11;
                    border: none;
                    font-size: 12px;          
                    margin-top: 5px;          
                    border-radius: 8px;
                    font-weight: 700;
                    &:focus{
                        box-shadow: none;
                    }
                    &:hover{
                        background-color: #cc350f;
                    }                    
                }
            }
            .best-offer{
                > .card{
                    border-radius: 8px;
                    overflow: hidden;
                }                
                .text-address,.text-price{
                    color: #5E6C84;
                    font-weight: 400;
                    font-size: 14px;
                }
                .text-balance{
                    font-size: 20px;
                    font-weight: 700;
                }
                .btn-sell{
                    background-color: #e53b11;
                    border: none;
                    margin-left: 10px;
                    border-radius: 8px;
                    font-size: 12px;
                    min-width: 80px;
                    font-weight: 700;
                    &:focus{
                        box-shadow: none;
                    }
                    &:hover{
                        background-color: #cc350f;
                    }
                }
            }
            .best-offer-empty{
                img{
                    width: 48px;
                    margin: 20px auto 5px auto;
                    display: block;
                }
                .best-offer-empty-text{
                    width: 100px;
                    margin: 10px auto 20px auto;;
                    display: block;
                    color: #5E6C84;
                }
            }
        }        
    }
    #bid-nft,#update-bid-nft,#ask-nft,#update-ask-nft, #sell-nft,#buy-nft{
        .modal-content{
            border-radius: 16px;
            overflow: hidden;
        }
        .modal-header{
            background
            : linear-gradient(243.18deg, #f4d4fd 0%, #ffffff 100%);
            justify-content: center;
            border-bottom: none;
            .modal-title{
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .close{
            position: absolute;
            right: 20px;
            top: 15px;
        }
    }
</style>
