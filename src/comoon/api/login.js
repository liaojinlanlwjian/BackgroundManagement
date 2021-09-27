import request from '../config/request.js'

export function getLogin(name){
	return request({ url: '/user/?name=' + name,method: 'get'})
}
export function getEnroll(params){
	return request({ url: '/user',method: 'post',data:params});
}
export function getUser(){
	return request({ url: '/userList',method: 'get'})
}