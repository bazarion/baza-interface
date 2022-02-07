<template>
    <div class="buy-nft">
        <b-card no-body class="box-action mb-3">
            <b-card-body>
                <b-form>
                    <b-form-group
                        label="Price"
                        label-for="nft-price"
                        >
                        <b-form-input
                        id="nft-price"
                        v-model="price"
                        readonly
                        required
                        ></b-form-input>
                        <b-card-text class="is-flex balance">
                            Balance: {{ utils.bigToCommon(balance, ftDecimals) }} {{ ftSymbol }}
                        </b-card-text>
                    </b-form-group>

                    <div v-if="!loadingData">
                    <b-btn class="btn-custom btn-cancel mr-3" @click="$emit('buy-cancel')">
                        Cancel
                    </b-btn>

                <b-btn 
                    @click="ftApprove()"
                    v-if="!isFTApproved"
                    class="btn-custom btn-approve mr-3"
                    >
                    Approve {{ ftSymbol }} <b-icon icon="info-circle-fill" v-b-tooltip.hover.top="`Allow the market to use your fungible token - ${ftSymbol}`"></b-icon>
                </b-btn>
                <b-btn 
                    class="btn-custom btn-buy"
                    :disabled='isDisabled'
                    @click="buy()"
                    >
                    Buy
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
    name: 'Buy',
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
        isDisabled: false,
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
        this.price = ethers.utils.formatUnits(await this.market.getAskPrice(this.tokenId), ftDecimals)
        this.ftDecimals = ftDecimals
        this.ftSymbol = ftSymbol
        this.balance = balance

        this.isFTApproved = (this.isNative) ? true : (!(await this.market.ftAllowance(this.address, this.marketAddress)).eq(0))
        this.loadingData = false
    }, 
    methods: {
        async ftApprove () {
            let tx = await this.market.ftApprove(this.market, ethers.constants.MaxInt256)
            this.isFTApproved = true
            this.$bvToast.show('tx-confirm')
            await tx.wait()
            this.$bvToast.show('tx-success')
            this.$bvToast.hide('tx-confirm')
        },
        async buy () {
            try {
                this.isDisabled = true
                let price = ethers.utils.parseUnits(this.price, this.ftDecimals)
                let tx = await this.market.buy(this.tokenId, price)
                this.$bvToast.show('tx-confirm')
                await tx.wait()
                this.$bvToast.show('tx-success')
                this.$bvToast.hide('tx-confirm')
                this.$emit('buy-success')
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
    .buy-nft{        
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
        .btn-approve,.btn-buy{
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
