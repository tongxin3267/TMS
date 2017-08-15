<script>
	export default {
		props: ['targetForms'],
		render: function(h){
			var tempForm = this.$store.state.tree[this.targetForms];
			if(tempForm != undefined){
				var formArr = [];
				var props = tempForm.props;
				for(var i in props){
					var type = props[i].type;
					formArr.push(h(require('../forms/'+ type +'.vue'),{
						props: {
							//表单内容
							data: props[i].content,
							//编辑区名字（双向绑定用）
							name: i,
							//表单标题
							title: props[i].title
						}
					}))
				}
				return h(
					'div',
					{
						class: "form"
					},
					formArr
				)
			}
		}
	}
</script>