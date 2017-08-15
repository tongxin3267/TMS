//后台
import home from '@/components/backend/'

export default {
	render: function(h){
		return h(
			'div', 
			{
				class: 'app'
			}, 
			[
				h(home)
			]
		)
	}
}