<template>
	<div class="formbox">
		<div class="title">{{ title }}:</div>
		<el-input
		  	type="textarea"
		  	:rows="2"
		  	placeholder="请输入内容"
		  	v-model="textarea">
		</el-input>
	</div>
</template>

<script>
	export default {
		props: ['data', 'name', 'title'],
		computed: {
	  		textarea: {
	  			get: function(){
	  				return this.data
	  			},
	  			set: function(val){
	  				this.$store.commit('updateMsg', {
	  					name: this.name,
	  					value: val
	  				})
	  			}
	  		}
	  	}
	}
</script>

<style scoped>
	.formbox{
		margin-bottom: 20px;
	}
</style>