<template>
	<div class="wrap" id="wrap">
		<v-head></v-head>
		<v-controller></v-controller>
		<div class="case">
			<div class="section" id="section">
				<v-sidebar :sidebar="sidebar"></v-sidebar>
				<v-tree :templateTree="templateTree"></v-tree>
				<v-phone :isRender="isRender"></v-phone>
				<v-form :targetForms="targetForms"></v-form>
			</div>
		</div>
	</div>
	
</template>

<script>
	import vHead from './header'
	import vController from './controller'
	import vSidebar from './sidebar'
	import vTree from './tree'
	import vPhone from './phoneCase'
	import vForm from './formCase'
	
	export default {
		computed: {
			//资源树
			store: function(){
				return this.$store.state
			},
			//组件列表
			sidebar: function(){
				return this.$store.state.sidebar
			},
			//是否渲染
			isRender: function(){
				return this.$store.state.isRender
			},
			//表单渲染
			targetForms: function(){
				return this.$store.state.targetForms
			},
			//DOM树
			templateTree: function(){
				var treeArr = [];
				var tree = this.$store.state.tree;
				for(var i=0; i<tree.length; i++){
					treeArr.push(tree[i].name)
				}
				return treeArr;
			}
		},
		components: {
			vHead: vHead,
			vController: vController,
			vSidebar: vSidebar,
			vTree: vTree,
			vPhone: vPhone,
			vForm: vForm
		},
		mounted: function(){
			document.getElementById('section').style.height = (window.innerHeight - 101) + 'px'
		}
	}
</script>

<style>
	.wrap{
		display: flex;
		flex-direction: column;
	}
	.case{
		flex: 1;
	}
	.section{
		height: 100%;
		display: flex;
		background: #fcfcfc;
		box-sizing: border-box;
	}
</style>