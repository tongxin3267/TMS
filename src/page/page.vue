<script>
	export default {
		render: function(h){
			var isRender = this.$store.state.isRender;
			var tempArr = [];
			console.log(this.$store.state)
			this.$store.state.tree.forEach(function(item, idx, arr){
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