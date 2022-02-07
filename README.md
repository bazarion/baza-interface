# baza-interface

It's a light client to run your NFT marketplace based on Bazarion Protocol.

## Setup

Clone this source code. Then downloading dependencies.
```
npm install
```

## Configuration
Updating your market information (`ft`, `nft`) in the config file `src/config.js`.

- `ft`: ERC20 token address
- `nft`: NFT token address

Note: Before updating the file, you have to list your market in [Bazarion](https://app.bazarion.org).


For example, with the config file below:
```
cat src/config.js 
const config = {
    apiBaseUrl: 'https://app.bazarion.org/',
    ft: 'TOMO',
    nft: '0xf697F0fe68f9D1e5AdcaDF723b232eBd601e59b0',
    chainId: 88
}
```

We have TomoPunks market: [https://tomopunks.bazarion.org](https://tomopunks.bazarion.org)


### Development
```
npm run serve
```

### Production
```
npm run build
```

### Customization
You can build your own UI by updating CSS, HTML.

Or you only update logo `src/assets/logo.png`.
