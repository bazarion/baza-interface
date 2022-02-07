<template>
  <div id="app" class="page-layout">
      <Nav :key="renderNav" />
      <router-view :key="renderRouterView" id="view-container"/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
    name: 'App',
    components: {
        Nav
    },
    data: () => ({
        renderRouterView: 0,
        renderNav: 1
    }),
    mounted: function () {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                this.forceRerender()
            })

            window.ethereum.on('chainChanged', () => {
                this.forceRerender()
            })
        }
    },
    methods: {
        forceRerender() {
            this.renderNav++
            this.renderRouterView++
        }
    }
}
</script>

<style lang="scss">

@import './assets/styles/main.scss';

</style>
