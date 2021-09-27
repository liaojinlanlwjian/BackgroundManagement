import request from '../config/request.js'

export function menusearch(){
	return request({ url: '/menuList',method: 'get'})
}
export function menusearch_ljl_lwj(){
	return request({ url:'/menuList/?id=' + 2 + '&id=' +3 + '&id=' +4 + '&id=' +5 , method: 'get'})
}
export function menusearch_other(){
	return request({ url: '/menuList/?id=' + 5,method: 'get'})
}
export function changeMenu(id,params){
	return request({ url: '/menuList/' +id,method: 'patch',data:params})
}
export function addMenulala(params){
	return request({ url: '/menuList',method: 'post_noqs',data:params})
}
export function delMenulala(id){
	return request({ url: '/menuList/' +id,method: 'delete'})
}
function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}
export function getHeadshot(){
	var name=getCookie("name1");
	return request({ url: '/user/?name=' + name,method: 'get'})
}