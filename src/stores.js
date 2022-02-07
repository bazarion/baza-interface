import cookie from 'store/storages/cookieStorage'
import engine from 'store/src/store-engine'
import tokenlist from './tokenlist.json'
const store = engine.createStore(cookie)

export default {
    get: function get (key) {
        return store.get(key)
    },
    addTokenIdByOwner: async function (owner, tokenId) {
        let tokenIds = store.get(owner) || []
        tokenIds.push(tokenId)
        store.set(owner, tokenIds)
    },
    importToken: function (token) {
        let t = store.get('tokenlist')
        token.imported = true
        t.tokens.push(token)
        store.set('tokenlist', t)
    },
    getTokens: function () {
        let t = store.get('tokenlist')
        if (!t) {
            t = tokenlist
            store.set('tokenlist', tokenlist)
        }
        return (t || {}).tokens || []
    },
    updateTokens: function () {
        let t = store.get('tokenlist')
        if (!t) {
            t = tokenlist
            store.set('tokenlist', tokenlist)
        } else {
            store.remove('tokenlist')
            let tokens = t.tokens.filter(t => (t.imported)) || []
            if (tokens.length > 0) {
                tokenlist.tokens.push(...tokens)
            }
            store.set('tokenlist', tokenlist)
        }
    },
    removeToken: function (token) {
        let t = store.get('tokenlist')
        let tokens = t.tokens.filter(tk => (!(tk.address === token.address && tk.chainId === token.chainId)))
        t.tokens = tokens
        store.set('tokenlist', t)
        return tokens
    }
}
