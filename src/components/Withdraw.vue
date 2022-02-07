<template>
    <div class="make-offer">
        <b-card no-body class="box-withdraw mb-3">        
            <b-card-body>            
                <b-form>
                    <b-form-group
                        label="Share"
                        label-for="share"
                        >
                        <b-form-input
                        id="withdraw-share"
                        v-model="share"
                        type="number"
                        placeholder="Enter share amount"
                        required
                        ></b-form-input>
                        <b-card-text class="is-flex balance" @click="share=formatLpShare">
                            Liquidity: {{ utils.bigToCommon(lpShare, 18) }} BAZA-MP
                        </b-card-text>
                    </b-form-group>
                </b-form>

                <div v-if="!loadingData">
                <b-btn class="btn-custom btn-cancel mr-3" @click="$emit('withdraw-cancel')">
                    Cancel
                </b-btn>

                <b-button
                    class="btn-custom btn-bid"
                    :disabled='isDisabled'
                    v-if="!loadingData"
                    @click="withdraw()"
                    >
                    Withdraw
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
    name: 'Withdraw',
    data: () => ({
        ft: '',
        ftDecimals: 18,
        ftSymbol: '',
        nft: '',
        marketAddress: '',
        share: '',
        formatBalance: 0,
        isNative: false,
        isDisabled: true,
        isFTApproved: false,
        market: {},
        loadingData: true
    }),
    props: ['ftLink', 'nftAddress', 'lpShare'],
    created: async function () {
        this.market = await Market.setMarket(this.ftLink, this.nftAddress, this.provider)

        this.marketAddress = this.market.market
        this.ft = this.market.ft
        this.nft = this.market.nft
        this.isNative = this.market.isNative
        this.address = await this.provider.getSigner().getAddress()

        let { ftDecimals, ftSymbol } = await this.market.getFTInfo()
        this.ftDecimals = ftDecimals
        this.ftSymbol = ftSymbol
        this.formatLpShare= ethers.utils.formatUnits(this.lpShare, 18)

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
        async withdraw () {
            try {
                this.isDisabled = true
                let share = ethers.utils.parseUnits(this.share, 18)
                let tx = await this.market.withdraw(share)
                this.$bvToast.show('tx-confirm')
                await tx.wait()
                this.$bvToast.show('tx-success')
                this.$bvToast.hide('tx-confirm')
                this.$emit('withdraw-success')
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
        .box-withdraw{
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
