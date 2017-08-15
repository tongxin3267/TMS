<template>
	<div class="formbox">
		<div class="title">{{ title }}:</div>
		<el-upload
		  	class="upload-demo"
		  	drag
		  	action=""
		  	multiple>
		  	<i class="el-icon-upload"></i>
		  	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  	<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</div>
</template>

<script>
	export default {
		props: ['data', 'title']
	}
</script>

<style scoped>
	.formbox{
		margin-bottom: 20px;
	}
</style>