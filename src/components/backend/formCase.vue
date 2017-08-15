<template>
	<div class="form">
		<v-form :targetForms="targetForms"></v-form>
	</div>
</template>

<script>
	import form from './form.vue'

	export default {
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
</style>