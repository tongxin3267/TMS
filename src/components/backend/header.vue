<template>
	<header class="header flex">
		<div class="logo flex_item">
			<!-- <img class="img" src="../../assets/logo.png" alt=""> -->
			<div class="txt">{{name}}</div>
			<ul class="wrap">
				<li class="item" @click="activeList"><span class="text">活动列表</span></li>
			</ul>
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
				name: '活动配置后台'
			}
		},
		methods: {
			activeList: function(){
				this.$router.push('/');
				this.$store.commit("clearTree")
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
	.wrap{
		margin-left: 30px;
		display: inline-block;
	}
	.item{
		padding: 0 10px;
		cursor: pointer;
	}
	.item:hover{
		color: #20a0ff;
	}
	.text{
		display: inline-block;
	    line-height: 1em;
	    position: relative;
	    top: 10px;
	    font-size: 16px;
	}
</style>