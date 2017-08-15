<template>
	<div class="rules">
		<div class="title" v-html="data.title.content"></div>
		<div class="content" v-html="data.rules.content"></div>
	</div>
</template>

<script>
	export default {
		props: ['data']
	}
</script>

<style scoped>
	.rules{
		padding: 15px;
		color: #666;
		font-size: 12px;
	}
	.title{
		color: #111;
		font-size: 14px;
		margin-bottom: 10px;
	}
</style>