import request from '../config/request.js'

export function getUser(){
	return request({ url: '/user',method: 'get'})
}
export function delUser(id){
	return request({ url: '/user/' + id,method: 'delete'});
	console.log(id);
}
export function patchUser(id,params){
	return request({ url: '/user/' +id,method: 'patch',data:params})
}