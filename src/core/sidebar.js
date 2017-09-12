var desc = require.context('@/components/widgets/', true, /\.js/);

var cache = {};

function importAll (r) {
	var list = {};
	r.keys().forEach(function(key){
		var classify = r(key).default.classify;
		var name = r(key).default.name;
		var id = r(key).default.id;
		if(list[classify] == undefined){
			list[classify] = [{name: name, id: id}]
		}else{
			list[classify].push({name: name, id: id})
		}
	});
	return list
}
export default importAll(desc)