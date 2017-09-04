import Vue from 'vue'
import Vuex from 'vuex'
import componentsList from '../core/sidebar.js'

Vue.use(Vuex);

import mutations from './mutations.js'
import actions from './actions.js'

export default new Vuex.Store({
	state: {
		//组件列表
		sidebar: componentsList,
		//tree
		tree: [],
		//激活组件渲染
		isRender: false,
		//渲染指定组件的表单
		targetForms: '',
		//活动名称
		activityName: '',
		//活动简介
		activityBrief: '',
		//当前页面ID
		curActivityId: 0
	},
	mutations: mutations,
	actions: actions
})