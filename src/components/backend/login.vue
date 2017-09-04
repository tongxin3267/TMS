<template>
	<div class="login_bg">
		<div class="login">
			<div class="title">登录</div>
			<el-input @focus="handleAccount" @blur="handleBlur" class="input" v-model="account" placeholder="请输入账号" size="large"></el-input>
			<el-input type="password" @focus="handlePassword" @blur="handleBlur" class="input" v-model="password" placeholder="请输入密码" size="large"></el-input>
			<div class="btn" @click="login">登录</div>
			<div class="panda" v-bind:class="{greet: isGreet, blind: isBlind}"></div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	var API = 'http://172.16.1.66:9999/users/'
	export default {
		data: function(){
			return {
				account: '',
				password: '',
				isGreet: false,
				isBlind: false
			}
		},
		methods: {
			login: function(){
				var _self = this;
				var account = this.account;
				var password = this.password;
				if(account == ""){
					_self.tips("请输入账号!", "error")
					return
				}
				if(password == ""){
					_self.tips("请输入密码!", "error")
					return
				}
				axios({
					method: 'get',
					url: API + account
				})
				.then(function(res){
					if(res.data.password !== password){
						_self.tips("密码输入错误!","error");
						return
					}
					if(res.data.account === account && res.data.password === password){
						_self.$router.push("Index")
					}
				})
				.catch(function(err){
					_self.tips("账户不存在!", "error")
				})
			},
			handleAccount: function(){
				this.isGreet = true;
				this.isBlind = false;
			},
			handlePassword: function(){
				this.isGreet = false;
				this.isBlind = true;
			},
			handleBlur: function(){
				this.isGreet = false;
				this.isBlind = false;
			},
			//提示
			tips: function(msg, type){
				var config = {
		          	message: msg,
		          	type: type
				}
				type ? config.type = type : '';
				this.$message(config);
			},
		}
	}
</script>

<style scoped>
	.login_bg{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: url("/static/i/bg.jpg") no-repeat center;
		-webkit-background-size: cover;
		background-size: cover;
	}
	.login{
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		width: 320px;
		padding: 20px 20px 40px;
		background: rgba(34,34,34,.6);
		border-radius: 2px;
	}
	.title{
		color: #ddd;
		font-size: 20px;
		margin-bottom: 20px;
	}
	.input{
		margin-bottom: 20px;
	}
	.btn{
		margin-top: 10px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		color: #fff;
		font-size: 14px;
		background: #20a0ff;
		border-radius: 4px;
	}
	.btn:hover{
		background: #4db3ff;
	}
	.panda{
		width: 120px;
		height: 95px;
		position: absolute;
		top: -79px;
		left: 50%;
		margin-left: -60px;
		background: url("/static/i/normal.png") no-repeat center;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	.blind{
		top: -73px;
		background: url("/static/i/blindfold.png") no-repeat center;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	.greet{
		top: -72px;
		background: url("/static/i/greeting.png") no-repeat center;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
</style>