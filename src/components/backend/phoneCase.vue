<template>
	<div class="phone_case">
		<h3 class="phone_title">手机</h3>
		<div id="phone" class="phone_box">
			<v-page :isRender="isRender"></v-page>
		</div>
	</div>
</template>

<script>
	import page from './page.vue'

	export default {
		props: ['isRender'],
		components: {
			vPage: page
		}
	}
	
</script>

<style>
	.phone_case{
		padding-bottom: 10px;
		overflow-x: scroll;
		flex: 3;
		border-right: 1px solid #ddd;
	}
	.phone_title{
		padding: 0 0 15px 30px;
	}
	.phone_box{
		margin: 0 auto;
		position: relative;
		width: 375px;
		height: 667px;
		border: 1px solid #666;
		box-shadow: 0 0 6px 0 #000;
		overflow-y: scroll;
	}
	.phone_box>div{
		cursor: pointer;
	}
</style>