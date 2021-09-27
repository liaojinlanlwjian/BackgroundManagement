import request from '../config/request.js'

export function getCoupons(){
	return request({ url: '/couponsList',method: 'get'})
}
export function getCoupons_type(type){
	return request({ url: '/couponsList/?type=' +type,method: 'get'})
}
export function getCoupons_name(name){
	return request({ url: '/usercouponsList/?name=' +name,method: 'get'})
}
export function getCoupons_name_status(name,status){
	return request({ url: '/usercouponsList/?name=' +name + '&status=' +status ,method: 'get'})
}
export function addCoupons(params){
	return request({ url: '/couponsList',method: 'post_noqs',data:params})
}
export function putCoupons(id,params){
	return request({ url: '/couponsList/' + id ,method: 'put',data:params})
}
export function delCoupons(id){
	return request({ url: '/couponsList/' + id,method: 'delete'});
}
export function patchCoupons(id,params){
	return request({ url: '/couponsList/' +id,method: 'patch',data:params})
}
export function addUserCoupons(params){
	return request({ url: '/usercouponsList',method: 'post_noqs',data:params})
}
export function patchPo(id,params){
	return request({ url: '/buyList/' +id,method: 'patch',data:params})
}
export function getuserList(){
	return request({ url: '/userList',method: 'get'})
}