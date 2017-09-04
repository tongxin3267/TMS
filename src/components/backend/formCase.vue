<template>
	<div class="form">
		<div class="inputCase">
			<div class="title">活动名称:</div>
			<div class="input">
				<el-input v-model="input" placeholder="请输入活动名称"></el-input>
			</div>
		</div>
		<div class="inputCase">
			<div class="title">活动简介:</div>
			<div class="input">
				<el-input
				  	type="textarea"
				  	:rows="2"
				  	placeholder="请输入活动简介"
				  	v-model="textarea">
				</el-input>
			</div>
		</div>
		<v-form :targetForms="targetForms"></v-form>
	</div>
</template>

<script>
	import form from './form.vue'

	export default {
		computed: {
	  		input: {
	  			get: function(){
	  				return this.$store.state.activityName
	  			},
	  			set: function(val){
	  				this.$store.commit('setActivityName', {
	  					name: val
	  				})
	  			}
	  		},
	  		textarea: {
	  			get: function(){
	  				return this.$store.state.activityBrief
	  			},
	  			set: function(val){
	  				this.$store.commit('setActivityBrief', {
	  					name: val
	  				})
	  			}
	  		}
	  	},
		props: ['targetForms'],
		components: {
			vForm: form
		}
	}
</script>

<style>
	.form{
		padding: 20px;
		flex: 2;
		box-sizing: border-box;
	}
	.inputCase{
		margin-bottom: 20px;
	}
</style>