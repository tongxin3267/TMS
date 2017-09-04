<template>
	<div>
		<v-head></v-head>
		<div class="create">
			<el-button type="primary" @click="goEdit"><span class="add">+</span> 新建</el-button>
			<div class="search">
				<el-input placeholder="搜索" icon="search" v-model="input" :on-icon-click="search"></el-input>
			</div>
		</div>
		<div class="form">
	  		<el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			    <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
			    <el-table-column prop="id" label="活动ID" width="160"></el-table-column>
			    <el-table-column prop="name" label="活动名称" width="120"></el-table-column>
			    <el-table-column prop="brief" label="活动简介"></el-table-column>
			    <el-table-column prop="state" label="状态" width="100"></el-table-column>
			    <el-table-column fixed="right" label="操作" width="140">
			      <template scope="scope">
			        <el-button type="text" size="small" @click="preview(scope.$index)">预览</el-button>
			        <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>
			        <el-button type="text" size="small" @click="kill(scope.$index)">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		<div class="view">
			<div class="block">
			    <el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="pageSizes"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalPage">
			    </el-pagination>
		  </div>
		</div>
		<div class="preview" v-show="isShowPrview">
			<div class="previewCase">
				<div class="phoneCase">
					<iframe :src="previewUrl" frameborder="0" width="100%" height="100%"></iframe>
				</div>
				<div class="qrcode">
					<canvas id="canvas"></canvas>
				</div>
				<div class="close" @click="closePreview">×</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import vHead from './header'
	import qrcode from 'qrcode'

	var previewAPI = 'http://lp.dev.iovp.com/TMS/dist/';
	var ip = 'http://172.16.1.66';
  	export default {
  		mounted: function(){
  			var _self = this;
  			//获取初始数据
  			axios({
  				method: 'get',
  				url: _self.url
  			})
  			.then(function(res){
  				var len = res.data.length;
  				//get datas
  				var totalPage = len;
  				var currentPage = 1;
  				var pageSizes = [10,20,50,100];
  				var pageSize = 10;
  				//set datas
  				_self.totalPage = totalPage;
  				_self.currentPage = currentPage;
  				_self.pageSizes = pageSizes;
  				_self.pageSize = pageSize;
  				//get page datas
  				_self.getPageData(pageSize, currentPage)
  			})
  		},
  		data: function() {
      		return {
      			//搜索
      			input: '',
      			//页面表数据
	        	tableData: [],
	        	//总页面数
	        	totalPage: 0,
	        	//当前页
	        	currentPage: 0,
	        	//每页展示数量集
	        	pageSizes: [],
	        	//每页展示数量
	        	pageSize: 0,
	        	//api
	        	url: ip+':9999/pages',
	        	//预览地址
	        	previewUrl: '',
	        	//预览显示隐藏
	        	isShowPrview: false
      		}
    	},
  		components: {
			vHead: vHead
		},
    	methods: {
    		//新增活动
    		goEdit: function(){
    			//清除tree数据
  				this.$store.commit("clearTree");
  				//清除活动名字和简介
  				this.$store.state.activityName = '';
  				this.$store.state.activityBrief = '';
    			//跳转至编辑页
    			this.$router.push('Edit');
    			//清除页面Id
    			this.$store.commit('setCurActivityId', 0);
    		},
    		//搜索活动
	      	search(ev) {
	      		var _self = this;
	      		var val = _self.input;
	      		if(val == ''){
	      			axios({
						method: 'get',
						url: _self.url
					})
					.then(function(res){
						_self.tableData = res.data
					})
	      		}else{
	      			axios({
						method: 'get',
						url: _self.url + "?q=" + val
					})
					.then(function(res){
						_self.tableData = res.data
					})
	      		}
		    },
		    //关闭预览窗口
		    closePreview: function(){
		    	this.isShowPrview = !this.isShowPrview
		    },
		    //预览活动
	      	preview: function(e){
	      		//活动Id
	        	var activityId = this.tableData[e].id;
	        	//预览地址
	        	this.previewUrl = previewAPI + activityId;
	        	//生成二维码
	        	qrcode.toCanvas(canvas, this.previewUrl, function (error) {
				  	if (error) console.error(error)
				  	console.log('success!');
				});
				//显示隐藏
				this.isShowPrview = !this.isShowPrview
	      	},
    		//编辑活动
	      	edit: function(e) {
	      		var _self = this;
	      		//活动Id
	        	var activityId = this.tableData[e].id;
	        	//获取指定活动的预览数据
	        	axios({
	        		method: 'get',
	        		url: _self.url +'/'+ activityId
	        	})
	        	.then(function(res){
	        		//更新tree
	        		_self.$store.commit('setTree', res.data.data);
	        		//设置当前活动ID
	        		_self.$store.commit('setCurActivityId', res.data.id);
	        		//更新活动名称和简介
	        		_self.$store.state.activityName = res.data.name;
	        		_self.$store.state.activityBrief = res.data.brief;
	        		//跳转到预览页
	        		_self.$router.push('Edit');
	        		//默认选择第一个组件
	        		_self.$store.commit('selectTemp', 0)
	        	})
	      	},
		    //删除活动
		    kill: function(e){
		    	var _self = this;
		    	//活动Id
	        	var activityId = this.tableData[e].id;
	        	//确认删除
		    	this.$confirm('此操作将永久删除该活动页面, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(function(){
		        	//删除活动页的id
		        	axios({
		        		method: 'delete',
		        		url: _self.url+'/'+ activityId
		        	}).then(function(){
		        		//重新获取列表数据
		        		_self.getPageData(_self.pageSize, _self.currentPage)
		        	})
		        }).catch(function(){
		          	console.log('已取消删除!')          
		        });
		    },
		    //每页展示的活动页面数量
		    handleSizeChange(val) {
		    	this.pageSize = val;
		    	//更新展示活动数量
		    	this.getPageData(val, this.currentPage);
		        //console.log(`每页 ${val} 条`);
		    },
		    //当前页
			handleCurrentChange(val) {
				//展示当前活动页面
				this.getPageData(this.pageSize, val);
				//console.log(`当前页: ${val}`);
			},
			//获取分页数据
			getPageData: function(pageSize, currentPage){
				var _self = this;
				axios({
	  				method: 'get',
	  				url: _self.url+'?_limit='+pageSize+'&_page='+currentPage
	  			})
	  			.then(function(res){
	  				_self.tableData = res.data
	  			})
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
		padding: 0 20px 30px;
		text-align: right;
	}
	.search{
		display: inline-block;
		float: right;
	}
	.preview{
		z-index: 4;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(34,34,34,.3);
	}
	.previewCase{
		width: 800px;
		height: 600px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -300px;
		margin-left: -400px;
		background: #fff;
	}
	.phoneCase{
		position: absolute;
		left: 100px;
		top: 50%;
		margin-top: -284px;
	    width: 320px;
	    height: 568px;
		border: 1px solid #222;
	}
	.qrcode{
		width: 200px;
		height: 200px;
		position: absolute;
		right: 88px;
    	top: 50%;
    	margin-top: -100px;
	}
	.close{
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 40px;
		color: #666;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}
	#canvas{
		width: 100% !important;
		height: 100% !important;
	}
</style>