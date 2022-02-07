import { ethers } from 'ethers'
import { constants } from '@bazarion/sdk'
import urljoin from 'url-join'
import store from './stores'

const NETWORKS = constants.NETWORKS
const getFtLink = (chainId, ftAddress) => {
    const network = NETWORKS.find(n => (n.chainId === '0x' + chainId.toString(16))) || {}
    if (network.nativeCurrency.wrappedToken === ftAddress) {
        return network.nativeCurrency.symbol
    }
    return ftAddress
}

const getAddressFromLink = (chainId, ft, nft) => {
    let nftAddress = nft
    let ftAddress = ft
    const network = NETWORKS.find(n => (n.chainId === '0x' + chainId.toString(16))) || {}
    if (network.nativeCurrency.wrappedToken === ft) {
        ftAddress = network.nativeCurrency.wrappedToken
    }

    let tokens = store.getTokens()
    let f = tokens.find(t => {
        return (t.symbol === ft)
            && (t.standard === 'ERC20') && (t.chainId === parseInt(chainId))
    })

    ftAddress = (f || {}).address || ftAddress

    let n = tokens.find(t => {
        return (t.symbol === nft)
            && (t.standard === 'ERC721') && (t.chainId === parseInt(chainId))
    })

    nftAddress = (n || {}).address || nftAddress

    return { ftAddress, nftAddress }
}

const checkTokenAlert = (chainId, ft, nft) => {
    let b = 0
    if (!ft || !nft) return b
    let tokens = store.getTokens()
    let f = tokens.find(t => {
        return (t.address === ft)
            && (t.standard === 'ERC20') && (t.chainId === parseInt(chainId))
    })

    let n = tokens.find(t => {
        return (t.address === nft)
            && (t.standard === 'ERC721') && (t.chainId === parseInt(chainId))
    })

    b = ((f || {}).address) ? b : b + 1
    b = ((n || {}).address) ? b : b + 2
    return b
}

const truncate = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = '...'

    let sepLen = separator.length
    let charsToShow = strLen - sepLen
    let frontChars = Math.ceil(charsToShow / 2)
    let backChars = Math.floor(charsToShow / 2)

    return fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
}

const bigToCommon = (unit, decimals = 0, fixed = 6) => {
    unit = ethers.BigNumber.from(unit)
    if (unit.lte(ethers.BigNumber.from(0)) && unit.gte(ethers.BigNumber.from(-1))) {
        unit = ethers.BigNumber.from(0)
    }
    return ethers.utils.commify((+ethers.utils.formatUnits(unit || 0, decimals || 0) || 0).toFixed(fixed))
}

const numberToCommon = (unit, fixed = 6) => {
    return ethers.utils.commify((+unit || 0).toFixed(fixed))
}

function formatLabel (labelValue, fixed = 1) {
    return Math.abs(Number(labelValue)) >= 1.0e+12
        ? (Math.abs(Number(labelValue)) / 1.0e+12).toFixed(fixed) + 'T'
        : Math.abs(Number(labelValue)) >= 1.0e+9
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(fixed) + 'B'
        : Math.abs(Number(labelValue)) >= 1.0e+6
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(fixed) + 'M'
        : Math.abs(Number(labelValue)) >= 1.0e+3
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(fixed) + 'K'
        : (Math.abs(Number(labelValue))).toFixed(fixed)
}

function calROI (tvl, total) {
    if (total.eq(0)) return bigToCommon(0, 6, 2)
    return bigToCommon(tvl.div(total.div(1e+6)).sub(1e+6).mul(100), 6, 2)
}

function feeToCommon(fee) {
    fee = ethers.BigNumber.from(fee)
    return bigToCommon(fee.mul(1e+6).div(10), 6, 2)
}

function bigToLabel (unit, decimals, fixed = 1) {
    return formatLabel(+ethers.utils.formatUnits(unit, decimals), fixed)
}

function addressLink (chainId, addr) {
    const network = NETWORKS.find(n => (n.chainId === '0x' + chainId.toString(16))) || {}
    return urljoin(network.blockExplorerUrls[0],`address/${addr}`)

}

function txLink (chainId, hash) {
    const network = NETWORKS.find(n => (n.chainId === '0x' + chainId.toString(16))) || {}
    return urljoin(network.blockExplorerUrls[0], `/tx/${hash}`)
}

function sortPH2L (askPrices, result) {
    result.forEach(r => {
        let id = Object.keys(askPrices).find(k => (r.id == k))
        if (id) {
            r.price = askPrices[id]
        } else {
            r.price = ethers.BigNumber.from(0)
        }
    })
    result.sort((a, b) => {
        if (ethers.BigNumber.from(a.price).gt(ethers.BigNumber.from(b.price))) return -1
        if (ethers.BigNumber.from(a.price).eq(ethers.BigNumber.from(b.price))) return 0
        return 1
    })

}

function sortPL2H (askPrices, result) {
    result.forEach(r => {
        let id = Object.keys(askPrices).find(k => (r.id == k))
        if (id) {
            r.price = askPrices[id]
        } else {
            r.price = ethers.constants.MaxInt256
        }
    })
    result.sort((a, b) => {
        if (ethers.BigNumber.from(a.price).lt(ethers.BigNumber.from(b.price))) return -1
        if (ethers.BigNumber.from(a.price).eq(ethers.BigNumber.from(b.price))) return 0
        return 1
    })
}

function sortOH2L (bidPrices, result) {
    result.forEach(r => {
        let id = Object.keys(bidPrices).find(k => (r.id == k))
        if (id) {
            r.topBid = bidPrices[id]
        } else {
            r.topBid = ethers.BigNumber.from(0)
        }
    })
    result.sort((a, b) => {
        if (ethers.BigNumber.from(a.topBid).gt(ethers.BigNumber.from(b.topBid))) return -1
        if (ethers.BigNumber.from(a.topBid).eq(ethers.BigNumber.from(b.topBid))) return 0
        return 1
    })

}

function sortOL2H (bidPrices, result) {
    result.forEach(r => {
        let id = Object.keys(bidPrices).find(k => (r.id == k))
        if (id) {
            r.topBid = bidPrices[id]
        } else {
            r.topBid = ethers.constants.MaxInt256
        }
    })
    result.sort((a, b) => {
        if (ethers.BigNumber.from(a.topBid).lt(ethers.BigNumber.from(b.topBid))) return -1
        if (ethers.BigNumber.from(a.topBid).eq(ethers.BigNumber.from(b.topBid))) return 0
        return 1
    })
}

function sortID (result) {
    result.sort((a, b) => {
        if (ethers.BigNumber.from(a.id).lt(ethers.BigNumber.from(b.id))) return -1
        if (ethers.BigNumber.from(a.id).eq(ethers.BigNumber.from(b.id))) return 0
        return 1
    })
}

function nftIpfsLink (link) {
    if (link) {
        //return link.replace('ipfs://', 'https://dweb.link/ipfs/')
        //return link.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
        return link.replace('ipfs://', 'https://ipfs.io/ipfs/')
    }
    return link
}


export default {
    truncate,
    formatLabel,
    bigToLabel,
    bigToCommon,
    numberToCommon,
    calROI,
    feeToCommon,
    addressLink,
    txLink,
    sortPH2L, sortPL2H, sortOH2L, sortOL2H, sortID,
    getFtLink,
    nftIpfsLink,
    getAddressFromLink,
    checkTokenAlert
}
