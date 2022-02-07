<template>
	<div class="faq-wrap">
		<b-container class="faq-content">
			<FAQ />
		</b-container>
	</div>
</template>
<script>
import faq from '../../docs/index.md'
export default {
  components: { FAQ: faq.vue.component },
}
</script>
<style lang="scss">
	.faq-wrap{
		background-color: #fff;
		height: calc(100vh - 74px);
		.faq-content{
			max-width: 680px!important;
			h1{
				font-size: 40px;
				font-weight: 700;
				background: linear-gradient(90deg, #196EC2 0%, #9D22C1 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				display: inline-block;
			}
			h3{
				font-size: 20px;
				font-weight: 700;
			}
			ul{
				padding-left: 20px;
			}
			p,li{
				font-size: 15px;
				color: #5E6C84;
				font-weight: normal;
			}
		}
	}
</style>
