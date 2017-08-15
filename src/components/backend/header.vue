<template>
	<header class="header flex">
		<div class="logo flex_item">
			<img class="img" src="../../assets/logo.png" alt="">
			<div class="txt">{{name}}</div>
		</div>
		<div class="login_case">
			<div class="login">退出</div>
		</div>
	</header>
</template>

<script>
	export default {
		data: function(){
			return {
				name: '掌阅活动配置后台'
			}
		}
	}
</script>

<style scoped>
	.header{
		padding-left: 15px;
		height: 60px;
		line-height: 60px;
		background: #fcfcfc;
		border-bottom: 1px solid #ddd;
	}
	.img{
		width: 35px;
		height: 35px;
	}
	.txt{
		display: inline-block;
		color: #222;
		font-size: 20px;
		vertical-align: top;
	}
	.login_case{
		text-align: right;
	}
	.login{
		width: 50px;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
		display: inline-block;
	}
</style>