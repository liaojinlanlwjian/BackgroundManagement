import request from '../config/request.js'

export function getPo(){
	return request({ url: '/buyList',method: 'get'})
}
export function delPo(id){
	return request({ url: '/buyList/' + id,method: 'delete'});
	console.log(id);
}
export function patchPo(id,params){
	return request({ url: '/buyList/' +id,method: 'patch',data:params})
}
export function getuserList(){
	return request({ url: '/userList',method: 'get'})
}