<template>
	<div>
		<v-head></v-head>
		<div class="create">
			<el-button type="primary" @click="goEdit"><span class="add">+</span> 新建</el-button>
			<div class="search">
				<el-input placeholder="搜索" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
			</div>
		</div>
		<div class="form">
	  		<el-table :data="tableData" border style="width: 100%">
			    <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
			    <el-table-column prop="id" label="活动ID" width="160"></el-table-column>
			    <el-table-column prop="name" label="活动名称" width="120"></el-table-column>
			    <el-table-column prop="brief" label="活动简介"></el-table-column>
			    <el-table-column prop="status" label="状态" width="100"></el-table-column>
			    <el-table-column fixed="right" label="操作" width="140">
			      <template scope="scope">
			        <el-button @click="handleClick" type="text" size="small">预览</el-button>
			        <el-button type="text" size="small">编辑</el-button>
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		<div class="view">
			<el-button-group>
			  	<el-button type="primary" icon="arrow-left">上一页</el-button>
			</el-button-group>
			<el-button-group>
				<el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</el-button-group>
		</div>
	</div>
</template>

<script>
	import vHead from './header'
	import router from 'vue-router'
  	export default {
  		components: {
			vHead: vHead
		},
    	methods: {
    		goEdit: function(){
    			this.$router.push('Edit');
  				this.$store.commit("clearTree")
    		},
	      	handleClick: function() {
	        	alert(1)
	      	},
	      	handleIconClick(ev) {
		      console.log(ev);
		    }
   		},
    	data: function() {
      		return {
      			input2: '',
	        	tableData: [
	        		{
		          		date: '2016-05-03',
		          		name: '九周年活动',
		          		id: '1503902592039',
		          		status: '已上线',
		          		brief: '这是一个九周年活动配置也，这是一个九周年活动配置也，这是一个九周年活动配置也，'
	        		}, 
	        		{
			          date: '2016-05-02',
			          name: '王小虎',
			          id: '1503902744418',
			          status: '已下线',
			          brief: '这是一个九周年活动配置也，这是一个九周年活动配置也，这是一个九周年活动配置也，'
	        		}, 
	        		{
			          date: '2016-05-04',
			          name: '八周年活动',
			          id: '1503902751977',
			          status: '已下线',
			          brief: '这是一个九周年活动配置也，这是一个九周年活动配置也，这是一个九周年活动配置也，'
	        		}, 
	        		{
			          date: '2016-05-01',
			          name: '七周年活动',
			          id: '1503902758583',
			          status: '已上线',
			          brief: '这是一个九周年活动配置也，这是一个九周年活动配置也，这是一个九周年活动配置也。'
	        		}
	        	]
      		}
    	}
  	}
</script>

<style scoped>
	.create{
		padding: 20px 40px 0;
	}
	.form{
		padding: 20px;
	}
	.add{
		font-size: 20px;
	}
	.view{
		padding: 0 20px;
		text-align: right;
	}
	.search{
		display: inline-block;
		float: right;
	}
</style>