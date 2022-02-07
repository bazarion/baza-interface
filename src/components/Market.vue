<template>
    <div class="market-wrap">
        <b-container>
            <div class="is-flex space-between">
                <h1 v-if="nftName">
                    <span>{{ nftName }}</span>
                </h1>                
                <b-skeleton v-else width="20%" height="40px"></b-skeleton>
                <ul class="social-list">
                    <li v-if="(nftInfo.links || {}).website">
                        <a :href="(nftInfo.links || {}).website">
                            <svg class="network" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 26C5.8201 26 0 20.1799 0 13C0 5.8201 5.8201 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26ZM21.2615 18.1376V18.0011C21.2615 16.8025 21.2615 16.2552 20.4139 15.7703C20.1415 15.6159 19.8616 15.4749 19.5754 15.3478C19.0983 15.1307 18.7824 14.989 18.356 14.365C18.3051 14.2909 18.2548 14.2164 18.2052 14.1414C17.7567 13.4589 17.433 12.9675 16.2006 13.1625C13.7761 13.5473 13.5967 13.9737 13.4901 14.6939L13.4732 14.8122C13.3159 15.8652 13.2873 16.2188 13.7267 16.6803C15.3712 18.4054 16.3566 19.6495 16.6556 20.3775C16.8012 20.7324 17.1756 21.8075 16.9182 22.8709C18.4962 22.2424 19.9007 21.2452 21.0145 19.9628C21.1575 19.4766 21.2615 18.8708 21.2615 18.1376ZM13 2.3829C9.9879 2.3829 7.267 3.6387 5.3352 5.6537C5.5653 5.8136 5.7655 6.0385 5.9033 6.3479C6.1685 6.942 6.1685 7.5543 6.1685 8.0964C6.1685 8.5228 6.1685 8.9284 6.305 9.2209C6.4922 9.6213 7.3008 9.7929 8.0145 9.9411C8.2706 9.9957 8.5332 10.0503 8.7724 10.1166C9.4302 10.2986 9.9398 10.8901 10.3467 11.3646C10.5157 11.5609 10.7666 11.8508 10.8927 11.9236C10.9577 11.8768 11.167 11.6493 11.2697 11.2762C11.3503 10.9902 11.3269 10.738 11.2112 10.6002C10.4832 9.7422 10.5235 8.0912 10.7484 7.4815C11.102 6.5208 12.207 6.5923 13.0156 6.6443C13.3172 6.6638 13.6006 6.6833 13.8138 6.656C14.6224 6.5546 14.872 5.3235 15.0475 5.083C15.4271 4.563 16.5893 3.7791 17.3095 3.2955C15.9529 2.69229 14.4846 2.38135 13 2.3829Z" fill="#B3BAC5"/>
                            </svg>

                        </a>
                    </li>
                    <li v-if="(nftInfo.links || {}).telegram">
                        <a :href="(nftInfo.links || {}).telegram">
                            <svg class="telegram" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 26C5.8201 26 0 20.1799 0 13C0 5.8201 5.8201 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26ZM8.957 14.521L8.9739 14.5119L10.1049 18.2429C10.2505 18.6472 10.4507 18.72 10.6938 18.6862C10.9382 18.6537 11.0669 18.5224 11.2268 18.369L12.7712 16.8766L16.0862 19.331C16.692 19.6651 17.1275 19.4922 17.2783 18.7694L19.4324 8.6008C19.6703 7.6544 19.2543 7.2748 18.5198 7.5764L5.8669 12.4644C5.0037 12.8102 5.0089 13.2938 5.7109 13.5083L8.957 14.5223V14.521Z" fill="#B3BAC5"/>
                            </svg>

                        </a>
                    </li>
                    <li v-if="(nftInfo.links || {}).twitter">
                        <a :href="(nftInfo.links || {}).twitter">
                            <svg class="twitter" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="13" fill="#B3BAC5"/>
                                <g clip-path="url(#clip0_77:789)">
                                <path d="M19.6052 8.87638C19.1089 9.09588 18.5827 9.24003 18.0439 9.30408C18.6118 8.96441 19.0369 8.42984 19.2399 7.79998C18.7069 8.11718 18.1225 8.33948 17.5135 8.45973C17.1043 8.022 16.5621 7.7317 15.971 7.63396C15.3799 7.53621 14.773 7.6365 14.2448 7.91922C13.7165 8.20195 13.2965 8.65127 13.05 9.19734C12.8034 9.74341 12.7442 10.3556 12.8816 10.9388C11.8007 10.8847 10.7433 10.6038 9.77799 10.1144C8.81271 9.62505 7.96113 8.93816 7.27855 8.09833C7.03694 8.51332 6.90997 8.98507 6.91065 9.46528C6.91065 10.4078 7.39035 11.2404 8.11965 11.7279C7.68806 11.7143 7.26596 11.5978 6.88855 11.388V11.4218C6.88868 12.0495 7.10589 12.6578 7.50335 13.1437C7.90081 13.6295 8.45406 13.9629 9.0693 14.0874C8.66865 14.196 8.24855 14.212 7.8408 14.1342C8.01426 14.6745 8.35236 15.1471 8.80774 15.4856C9.26312 15.8242 9.81298 16.0119 10.3804 16.0225C9.81646 16.4653 9.17082 16.7927 8.48032 16.9859C7.78983 17.1791 7.06803 17.2342 6.3562 17.1483C7.5988 17.9474 9.04531 18.3717 10.5227 18.3703C15.5232 18.3703 18.2577 14.2278 18.2577 10.6353C18.2577 10.5183 18.2545 10.4 18.2493 10.2843C18.7815 9.89959 19.2409 9.42304 19.6058 8.87703L19.6052 8.87638Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_77:789">
                                <rect width="15.6" height="15.6" fill="white" transform="translate(5.19995 5.19995)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </li>
                    <li id="my-nft" v-if="!isConnect">
                        <a @click="$bvModal.show('your-nft')">
                        <b-icon-person-circle></b-icon-person-circle> Your NFTs
                        </a>
                    </li>
                    <li v-if="!isConnect">
                        <a style="cursor: pointer" @click="$bvModal.show('liquidity')">
                        <b-icon-droplet></b-icon-droplet> Liquidity
                        </a>
                    </li>
                </ul>
            </div>
            <div class="mt-3 mb-3">
                <b-row class="is-multiline mb-3">
                    <b-col class="is-flex space-between">
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Currency </b-card-text>
                            <b-card-text v-if="!loadingData">{{ ftSymbol }}</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Items</b-card-text>
                            <b-card-text v-if="!loadingData">{{ utils.numberToCommon(totalSupply, 0) }}</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >TVL </b-card-text>
                            <b-card-text v-if="!loadingData">{{ utils.bigToLabel(tvl, ftDecimals, 2) }}</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Floor Price </b-card-text>
                            <b-card-text v-if="!loadingData">{{ utils.bigToLabel(bestBidMarketPrice, ftDecimals, 2) }}</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >ROI</b-card-text>
                            <b-card-text v-if="!loadingData">{{ roi }}%</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <!--b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Stake Rate <b-icon icon="info-circle" v-b-tooltip.click.top="'The percent of the price that you have to stake when you ask to sell the item'"></b-icon></b-card-text>
                            <b-card-text v-if="!loadingData" >{{ utils.feeToCommon(stakeRate) }}%  </b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card-->
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Withdraw Fee <b-icon icon="info-circle" v-b-tooltip.click.top="'The percent of the withdrawal amount you have to pay back the pool'"></b-icon></b-card-text>
                            <b-card-text v-if="!loadingData" >{{ utils.feeToCommon(withdrawFee) }}% </b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Exchange Fee </b-card-text>
                            <b-card-text v-if="!loadingData" >{{ utils.feeToCommon(exchangeFee) }}%</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                        <b-card class="card-item mb-2 py-3 px-2" align="center" no-body>
                            <b-card-text class="mb-0 t-size" >Treasury <b-icon icon="info-circle" v-b-tooltip.click.top="'The percent of the exchange fee that sends to the treasury wallet'"></b-icon></b-card-text>
                            <b-card-text v-if="!loadingData" >{{ utils.feeToCommon(treasuryFee) }}%</b-card-text>
                            <b-card-text v-else><b-skeleton></b-skeleton></b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class="about" v-if="nftInfo.description"> 
                    <b-col>
                        <b-card-text class="desc">
                            {{ nftInfo.description || '' }}
                        </b-card-text>
                    </b-col>
                </b-row>
                <b-row class="is-multiline filter-wrap" v-if="allData.length > 0">
                    <b-col class="is-flex space-between">
                        <div class="is-flex space-between group-filter">
                            <b-button class="filter-button" @click="selects = [];$bvModal.show('filter-nft')" :disabled="Object.keys(filters).length === 0">
                                Filters
                                <b-icon-filter></b-icon-filter>
                            </b-button>
                            <div class="search-input">
                                <span class="icon-search"><b-icon-search></b-icon-search></span>
                                <b-form-input placeholder="Search NFT Name or ID" type="search" id="search-nft" v-model="search" v-on:change="handleSearch()"></b-form-input>
                            </div>
                            <b-form-select class="sort" v-model="selected" :options="options" @change="handleSort()"></b-form-select>
                        </div>
                        <div class="icon-position">
                            <div class="is-flex space-between grid-layout">
                                <b-input-group-text v-on:click="addClass1" :class="{'active': isAddClass1}">
                                    <b-icon-grid-fill></b-icon-grid-fill>
                                </b-input-group-text>
                                <b-input-group-text v-on:click="addClass2" :class="{'active': isAddClass2}">
                                    <b-icon-grid3x3-gap-fill></b-icon-grid3x3-gap-fill>
                                </b-input-group-text>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="is-multiline filter-wrap mb-3" v-if="allData.length === 0 && loadingData">
                    <b-col class="is-flex space-between">
                        <div class="is-flex space-between group-filter">
                            <b-button class="filter-button">
                                <b-skeleton type="button" width="100px"></b-skeleton>
                            </b-button>
                            <b-skeleton type="input" width="50%"></b-skeleton>
                            <b-skeleton type="input" width="35%"></b-skeleton>
                        </div>
                        <div class="icon-position">
                            <div class="is-flex space-between grid-layout">
                                <b-input-group-text v-on:click="addClass1" :class="{'active': isAddClass1}">
                                    <b-skeleton type="button" width="56px"></b-skeleton>
                                </b-input-group-text>
                                <b-input-group-text v-on:click="addClass2" :class="{'active': isAddClass2}">
                                    <b-skeleton type="button" width="56px"></b-skeleton>
                                </b-input-group-text>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <div class="mb-4 mt-4 is-flex space-between" v-if="!loadingData && allData.length > 0">
                    <div class="atribute-filter is-flex">
                        <span v-for="(k) in Object.keys(filters)" :key="k">
                            <span v-for="(v, b) in Object.keys(filters[k])" :key="b">
                                <b-form-tag class="mr-1 badge-custom" v-if="filters[k][v]" @remove="filters[k][v]=false;handleFilterOk()">{{ `${k.toUpperCase()}:${v}` }}</b-form-tag>
                            </span>
                        </span>
                        <b-form-tag class="mr-1 badge-custom" v-if="search" @remove="search='';handleFilterOk()">{{ `SEARCH:${search}` }}</b-form-tag>
                        <b-link type="link" class="filter-clear is-flex" v-if="totalSupply.toNumber() !== totalResults" @click="clearTag()" style="align-items: center">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <span v-if="!loadingItems">Clear All</span>
                            </div>
                        </b-link>
                    </div>
                    <span class="result" v-if="!loadingItems">{{ totalResults }} results</span>
                </div>
                <div class="mb-4 mt-4 is-flex space-between" v-if="loadingData">
                    <b-skeleton animation="fade" width="100%"></b-skeleton>
                </div>
                <b-row class="is-multiline" v-bind:class="`${classActive}`">
                    <b-col v-if="items.length > 0" class="is-flex">
                        <b-card v-for="(it) in items" :key="it.code" no-body :href="`/${it.id}`" class="nft-item">
                            <router-link :to="`/${it.tokenId}`">
                                <b-card-img class="nft-image" :class="{ 'pixelated': isPixelated}" style="background-color: #638596;" v-bind:src="utils.nftIpfsLink(it.image) || `data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%23holder_17cb7089c7d text %7B fill:'%23DFE1E6';font-weight:bold;font-family:Poppins, monospace;font-size:50pt %7D %3C/style%3E%3C/defs%3E%3Cg id='holder_17cb7089c7d'%3E%3Crect width='200' height='200' fill='%23EBECF0'%3E%3C/rect%3E%3Cg%3E%3Ctext x='44.421875' y='118.5' fill='%23DFE1E6'%3E%23${it.tokenId}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`" alt="image"></b-card-img>
                                <b-card-body class="is-flex">
                                    <div class="nft-head">
                                        <b-card-text class="nft-acc">{{ nftName }}</b-card-text>
                                        <b-card-title class="nft-title highlight-text-color">{{ utils.truncate(it.name || `${nftName} #${it.tokenId}`, 11) }}</b-card-title>
                                        
                                    </div>
                                    <div class="nft-price" v-if="!it.price.value.eq(0)">                                    
                                        <b-card-text class="nft-price-text">{{ it.price.label }}({{ ftSymbol }})</b-card-text>
                                        <b-card-text class="nft-price-value">{{ utils.bigToLabel(it.price.value, ftDecimals, 2) }}</b-card-text>
                                    </div>
                                </b-card-body>
                            </router-link>
                        </b-card>
                    </b-col>
                    <!-- Skeleton loading -->
                    <b-col v-if="items.length === 0 && loadingItems" class="is-flex">
                        <b-card v-for="(i) in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="i" no-body class="nft-item">
                            <b-skeleton-img></b-skeleton-img>
                            <b-card-body class="is-flex space-between">
                                <div class="nft-head">
                                    <b-skeleton animation="fade" width="50px"></b-skeleton>
                                    <b-skeleton animation="fade" width="100%"></b-skeleton>
                                    
                                </div>
                                <div class="nft-price" style="width: auto">                                    
                                    <b-skeleton animation="fade" width="60px"></b-skeleton>
                                    <b-skeleton animation="fade" width="30px"></b-skeleton>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <div class="no-item" v-if="items.length === 0 && !loadingItems">
                        <p><b-img :src="require('../assets/images/nologo.svg')"></b-img></p>
                        <p class="msg">NFTs will be show here.</p>
                    </div>
                    <!-- End skeleton loading -->
                </b-row>
            </div>
            <div v-if="loadingItems && 1 < page && (limit * page) < totalResults" class="text-center mb-3"><b-spinner type="grow" label="Loading..."></b-spinner></div>
            <div>
                <b-modal id="filter-nft" no-close-on-backdrop centered scrollable title="Select attributes" @ok="handleFilterOk()" @cancel="handleFilterCancel()">
                    <template>
                        <div v-for="(trait, key) in Object.keys(stats)" :key="key">
                            <div class="container">
                                <div class="is-flex" v-b-toggle="`collapse-${trait}`" style="justify-content: space-between">
                                    <div>
                                        {{ trait.toUpperCase() }}
                                    </div>
                                    <div>
                                        <b-icon-chevron-down></b-icon-chevron-down>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <b-collapse :visible="key === 0" :id="`collapse-${trait}`" class="mt-2">
                                <b-container>
                                    <div v-for="(it, k) in Object.keys(stats[trait])" :key="k" class="is-flex" style="justify-content: space-between">
                                        <div>
                                            <b-form-group>
                                                <b-form-checkbox switch v-model="filters[trait][it]" v-on:change="selects.push([trait, it, filters[trait][it]])">{{ it }}</b-form-checkbox>
                                            </b-form-group>
                                        </div>
                                        <div>{{ stats[trait][it] }} items</div>
                                    </div>
                                </b-container>
                            </b-collapse>
                        </div>
                    </template>

                    <template #modal-footer="{ ok, cancel }">
                        <b-button class="btn-cancel mr-1" @click="cancel()">
                            Cancel
                        </b-button>
                        <b-button class="btn-success" @click="ok()">
                            OK
                        </b-button>                        
                    </template>
                </b-modal>
            </div>
        </b-container>
        <b-modal id="import-token-alert" no-close-on-backdrop centered hide-footer title="Import tokens">
            <ImportTokenAlert @import-success="$bvModal.hide('import-token-alert')" :tokens="{ ft: ft, nft: nft }"/>
        </b-modal>
        <b-modal id="your-nft" size="xl" scrollable centered hide-footer title="Your NFTs">
            <YourNFT :ftLink="ftLink" :nftAddress="nft" :ftSymbol="ftSymbol" :nftSymbol="nftSymbol" @nft-success="$bvModal.hide('your-fnt')" />
        </b-modal>
        <b-modal id="liquidity" scrollable centered hide-footer title="Liquidity" @close="isBidMarket=false; isWithdraw=false" @hide="isBidMarket=false; isWithdraw=false">
            <Liquidity v-if="!isBidMarket && !isWithdraw"
            :ftLink="ftLink" :nftAddress="nft"
            :ftSymbol="ftSymbol" :ftDecimals="ftDecimals"
            :lpShare="lpShare"
            :lpPrice="lpPrice"
            :lpIsAuto="lpIsAuto"
            :lpROI="lpROI"
            @add-liquidity="isBidMarket=true"
            @withdraw="isWithdraw=true"/>
            <BidMarket
            v-if="isBidMarket"
            :ftLink="ftLink"
            :nftAddress="nft" @bid-market-success="getMarketInfo().then(() => $bvModal.hide('liquidity'))" @bid-market-cancel="$bvModal.hide('liquidity')" />
            <Withdraw v-if="isWithdraw" :lpShare="lpShare" :ftLink="ftLink" :nftAddress="nft" @withdraw-success="getMarketInfo().then(() => $bvModal.hide('liquidity'))" @withdraw-cancel="$bvModal.hide('liquidity')" />
        </b-modal>
        <b-toast id="tx-confirm" title="Transaction Process" variant="info" solid no-auto-hide>
            Your transaction is being processed.
        </b-toast>
        <b-toast id="tx-success" title="Transaction Success" variant="success" solid auto-hide-delay="8000">
            Your transaction is successful.
        </b-toast>

    </div>
</template>
<script>
import axios from 'axios'
import utils from '../utils'
import { ethers } from 'ethers'
import { Market, Multicall } from '@bazarion/sdk'
import store from '../stores'
import ImportTokenAlert from './ImportTokenAlert.vue'
import YourNFT from './YourNFT.vue'
import Liquidity from './Liquidity.vue'
import BidMarket from './BidMarket.vue'
import Withdraw from './Withdraw.vue'
import urljoin from 'url-join'
import config from '../config'

export default {
    components: {
        ImportTokenAlert, YourNFT, Liquidity, Withdraw, BidMarket
    },
    data: () => ({
        pets: [],
        selected: 'ID',
        options: [
            { value: 'ID', text: 'Sort Default' },
            { value: 'PL2H', text: 'Price: Low to High' },
            { value: 'PH2L', text: 'Price: High to Low' },
            { value: 'OL2H', text: 'Offer: Low to High' },
            { value: 'OH2L', text: 'Offer: High to Low' },
        ],
        currencySelected: 'BAZA',
        currencyOptions: [
            { value: 'BAZA', text: 'Currency: BAZA' },
        ],
        nft: '',
        ft: '',
        ftLink: '',
        nftSymbol: '',
        ftSymbol: '',
        nftName: '',
        sFt: '',
        sNft: '',
        market: '',
        tokenNfts: [],
        tokenFts: [],
        isCreate: false,
        totalSupply: ethers.BigNumber.from(0),
        exchangeFee: 0,
        withdrawFee: 0,
        treasuryFee: 0,
        stakeRate: 0,
        bestBidMarketPrice: ethers.BigNumber.from(0),
        tvl: 0,
        roi: 0,
        items: [],
        ftDecimals: 18,
        page: 1,
        limit: 12,
        loadingItems: true,
        loadingData: true,
        isNative: false,
        stats: {},
        filters: {},
        allData: [],
        result: [],
        filterResult: {},
        askPrices: {},
        bidPrices: {},
        search: '',
        selects: [],
        nftInfo: {},
        isAddClass1: false,
        isAddClass2: true,
        classActive: 'columns-4',
        totalResults: 0,
        isPixelated: false,
        isBidMarket: false,
        isWithdraw: false,
        isConnect: false,
        lpPrice: ethers.BigNumber.from(0),
        lpShare: ethers.BigNumber.from(0),
        lpROI: 0,
        lpIsAuto: false
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
        let { ft, nft, chainId } = this.getMarketConfig()
        this.chainId = chainId
        this.ftLink = ft

        try {
            this.provider = await this.getProvider()

            this.isConnect = (this.provider.connection.url !== 'metamask')
            this.address = await this.provider.getSigner().getAddress()
        } catch(e) {
            this.isConnect = true
        }

        this.provider = await this.getProvider(this.chainId)
        this.market = await Market.setMarket(ft, nft, this.provider)

        this.nft = ethers.utils.getAddress(this.market.nft)
        this.ft = ethers.utils.getAddress(this.market.ft)
        this.isNative = this.market.isNative
        this.marketAddress = this.market.market

        let tokens = store.getTokens()
        this.nftInfo = tokens.find(t => (t.address === this.nft  && t.chainId === this.chainId)) || {}

        await this.getMarketInfo()

        let b = this.utils.checkTokenAlert(this.chainId, this.ft, this.nft)
        if (b) {
            this.$bvModal.show('import-token-alert')
        }

        await this.getData()

        if (this.allData.length > 0) {
            this.search = this.$route.query.s || ''
            this.selected = this.$route.query.srt || this.selected
            let flt = JSON.parse(this.$route.query.flt || '{}')
            Object.keys(flt || {}).forEach((k) => {
                Object.keys(flt[k]).forEach(kk => {
                    this.filters[k][kk] = flt[k][kk]
                })
            })
        }

        await this.handleFilterOk()
        this.loadingData = false
        this.loadingItems = false

        window.addEventListener('scroll', this.handleScroll);

    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        getData: async function() {
            try {
                let { data } = await axios.get(urljoin(config.apiBaseUrl, `/api/${this.chainId}/data/${this.nft}/all`))
                this.stats = data.stats
                this.filters = Object.keys(this.stats).reduce((a, v) => ({ ...a, [v]: {}}), {})
                this.allData = data.data
            } catch(e) {
                // eslint-disable-next-line
            }
            try {
                let { data } = await axios.get(urljoin(config.apiBaseurl, `/api/${this.chainId}/markets/${this.marketAddress}`))
                this.askPrices = data.askPrices
                this.bidPrices = data.bidPrices
            } catch(e) {
                /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
            }

        },
        clearTag: async function() {
            this.search = ''
            Object.values(this.filters).forEach(f => {
                Object.keys(f).forEach(k => {
                    f[k] = false
                })
            })
            await this.handleFilterOk()
        },
        handleSearch: async function() {
            if (this.search) {
                this.result = this.filterResult.filter(r => {
                    return r.name.includes(this.search)
                })
            } else {
                this.result = this.filterResult
            }
            await this.handleSort()
        },
        handleSort: async function() {
            if (this.result.length > 0 && this.askPrices && this.bidPrices) {
                switch (this.selected) {
                    case 'ID':
                        utils.sortID(this.result)
                        break
                    case 'PH2L':
                        utils.sortPH2L(this.askPrices, this.result)
                        break
                    case 'PL2H':
                        utils.sortPL2H(this.askPrices, this.result)
                        break
                    case 'OH2L':
                        utils.sortOH2L(this.bidPrices, this.result)
                        break
                    case 'OL2H':
                        utils.sortOL2H(this.bidPrices, this.result)
                        break
                    default:
                        utils.sortID(this.result)
                        break
                       
                }

            }
            this.items = []
            this.limit = 12
            this.page = 1
            this.handleUrl()
            await this.loadItems()
        },
        handleUrl: function() {
            if (this.allData.length > 0) {
                const query = { ...this.$route.query }
                if (this.selected !== 'ID') {
                    query.srt = this.selected
                } else {
                    delete query.srt
                }
                if (query.s !== this.search) {
                    query.s = this.search
                }
                if (this.result.length !== this.allData.length) {
                    query.flt = JSON.stringify(this.filters)
                } else {
                    delete query.flt
                }
                this.$router.replace({ query }).catch(() => {
                    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
                })
            }
        },
        handleFilterCancel: async function() {
            this.selects.reverse().forEach(it => {
                this.filters[it[0]][it[1]] = !it[2]
            })
        },
        handleFilterOk: async function() {
            this.loadingItems = true
            this.items = []
            this.limit = 12
            this.page = 1


            let traits = {}
            Object.keys(this.filters).forEach(key => {
                Object.keys(this.filters[key]).forEach(k => {
                    if (this.filters[key][k] ===  true) {

                        traits[key] = traits[key] || []
                        traits[key].push(k)
                    }
                })
            })

            if (Object.keys(traits).length > 0) {
                this.filterResult = this.allData.filter(d => {
                    let it = Object.keys(d).find(k => {
                        return (traits[k] || []).find(t => (t.trim() === d[k].trim()))
                    })

                    if (it) {
                        let tt = Object.keys(traits).filter(k => {
                            return (traits[k] || []).find(t => (t.trim() === d[k].trim()))
                        })
                        return (tt.length === Object.keys(traits).length)
                    }
                    return it
                })
            } else {
                this.filterResult = this.allData
            }

            await this.handleSearch()
            this.loadingItems = false
        },
        loadItems: async function() {
            let total = (this.allData.length !== this.result.length) ? this.result.length : this.totalSupply.toNumber()
            this.totalResults = total
            let max = total > (this.limit * this.page)
                ? this.limit * this.page : total

            let items = []
            let mapPrices = []
            for (let i = (this.limit * (this.page - 1)); i < max; i++) {
                let tokenId
                let it = {}
                if (this.result.length > 0) {
                    it = this.result[i]
                    tokenId = (this.result[i] || {}).id
                    it.tokenId = tokenId
                    mapPrices.push(this.getPrices(it))
                    items.push(it)
                } else {
                    tokenId = await this.market.tokenByIndex(i)
                    let uri = await this.market.tokenURI(tokenId)
                    try {
                        let { data } = await axios.get(this.utils.nftIpfsLink(uri))
                        it = data
                    } catch(e) {
                        /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
                    }
                    it.tokenId = tokenId.toString()
                    mapPrices.push(this.getPrices(it))
                    items.push(it)
                }
            }
            await Promise.all(mapPrices)
            this.items.push(...items)
        },
        handleScroll: async function() {
            let d = document.documentElement;
            let offset = d.scrollTop + d.offsetHeight
            let height = d.scrollHeight;

            let delta = 10
            let total = (this.allData.length > 0) ? this.result.length : this.totalSupply.toNumber()
            
            if (offset + delta >= height && !this.loadingItems && ((this.limit * this.page) < total)) {
                this.page = this.page + 1
                this.loadingItems = true
                await this.loadItems()
                this.loadingItems =  false
                this.handleScroll()
            }
        },
        async getPrices(it) {
            let bestBid = (this.bidPrices) ? this.bidPrices[it.tokenId] : 0
            bestBid = (bestBid) ? ethers.BigNumber.from(bestBid) : (await this.market.getBestBid(it.tokenId))[1]
            bestBid = this.bestBidMarketPrice.gt(bestBid) ? this.bestBidMarketPrice : bestBid
            let askPrice = (this.askPrices) ? this.askPrices[it.tokenId] : 0
            askPrice = (askPrice) ? ethers.BigNumber.from(askPrice) : await this.market.getAskPrice(it.tokenId)
            if (bestBid.gt(askPrice)) {
                it.price = { 
                    label: 'Top Bid',
                    value: bestBid
                }
            } else {
                it.price = {
                    label: 'Price',
                    value: askPrice
                }
            }
        },
        async getMarketInfo() {
            let calls = await Multicall.setMulticall(this.ft, this.nft, this.provider)
            let {
                totalSupply, exchangeFee, withdrawFee, treasuryFee, stakeRate, tvl, ftDecimals,
                ftSymbol, nftSymbol, nftName, marketTotalSupply, bestBidMarketPrice
            } = await calls.getMarketInfo()
            this.totalSupply = totalSupply
            this.exchangeFee = exchangeFee
            this.withdrawFee = withdrawFee
            this.treasuryFee = treasuryFee
            this.stakeRate = stakeRate
            this.bestBidMarketPrice = bestBidMarketPrice
            this.tvl = tvl
            this.ftDecimals = ftDecimals
            this.ftSymbol = ftSymbol
            this.nftName = nftName
            this.nftSymbol = nftSymbol
            if (!this.totalSupply.eq(0) && !marketTotalSupply.eq(0)) {
                this.roi = utils.calROI(this.tvl, marketTotalSupply)
            }
            if (this.address) {
                let { price, share, isAuto, ROI } = await calls.getBidMarketInfo(this.address)
                this.lpPrice = price
                this.lpShare = share
                this.lpIsAuto = isAuto
                this.lpROI = ROI
            }
        },
        addClass1: function() {
            this.isAddClass1 = true
            this.isAddClass2 = false
            this.classActive = 'columns-3'
        },
        addClass2: function() {
            this.isAddClass1 = false
            this.isAddClass2 = true
            this.classActive = 'columns-4'
        }
    }


};
</script>
<style lang="scss">
    .market-wrap{
        height: calc(100vh - 74px);
        background-color: #fff;
        .space-between{
            justify-content: space-between;
            align-items: center;
        }
        .social-list{
            list-style: none;
            padding-left: 0;
            margin-bottom: 0;
            li{
                display: inline-block;
                margin-left: 10px;
                a{
                    display: block;
                    &:hover{
                        .network,.telegram{
                            path{
                                fill: #9D22C1;
                            }                            
                        }
                        .twitter{
                            circle{
                                fill: #9D22C1;
                            }
                        }
                    }
                }
                &#my-nft{
                    cursor: pointer;
                    a{
                        padding: 5px 10px;
                        border-radius: 8px;
                        color: #fff;
                        background-color: #9D22C1;
                        &:hover{
                            background-color: #b62adf;
                        }
                    }
                }
            }
        }
        .card-item {
            border-radius: 8px;
            min-height: 76px;
            width: calc(12.5% - 8px);
            justify-content: center;
            
            @media(max-width: 991px){
                width: calc(25% - 8px);
            }
            @media(max-width: 580px){
                width: calc(50% - 5px);
            }
        }
        .t-size{
            font-size:  12px;
            color: #7A869A;
        }
        .about{        
            &:after{
                content: '';
                width: calc(100% - 30px);
                height: 1px;
                background-color: #DFE1E6;
                margin: 20px auto 20px auto;
            }
        }
        .desc{
            font-weight: 400;
        }
        .filter-wrap{
            .group-filter{
                width: 80%;
                flex-wrap: nowrap;
            }            
            .filter-button{
                background-color: #fff;
                color: inherit;
                border-color: #DFE1E6;
                border-radius: 8px;
                min-height: 56px;
                min-width: 100px;
                &:focus{
                    box-shadow: none;
                }
                &:not(:disabled):not(.disabled):active:focus{
                    box-shadow: none;
                    background-color: #fff;
                    border-color: #DFE1E6;
                    color: inherit;
                }
            }
            .search-input{
                position: relative;
                width: 50%;
                margin-left: 10px;
            }
            .icon-search{
                position: absolute;
                left: 18px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 20px;
                z-index: 5;
            }
            #search-nft{
                height: 56px;
                border-radius: 8px;
                padding-left: 45px;
            }
            .sort{
                height: 56px;
                border-radius: 8px;
                width: 35%;
                margin-left: 10px;
            }
            .icon-position{
                position: absolute;
                right: 15px;
                top: 0;
            }
            .grid-layout{
                justify-content: center;
                width: 120px;
                .input-group-text{
                    height: 56px;
                    width: 56px;
                    border-radius: 0;
                    background-color: #fff;
                    justify-content: center;
                    cursor: pointer;
                    &:first-child{
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                        border-right: 0;
                    }
                    &:last-child{
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    &.active{
                        background-color: #DFE1E6;
                    }
                }
            }
            @media(max-width: 767px){
                .group-filter{
                    width: 100%;
                    flex-wrap: wrap;
                    .search-input,.sort{
                        width: 100%;
                        margin-top: 20px;
                        margin-left: 0;
                    }
                }
            }
        }
        .atribute-filter{
            .badge-custom{
                background-color: #196EC2;
                border-radius: 16px;
                padding: 4px 16px;
                margin-bottom: 5px;
                display: inline-block;
            }
            .b-form-tag-remove{
                margin-left: 0.5em;
                width: 15px;
                height: 15px;
                background-color: #9b9b9b;
                line-height: 15px;
                border-radius: 16px;
            }
            .filter-clear{
                > div{
                    background-color: #9D22C1;
                    color: #fff;
                    padding: 4px 16px;
                    border-radius: 16px;
                    font-size: 12px;
                    margin-bottom: 5px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;   
                    span{
                        margin-left: 5px;
                    }            
                }
                &:hover{      
                    text-decoration: none;
                    > div{        
                        background-color: #b62adf;                        
                    }
                }                
            }
        }
        .result{
            padding: 4px 16px;
            border-radius: 16px;
            background-color: #9D22C1;
            font-size: 12px;
            margin-bottom: 5px;
            color: #fff;
        }
        .no-item{
            text-align: center;
            width: 100%;
            display: block;
            color: #5E6C84;
            margin-top: 30px;
            margin-bottom: 60px;
            img{
                max-width: 80px;
            }
        }
        .nft-item{
            
            margin-bottom: 24px;
            padding: 16px;
            border-radius: 8px;
            background-color: #F4F5F7;
            border-color: transparent;
            transition: all 0.35s ease;
            cursor: pointer;            
            &:hover{
                background-color: #fff;
                box-shadow: 0px 0px 8px 2px #e9e9e9;
            }
            > a{
                color: inherit;
                &:hover{
                    text-decoration: none;
                }
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
        }
    }
    .columns-4{
        .nft-item{
            width: calc(25% - 20px);
            margin-right: 24px;
            @media(min-width: 768px){
                &:nth-child(4n) {
                    margin-right: 0;
                }
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
    } 
    .columns-3{
        .nft-item{
            width: calc(33.33% - 20px);
            margin-right: 24px;
            @media(min-width: 768px){
                &:nth-child(3n) {
                    margin-right: 0;
                }
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
    }    
    #filter-nft{
        .modal-content{
            border-radius: 16px;
        }
        
        .modal-header{
            background: linear-gradient(243.18deg, #f4d4fd 0%, #ffffff 100%);
            justify-content: center;
        }
        .close{
            position: absolute;
            right: 20px;
            top: 15px;
        }
        .custom-switch{
            cursor: pointer;
            .custom-control-input:checked ~ .custom-control-label::before {
                border-color: #9D22C1;
                background-color: #9D22C1;
            }
        }
        .btn-cancel{
            padding: 10px 30px;
            background-color: rgba(25, 110, 194, 0.1);
            color: #196EC2;
            border-radius: 8px;
            border: none;
        }
        .btn-success{
            padding: 10px 35px;
            background-color: #9D22C1;
            color: #fff;
            border-radius: 8px;
            border: none;
            font-weight: 700;
        }
    }
    #import-token-alert{
        .modal-dialog{
            max-width: 520px;
        }
        .modal-content{
            border-radius: 16px;
            overflow: hidden;
        }
        
        .modal-header{
            background: linear-gradient(243.18deg, #f4d4fd 0%, #ffffff 100%);
            justify-content: center;
            .modal-title{
                font-weight: 700;
                font-size: 16px;
            }            
        }
        .close{
            position: absolute;
            right: 20px;
            top: 15px;
        }
    }
    #your-nft{
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
