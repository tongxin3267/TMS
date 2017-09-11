<template>
	<div class="formbox">
		<div class="title">{{ title }}:</div>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script>
	export default {
	  	props: ['data', 'name', 'title', 'getVal'],
	  	computed: {
	  		input: {
	  			get: function(){
	  				return this.data
	  			},
	  			set: function(val){
	  				this.getVal(val);
	  				// this.$store.commit('updateMsg', {
	  				// 	name: this.name,
	  				// 	value: val
	  				// })
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