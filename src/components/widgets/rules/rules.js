export default {
	//模板id,与.vue文件和文件夹同名
	id: 'rules',
	//模板分类
	classify: '底部',
	//模板名字
	name: '温馨提示/规则',
	//模板和表单数据
	props: {
		//编辑区域
		title: {
			//表单描述
			title: '标题',
			//内容
			content: '活动规则',
			//表单类型
			type: 'input'
		},
		rules: {
			title: '内容',
			content: '1. 这是个活动规则内容 <br> 2. 这是两个活动规则内容',
			type: 'textarea'
		}
	}
}