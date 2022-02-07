<template>
    <div class="ask-to-sell">
        <b-card no-body class="box-ask-price">
            <b-card-body>
                <b-form>
                    <b-form-group
                        label="Price"
                        label-for="price"
                        >
                        <b-form-input
                        id="price"
                        v-model="price"
                        placeholder="Enter the price of the NFT"
                        required
                        ></b-form-input>
                        <b-card-text class="is-flex balance">
                            Balance: {{ utils.bigToCommon(balance, ftDecimals) }} {{ ftSymbol }}
                        </b-card-text>
                    </b-form-group>

                <div v-if="!loadingData">
                <b-btn class="btn-custom btn-cancel mr-3" @click="$emit('ask-cancel')">
                    Cancel
                </b-btn>

                <b-btn 
                    @click="nftApprove()"
                    v-if="!isNFTApproved"
                    class="btn-custom btn-approve mr-3"
                    >
                    Approve NFT <b-icon icon="info-circle-fill" v-b-tooltip.hover.top="'Allow the market to use your non-fungible token'"></b-icon>
                </b-btn>
                <b-btn 
                    @click="ftApprove()"
                    v-if="!isFTApproved"
                    class="btn-custom btn-approve mr-3"
                    >
                    Approve {{ ftSymbol }} <b-icon icon="info-circle-fill" v-b-tooltip.hover.top="`Allow the market to use your fungible token - ${ftSymbol}`"></b-icon>
                </b-btn>
                <b-btn 
                    class="btn-custom btn-ask-to-sell"
                    :disabled='isDisabled'
                    @click="ask()"
                    >
                    Ask To Sell
                </b-btn>
                </div>
                <b-skeleton v-else type="button"></b-skeleton>


                </b-form>
            </b-card-body>
        </b-card>
    </div>

</template>
<script>
import { ethers } from 'ethers'
import { Market } from '@bazarion/sdk'

export default {
    name: 'Ask',
    data: () => ({
        ft: '',
        ftLink: '',
        nft: '',
        market: '',
        price: '',
        twtData: {},
        tokenId: 0,
        balance: ethers.BigNumber.from(0),
        isFTApproved: false,
        isNFTApproved: false,
        ftDecimals: 18,
        ftSymbol: '',
        isNative: false,
        isDisabled: true,
        loadingData: true
    }),
    created: async function () {
        this.tokenId = this.$route.params.id
        let { ft, nft } = this.getMarketConfig()
        this.ftLink = ft

        this.market = await Market.setMarket(this.ftLink, nft, this.provider)

        this.ft = this.market.ft
        this.nft = this.market.nft
        this.isNative = this.market.isNative
        this.marketAddress = this.market.market
        this.address = this.market.address

        this.address = await this.provider.getSigner().getAddress()
        let  { ftDecimals, ftSymbol, balance } = await this.market.getFTInfo()
        this.ftDecimals = ftDecimals
        this.ftSymbol = ftSymbol
        this.balance = balance

        this.isFTApproved = (this.isNative) ? true : (!(await this.market.ftAllowance(this.address, this.marketAddress)).eq(0))
        this.isNFTApproved = (await this.market.isApprovedForAll(this.address, this.marketAddress))
        this.isDisabled = !(this.isFTApproved && this.isNFTApproved)
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
            this.isDisabled = !(this.isFTApproved && this.isNFTApproved)
        },
        async ftApprove () {
            let tx = await this.market.ftApprove(this.market, ethers.constants.MaxInt256)
            this.isFTApproved = true
            this.$bvToast.show('tx-confirm')
            await tx.wait()
            this.$bvToast.show('tx-success')
            this.$bvToast.hide('tx-confirm')
            this.isDisabled = !(this.isFTApproved && this.isNFTApproved)
        },
        async ask () {
            try {
                this.isDisabled = true
                let price = ethers.utils.parseUnits(this.price, this.ftDecimals)
                let tx = await this.market.ask(this.tokenId, price)
                this.$bvToast.show('tx-confirm')
                await tx.wait()
                this.$bvToast.show('tx-success')
                this.$bvToast.hide('tx-confirm')
                this.$emit('ask-success')
            } catch (e) {
                this.$bvToast.hide('tx-confirm')
                this.$bvToast.show('tx-error')
                this.isDisabled = false
            }
        },
    }
};
</script>
<style lang="scss">
    .ask-to-sell{
        .box-ask-price{
            border-radius: 8px;
            background-color: #F4F5F7;
            border: none;
            label{
                color:#9D22C1;
                text-transform: uppercase;
                font-size: 12px;
            }
            #price{
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
        .nft-title{
            font-size: 30px;
            font-weight: 700;
        }
        .btn-custom{
            padding: 8px 16px;
            border: none;
            font-weight: 700;
            border-radius: 8px;
            margin-bottom: 10px;
            &:focus{
                box-shadow: none;
            }         
        }
        .btn-update, .btn-approve, .btn-ask-to-sell{
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
