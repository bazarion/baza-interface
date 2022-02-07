<template>
    <b-container>
        <div class="box-wrap mb-4">
            <b-row class="is-multiline is-liquidity" cols="2" cols-sm="2" cols-md="3" no-gutters>
                <b-col class="px-1">
                    <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                        <b-card-text class="mb-0 t-size">Price</b-card-text> 
                        <b-card-text>{{ utils.bigToLabel(lpPrice, ftDecimals, 2) }} {{ ftSymbol }}</b-card-text> 
                    </b-card>
                    <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                        <b-card-text class="mb-0 t-size">Liq. Share</b-card-text> 
                        <b-card-text>{{ utils.bigToLabel(lpShare, 18, 2) }}</b-card-text>
                    </b-card>
                </b-col>
                <b-col class="px-1">
                    <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                        <b-card-text class="mb-0 t-size">Auto TP.</b-card-text> 
                        <b-card-text>{{ lpIsAuto }}</b-card-text> 
                    </b-card>
                    <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                        <b-card-text class="mb-0 t-size">TP. ROI</b-card-text> 
                        <b-card-text>{{ utils.feeToCommon(lpROI) }}%</b-card-text>
                    </b-card>
                </b-col>
                <b-col class="px-1 btn-liquidity-action">
                    <b-button class="btn-add-liquidity" @click="$emit('add-liquidity')">Add Liquidity</b-button>
                    <b-button class="btn-remove-liquidity" @click="$emit('withdraw')">Withdraw</b-button>
                </b-col>
            </b-row>
		</div>
    </b-container>
</template>
<script>

export default {
    name: 'Liquidity',
    data: () => ({
    }),
    props: [
        'lpPrice','lpShare','lpIsAuto', 'lpROI', 'ftLink', 'nftAddress', 'ftDecimals', 'ftSymbol'
    ],
    created: async function () { },
    methods: { }


};
</script>

<style lang="scss">
    .box-wrap{
        background-color: #fff;
        padding: 24px;
        border-radius: 16px;
        .is-multiline{
            position: relative;
        }        
        .is-liquidity{
            padding: 10px 6px 0 6px;
            margin-top: 10px;
            background-color: #f4f5f7;
            border-radius: 8px;
        }
        .btn-add-liquidity,.btn-remove-liquidity{
            height: 75px;
            width: 100%;
            font-size: 15px;
            margin-bottom: 10px;
            border: none;
            &:focus,&:active{
                box-shadow: none;
            }
        }
        .btn-add-liquidity{
            background-color: #9D22C1;
            &:focus,&:active{
                box-shadow: none;
                background-color: #9D22C1;
            }
            &:hover,&:active{
                background-color: #b62adf;
            }
        }
        .btn-remove-liquidity{
            background-color: rgba(25, 110, 194, 0.8);
            &:focus,&:active{
                box-shadow: none;
                background-color: rgba(25, 110, 194, 0.8);
            }
            &:hover,&:active{
                background-color: rgba(25, 110, 194, 0.7);
            }
        }
        @media(max-width: 767px){
            .row-cols-2{
                .btn-liquidity-action{
                    flex: 0 0 100%;
                    max-width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .btn-add-liquidity{
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    #withdraw,#bid-market,#select-nft,#select-ft{
        .modal-content{
            border-radius: 16px;
            overflow: hidden;
        }
        .modal-header{
            background
            : linear-gradient(243.18deg, #f4d4fd 0%, #ffffff 100%);
            justify-content: center;
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
