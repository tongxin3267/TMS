<template>
	<div class="tree">
		<ul>
			<li>
				<h3 class="title">结构树</h3>
			</li>
			<li class="item" v-for="(item, index) in templateTree">
				<div class="box" :data-idx="index" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)" @dragleave="dragleave($event)"></div>
				<div class="tempbox">
					<div class="temp" @click="selectTemp($event)" draggable="true"  @dragstart="handleDragstart($event)" :data-idx="index">
						{{ item }} 
						<div class="delete" :data-idx="index" @click="deleteTemp($event)">×</div>
					</div>	
				</div>
			</li>
			<li>
				<div class="box" data-idx='-1' @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)" @dragleave="dragleave($event)"></div>
			</li>
		</ul>
	</div>
</template>

<script>

	import uuid from '../../core/generateUuId.js'

	export default {
		props: {
			templateTree: {
				type: Array,
				default: function(){
					return {}
				}
			}
		},
		methods: {
			dragenter: function(e){
				e.preventDefault();
				e.target.style.background = '#fafaea'
			},
			dragover: function(e){
				e.preventDefault()
			},
			dragleave: function(e){
				e.target.style.background = '#fcfcfc'
			},
			drop: function(e){
				e.target.style.background = '#fcfcfc';
				var temp = e.dataTransfer.getData('text');
				var target = e.target.dataset.idx;
				//触发模板渲染
				this.$store.commit('tempRender', this.$store.state.isRender)
				//添加模板 和 调整模板位置
				if(/[0-9]+/.test(temp)){
					if(temp == target) return;
					if(temp < target){
						this.changePosition(temp, target-1)	
					}else{
						this.changePosition(temp, target)	
					}
				}else{
					this.addTemplate(temp, target)	
				}
			},
			handleDragstart: function(e){
				e.dataTransfer.setData("text", e.target.dataset.idx)
			},
			//添加模板
			addTemplate: function(temp, target){
				var templateData = require('../widgets/' + temp+ '/' + temp + '.js');
				templateData.default['uuid'] = uuid();
				//深度拷贝
				var tempObj = JSON.parse(JSON.stringify(templateData.default));
				this.$store.commit('setTempData', {tempData: tempObj, target: target})
			},
			//调整模板位置
			changePosition: function(self, target){
				this.$store.commit('changePosition', {
					self: self,
					target: target
				})
			},
			//选择组件
			selectTemp: function(e){
				this.$store.commit('selectTemp', e.target.dataset.idx)
			},
			//删除组件
			deleteTemp: function(e){
				this.$store.commit('deleteTemp', e.target.dataset.idx)
			}
		}
	}
	
</script>

<style scoped>
	.tree{
		flex: 1;
		overflow: scroll;
		padding-left: 20px;
		width: 200px;
		border-right: 1px solid #ddd;
		background: #fcfcfc;
		overflow: scroll;
		box-sizing: border-box;
	}
	.item, .item_head{
		position: relative;
		padding-left: 10px;
		border-left: 1px solid #ddd;
	}
	.item:after, .item_head:after{
		content: "";
		position: absolute;
		left: -3px;
		bottom: 18px;
		width: 5px;
		height: 5px;
		background: #ddd;
		border-radius: 50%;
	}
	.box{
		margin-right: 20px;
		height: 30px;
	}
	.temp{
		position: relative;
		display: inline-block;
		border: 1px solid #eee;
		border-radius: 4px;
		padding: 0 5px;
		cursor: pointer;
		color: #999;
		background: #f1f1f1;
	}
	.tempbox{
		padding: 5px 0;
	}
	.tempbox:hover .delete{
		display: block;
	}
	.delete{
		display: none;
		position: absolute;
	    right: -14px;
	    top: -14px;
	    width: 20px;
	    height: 20px;
	    line-height: 20px;
	    text-align: center;
	    font-weight: lighter;
	    color: #E8554D;
	    font-size: 16px;
	}
</style>