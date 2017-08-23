<script>
	export default {
		render: function(h){
			//tree post 过来的数据
			tree.forEach(function(item, idx, arr){
				var tempName = item.id;
				var temp = require('@/components/widgets/'+tempName+'/'+tempName+'.vue')
				tempArr.push(h(temp, {
					props: {
						data: item.props
					}
				}))
			})
			return h(
				'div',
				{
					class: 'box'
				},
				tempArr
			)
		}
	}
</script>