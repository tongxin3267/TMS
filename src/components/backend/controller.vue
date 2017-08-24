<template>
	<div class="controller">
		<div class="item">保存</div>
		<div class="item">预览</div>
		<div class="item" @click="publish">发布</div>
	</div>
</template>

<script>	
	import axios from 'axios'
	export default {
		methods: {
			publish: function(){
				var _self = this;
				var tree = _self.$store.state.tree
				//触发模板渲染
				this.$store.commit('tempRender', this.$store.state.isRender)
				if(!tree.length) {
					console.log('没有配置页面哦！')
					return
				}
				axios({
				  	method: 'post',
				  	url: '/bundle',
				  	baseURL: 'http://localhost:3000',
				  	withCredentials: true,
				  	data: {
				  		tree: tree
				  	}
				})
				.then(function(res){
					console.log(res.data)
				})
			}
		}
	}
</script>

<style scoped>
	.controller{
		padding: 10px 40px 0;
		text-align: right;
	}
	.item{
		margin-left: 5px;
		display: inline-block;
		padding: 5px 10px;
		background: #0599d9;
		border-radius: 4px;
		color: #fff;
		font-size: 14px;
		cursor: pointer;
	}
	.item:hover{
		background: #0b80b3;
		color: #f1f1f1;
	}
</style>