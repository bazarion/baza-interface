<template>
    <div class="sell-nft">
        <b-card no-body class="box-action mb-3">        
            <b-card-body>            
                <b-form>
                    <b-form-group
                        label="Bid Price"
                        label-for="nft-price"
                        >
                        <b-form-input
                        id="nft-price"
                        readonly
                        v-model="bestPrice"
                        type="number"
                        required
                        ></b-form-input>
                        <b-card-text class="is-flex balance">
                            Balance: {{ utils.bigToCommon(balance, ftDecimals) }} {{ ftSymbol }}
                        </b-card-text>
                    </b-form-group>
                </b-form>

                <div v-if="!loadingData">
                <b-btn class="btn-custom btn-cancel mr-3" @click="$emit('sell-cancel')">
                    Cancel
                </b-btn>

                <b-button
                        v-if="!isNFTApproved"
                        @click="nftApprove()"
                        class="btn-custom btn-approve mr-3"
                        >
                        Approve NFT <b-icon icon="info-circle-fill" v-b-tooltip.hover.top="'Allow the market to use your non-fungible token'"></b-icon>
                </b-button>
                <b-button
                    :disabled='isDisabled'
                    @click="sell()"
                    class="btn-custom btn-sell mr-3"
                    >
                    Sell <b-icon v-if="!isFTApproved" icon="info-circle-fill" v-b-tooltip.hover.top="`You need to approve the market to use your fungible token ${ftSymbol}`"></b-icon>
                </b-button>                
                </div>
                <b-skeleton v-else type="button"></b-skeleton>
            </b-card-body>
        </b-card>
    </div>
</template>
<script>
import { ethers } from 'ethers'
import { Market } from '@bazarion/sdk'

export default {
    name: 'Sell',
    data: () => ({
        ft: '',
        ftLink: '',
        ftDecimals: 18,
        ftSymbol: '',
        nft: '',
        marketAddress: '',
        bestPrice: 0,
        tokenId: 0,
        balance: ethers.BigNumber.from(0),
        isNative: false,
        isDisabled: false,
        isFTApproved: false,
        isNFTApproved: false,
        market: {},
        loadingData: true
    }),
    props: [ 'bidder', 'price' ],
    created: async function () {
        this.tokenId = this.$route.params.id
        let { ft, nft } = this.getMarketConfig()
        this.ftLink = ft

        this.market = await Market.setMarket(this.ftLink, nft, this.provider)

        this.marketAddress = this.market.market
        this.ft = this.market.ft
        this.nft = this.market.nft
        this.isNative = this.market.isNative
        this.address = await this.provider.getSigner().getAddress()

        let { ftDecimals, ftSymbol, balance } = await this.market.getFTInfo()
        this.ftDecimals = ftDecimals
        this.ftSymbol = ftSymbol
        this.balance = balance
        this.bestPrice = ethers.utils.formatUnits(this.price, ftDecimals)

        this.isNFTApproved = (await this.market.isApprovedForAll(this.address, this.marketAddress))
        this.isDisabled = this.isDisabled || !this.isNFTApproved
        this.loadingData = false
    }, 
    methods: {
        async nftApprove () {
            let tx = await this.market.setApprovalForAll(this.marketAddress, true)
            this.isNFTApproved = true
            this.$bvToast.show('tx-confirm')
            await tx.wait()
            this.$bvToast.show('tx-success')
            this.$bvToast.hide('tx-confirm')
            this.isDisabled = !this.isNFTApproved
        },
        async sell () {
            try {
                this.isDisabled = true
                let tx = await this.market.sellMarket(this.tokenId, this.bidder)
                this.$bvToast.show('tx-confirm')
                await tx.wait()
                this.$bvToast.show('tx-success')
                this.$bvToast.hide('tx-confirm')
                this.$emit('sell-success')
            } catch (e) {
                this.$bvToast.hide('tx-confirm')
                this.$bvToast.show('tx-error')
                this.isDisabled = false
            }
        }
    }
};
</script>

<style lang="scss">
    .sell-nft{        
        .nft-name{
            font-size: 30px;
            font-weight: 700;
        }
        .box-action{
            background-color: #F4F5F7;
            border-radius: 8px;
            border: none;
            label{
                color:#9D22C1;
                text-transform: uppercase;
                font-size: 12px;
            }
            #nft-price{
                height: 56px;
                border-radius: 8px;
                border: 1px solid #DFE1E6;
            }
            .balance{
                font-size: 14px;
                color: #5E6C84;
                font-weight: normal;
                margin-top: 10px;
                justify-content: end;
            }
        }
        .btn-custom{
            padding: 8px 16px;
            border: none;
            font-weight: 700;
            border-radius: 8px;
            min-width: 80px;
            &:focus{
                box-shadow: none;
            }         
        }
        .btn-approve,.btn-sell{
            color: #fff;
            background-color: #9D22C1;
            &:hover{
                background-color: #891daa;
            }
            &.disabled,&:disabled{
                background-color: #9D22C1;
            }  
        }
        .btn-cancel{
            color: #196EC2;
            background-color: rgba(25, 110, 194, 0.1);
            &:hover{
                background-color: rgba(25, 110, 194, 0.295);
                color: #196EC2;
            }
        }
    }
</style>
