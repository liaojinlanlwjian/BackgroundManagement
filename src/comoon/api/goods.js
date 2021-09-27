import request from '../config/request.js'
import qs from 'qs'

export function getGoods(){
	return request({ url: '/productList',method: 'get'})
}
export function getGoods_currentMonth(currentmonth){
	return request({ url: '/productList/?currentMonth=' + currentmonth,method: 'get'})
}
export function getGoods_currentDate(currentDate){
	return request({ url: '/productList/?currentDate=' + currentDate,method: 'get'})
}
export function delGoods(id){
	return request({ url: '/productList/' + id,method: 'delete'});
	console.log(id);
}
export function addGoods(params){
	return request({ url: '/productList',method: 'post_noqs',data:params})
}
export function putGoods(id,params){
	return request({ url: '/productList/' + id,method: 'put_noqs',data:params})
}
export function getBuyList(month){
	return request({ url: '/buyList/?month=' + month,method: 'get'})
}
export function getBuyList_time(time){
	return request({ url: '/buyList/?time=' + time,method: 'get'})
}
export function getBuy(){
	return request({ url: '/buyList',method: 'get'})
}