export default {
	//添加组件
	setTempData: function(state, data){
		var index = data.target == -1 ? state.tree.length+1 : data.target;
		state.tree.splice(index, 0, data.tempData);
		state.targetForms = data.target == -1 ? state.tree.length-1 : data.target
	},
	//改变已添加组件的顺序
	changePosition: function(state, position){
		var selfItem = state.tree.splice(position.self, 1)[0];
		var index = position.target == -1 ? state.tree.length : position.target;
		state.tree.splice(index, 0 , selfItem)
		state.targetForms = index
	},
	//组件渲染
	tempRender: function(state, data){
		state.isRender = !data
	},
	//选择组件
	selectTemp: function(state, data){
		state.targetForms = data
	},
	//更新表单及组件信息
	updateMsg: function(state, data){
		var index = state.targetForms;
		state.tree[index].props[data.name].content = data.value
	},
	//删除组件
	deleteTemp: function(state, data){
		state.tree.splice(data, 1)
	}
}