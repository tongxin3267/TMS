<template>
	<div class="sidebar">
		<h3 class="title">组件分类</h3>
		<ul class="list">
			<li class="item" v-for="(value, key) in sidebar" :keys="key.id">
				<h4>{{ key }}</h4>
				<ul class="sub_list">
					<template v-for="item in value" :keys="item.id">
						<li :data-id="item.id" draggable="true" @dragstart="handleDragstart($event)">{{item.name}}</li>
					</template>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: ['sidebar'],
		methods: {
			handleDragstart: function(e){
				e.dataTransfer.setData("text", e.target.dataset.id)
			}
		}
	}
</script>

<style scoped>
	.sidebar{
		flex: 1;
		padding-left: 20px;
		border-right: 1px solid #ddd;
		background: #fcfcfc;
		overflow-x: scroll;
	}
	.sidebar .title{
		color: #222;
	}
	.sidebar .item{
		padding-top: 20px;
	}
	.sidebar .item>h4{
		color: #666;
		padding-bottom: 10px;
	}
	.sidebar .sub_list{
		padding-left: 15px;
	}
	.sidebar .sub_list>li{
		color: #999;
		line-height: 30px;
		cursor: pointer;
		white-space: nowrap;
	}
</style>