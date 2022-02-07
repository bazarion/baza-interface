<template>
    <div class="make-offer">
        <b-card no-body class="box-bid-price mb-3">        
            <b-card-body>            
                <b-form>
                    <b-form-group
                        label="Amount"
                        label-for="amount"
                        >
                        <b-form-input
                        id="deposit-amount"
                        v-model="lpAmount"
                        type="number"
                        placeholder="Enter deposit amount"
                        required
                        ></b-form-input>
                        <b-card-text class="is-flex balance">
                            Balance: {{ utils.bigToCommon(balance, ftDecimals) }} {{ ftSymbol }}
                        </b-card-text>
                    </b-form-group>
                    <b-form-group
                        label="Price"
                        label-for="price"
                        >
                        <b-form-input
                        id="price"
                        v-model="lpPrice"
                        type="number"
                        placeholder="Enter floor price"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Take Profit"
                        label-for="take-profit"
                        >
                        <b-input-group append="%">
                            <b-input-group-prepend is-text>
                                <b-form-checkbox switch class="mr-n2" v-model="lpIsAuto">
                                    <span class="sr-only">Switch for following text input</span>
                                </b-form-checkbox>
                            </b-input-group-prepend>
                            <b-form-input :readonly="!lpIsAuto" id="take-profit" aria-label="Text input with switch" placeholder="Enter ROI" v-model="lpROI"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-form>

                <div v-if="!loadingData">
                <b-btn class="btn-custom btn-cancel mr-3" @click="$emit('bid-market-cancel')">
                    Cancel
                </b-btn>

                <b-button
                        v-if="!isFTApproved && !loadingData"
                        @click="ftApprove()"
                        class="btn-custom btn-approve mr-3"
                        >
                        Approve {{ ftSymbol }} <b-icon icon="info-circle-fill" v-b-tooltip.hover.top="`Allow the market to use your fungible token ${ftSymbol}`"></b-icon>
                </b-button>
                <b-button
                    class="btn-custom btn-bid"
                    :disabled='isDisabled'
                    v-if="!loadingData"
                    @click="bidMarket()"
                    >
                    Submit <b-icon v-if="!isFTApproved" icon="info-circle-fill" v-b-tooltip.hover.top="`You need to approve the market to use your fungible token ${ftSymbol}`"></b-icon>
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
    name: 'BidMarket',
    data: () => ({
        ft: '',
        ftDecimals: 18,
        ftSymbol: '',
        nft: '',
        marketAddress: '',
        lpPrice: '',
        lpAmount: 0,
        lpIsAuto: false,
        lpROI: 0,
        balance: ethers.BigNumber.from(0),
        isNative: false,
        isDisabled: true,
        isFTApproved: false,
        market: {},
        loadingData: true
    }),
    props: ['ftLink', 'nftAddress'],
    created: async function () {
        this.market = await Market.setMarket(this.ftLink, this.nftAddress, this.provider)

        this.marketAddress = this.market.market
        this.ft = this.market.ft
        this.nft = this.market.nft
        this.isNative = this.market.isNative
        this.address = await this.provider.getSigner().getAddress()

        let { ftDecimals, ftSymbol, balance } = await this.market.getFTInfo()
        this.ftDecimals = ftDecimals
        this.ftSymbol = ftSymbol
        this.balance = balance

        this.isFTApproved = this.isNative || !(await this.market.ftAllowance(this.address, this.marketAddress)).eq(0)
        this.isDisabled = !this.isFTApproved

        this.loadingData = false
    }, 
    methods: {
        async ftApprove() {
            let tx = await this.market.ftApprove()
            this.isFTApproved = true
            this.$bvToast.show('tx-confirm')
            await tx.wait()
            this.$bvToast.show('tx-success')
            this.$bvToast.hide('tx-confirm')
            this.isDisabled = this.isDisabled && !this.isFTApproved
        },
        async bidMarket () {
            try {
                this.isDisabled = true
                let price = ethers.utils.parseUnits(this.lpPrice, this.ftDecimals)
                let amount = ethers.utils.parseUnits(this.lpAmount, this.ftDecimals)
                let isAuto = this.lpIsAuto
                let ROI = this.lpROI * 10
                let tx = await this.market.bidMarket(amount, price, isAuto, ROI)
                this.$bvToast.show('tx-confirm')
                await tx.wait()
                this.$bvToast.show('tx-success')
                this.$bvToast.hide('tx-confirm')
                this.$emit('bid-market-success')
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
    .make-offer{        
        .nft-name{
            font-size: 30px;
            font-weight: 700;
        }
        .box-bid-price{
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
            &:focus{
                box-shadow: none;
            }         
        }
        .btn-approve,.btn-bid{
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
