<template>
    <div class="update-ask">
        <b-card no-body class="box-update-price mb-4">
            <b-card-body>
                <b-form>
                    <b-form-group
                        label="Price"
                        label-for="price"
                        >
                        <b-form-input
                        id="price"
                        v-model="price"
                        type="number"
                        placeholder="Enter the price of the pet"
                        required
                        ></b-form-input>
                        <b-card-text class="is-flex balance">
                            Balance: {{ utils.bigToCommon(balance, ftDecimals) }}
                        </b-card-text>
                    </b-form-group>

                    <b-btn class="btn-custom btn-cancel mr-3" @click="$emit('update-ask-cancel')">
                        Cancel
                    </b-btn>

                <b-btn 
                    class="btn-custom btn-update"
                    :disabled='isDisabled'
                    @click="update()"
                    >
                    Update
                </b-btn>


                </b-form>
            </b-card-body>

        </b-card>
    </div>
</template>
<script>
import { ethers } from 'ethers'
import { Market } from '@bazarion/sdk'

export default {
    name: 'UpdateAsk',
    data: () => ({
        ft: '',
        ftLink: '',
        isDisabled: false,
        nft: '',
        market: '',
        price: '',
        tokenId: 0,
        balance: ethers.BigNumber.from(0),
        ftDecimals: ethers.BigNumber.from(0),
    }),
    mounted: async function () {
        this.tokenId = this.$route.params.id
        let { ft, nft } = this.getMarketConfig()
        this.ftLink = ft

        this.market = await Market.setMarket(this.ftLink, nft, this.provider)

        this.marketAddress = this.market.market
        this.ft = this.market.ft
        this.nft = this.market.nft
        this.address = await this.provider.getSigner().getAddress()

        let { ftDecimals, ftSymbol, balance } = await this.market.getFTInfo()
        this.ftDecimals = ftDecimals
        this.ftSymbol = ftSymbol
        this.balance = balance
    }, 
    methods: {
        async update () {
            try {
                this.isDisabled = true
                let price = ethers.utils.parseUnits(this.price, this.ftDecimals)
                let tx = await this.market.updateAsk(this.tokenId, price)
                this.$bvToast.show('tx-confirm')
                await tx.wait()
                this.$bvToast.show('tx-success')
                this.$bvToast.hide('tx-confirm')
                this.$emit('update-ask-success')
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
    .update-ask{
        .box-update-price{
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
        
        .nft-name{
            font-size: 30px;
            font-weight: 700;
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
        .btn-update{
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
