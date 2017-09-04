<template>
	<div class="controller">
		<div class="item">
			<el-button type="primary" :loading="preIsLoading" @click="preview">预览</el-button>
		</div>
		<div class="item">
			<el-button type="primary" :loading="pubIsLoading" @click="publish">发布</el-button>
		</div>
		<div class="QRcode" v-show="isShow">
			<div class="image">
				<img class="img" :src="qrcode" alt="">
				<span class="close" @click="close">×</span>
			</div>
		</div>
	</div>
</template>

<script>	
	import axios from 'axios'

	var ip = 'http://172.16.1.66'
	export default {
		data: function(){
			return {
				preIsLoading: false,
				pubIsLoading: false,
				qrcode: '',
				isShow: false
			} 
		},
		methods: {
			//预览
			preview: function(){
				var pageId = Date.now();
				var _self = this;
				var activityName = this.$store.state.activityName;
				//data
				var pageData = {
					data: _self.$store.state.tree,
					config: {
						dir: 'preview',
						subDir: pageId,
						title: activityName
					}
				};
				//no page config 
				if(!pageData.data.length) {
					_self.tips('没有配置页面哦!')
					return
				}
				//loading
				_self.preIsLoading = !_self.preIsLoading;
				//post
				this.post(pageData, function(res){
					_self.preIsLoading = !_self.preIsLoading;
					_self.isShow = !_self.isShow;
					_self.qrcode = res.data.url;
				}, function(error){
					_self.tips('网络请求失败!', 'error')
				})
			},
			//发布
			publish: function(){
				var _self = this;
				var pageId = new Date();
				var curId = this.$store.state.curActivityId;

				if(curId){
					pageId = new Date(curId);
				}
				var activityName = this.$store.state.activityName;
				var activityBrief = this.$store.state.activityBrief;
				if(activityName == ''){
					_self.tips('请输入活动名称', 'error');
					return
				}
				if(activityBrief == ''){
					_self.tips('请输入活动简介', 'error');
					return
				}
				var pageData = {
					data: _self.$store.state.tree,
					config: {
						dir: 'dist',
						subDir: +pageId,
						title: activityName
					}
				};
				if(!pageData.data.length) {
					_self.tips('没有配置页面哦!')
					return
				}
				//loading
				_self.pubIsLoading = !_self.pubIsLoading
				//post
				this.post(pageData, function(res){
					_self.pubIsLoading = !_self.pubIsLoading
					_self.tips('发布成功!', 'success')
				}, function(error){
					_self.tips('网络请求失败!', 'error')
				})

				//mock data
				if(curId){
					axios({
						method: 'put',
						url: ip + ':9999/pages/'+curId,
						data: {
							id: +pageId,
							name: activityName,
							brief: activityBrief,
							date: pageId.getFullYear()+'-'+(pageId.getMonth()+1)+'-'+pageId.getDate(),
							state: '已上线',
							data: _self.$store.state.tree
						}
					})
				}else{
					axios({
						method: 'post',
						url: ip + ':9999/pages',
						data: {
							id: +pageId,
							name: activityName,
							brief: activityBrief,
							date: pageId.getFullYear()+'-'+(pageId.getMonth()+1)+'-'+pageId.getDate(),
							state: '已上线',
							data: _self.$store.state.tree
						}
					})
				}
			},
			//bundle ajax
			post: function(data, sucess, error){
				axios({
				  	method: 'post',
				  	url: '/bundle',
				  	baseURL: ip + ':3000',
				  	withCredentials: true,
				  	data: data
				})
				.then(function(res){
					sucess(res)
				})
				.catch(function(error){
					error(error)
				})
			},
			//提示
			tips: function(msg, type){
				var config = {
					showClose: true,
		          	message: msg
				}
				type ? config.type = type : '';
				this.$message(config);
			},
			//二维码弹窗关闭
			close: function(){
				this.isShow = !this.isShow
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
		position: relative;
		margin-left: 5px;
		display: inline-block;
	}
	.btn{
		padding: 5px 10px;
		background: #0599d9;
		border-radius: 4px;
		color: #fff;
		font-size: 14px;
		cursor: pointer;
	}
	.btn:hover{
		background: #0b80b3;
		color: #f1f1f1;
	}
	.loading{
		position: absolute;
    	left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
    	border-radius: 4px;
    	cursor: pointer;
	    background: rgba(34,34,34,.8) url('../../assets/loading.gif') no-repeat center;
	    -webkit-background-size: 20px 20px;
	    background-size: 20px 20px;
	}
	.QRcode{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.2);
    	z-index: 3;
	}
	.image{
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -200px;
		margin-top: -200px;
		width: 400px;
		height: 400px;
		background: #fff;
	}
	.img{
		width: 200px;
		height: 200px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -100px;
		margin-top: -100px;
	}
	.close{
		position: absolute;
		right: 0;
		top: 0;
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		color: #000;
		font-size: 30px;
		cursor: pointer;
	}
</style>