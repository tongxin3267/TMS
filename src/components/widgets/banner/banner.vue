<template>
	<div class="box">
		<img class="img" :src="data.image.content" alt="">
	</div>
</template>

<script>
	export default {
		props: ['data']
	}
</script>

<style scoped>
	.box{
		min-height: 200px;
	}
	.img{
		width: 100%;
	}
</style>