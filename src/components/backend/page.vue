<script>
	export default {
		props: ['isRender'],
		render: function(h){
			var isRender = this.isRender;
			var tempArr = [];
			this.$store.state.tree.forEach(function(item, idx, arr){
				var tempName = item.id;
				var temp = require('../widgets/'+tempName+'/'+tempName+'.vue')
				tempArr.push(h(temp, {
					props: {
						data: item.props
					}
				}))
			})
			return h(
				'div',
				{
					class: 'temp'
				},
				tempArr
			)
		}
	}
</script>