let routes = [{
		path: '/',//父级显示子级
		name: 'layout',
		redirect: '/index',
		//component:()=>import('../../views/layout.vue'),
		component: 'layout',
		//children嵌套路由
		children: [{
				path: '/index',
				name: 'index',
				//component:()=>import('../../views/index/index.vue'),//默认指定页面
				component: 'index/index',
			},
			{
				path: '/userInfo',
				name: 'userInfo',
				component: 'user/userInfo',
				meta: ['个人中心'],
			},
			{
				path: '/role',
				name: 'role',
				component: 'system/role',
				meta: ['系统管理', '角色管理'],
			},
			{
				path: '/cs',
				name: 'cs',
				component: 'system/cs',
				meta: ['系统管理', '客服管理'],
			},
			{
				path: '/menu',
				name: 'menu',
				component: 'system/menu',
				meta: ['系统管理', '菜单管理'],
			},
			{
				path: '/msg',
				name: 'msg',
				component: 'msg/index',
				meta: ['会员管理', '会员列表'],
			},
			{
				path: '/level',
				name: 'level',
				component: 'msg/test',
				meta: ['会员管理', '会员等级'],
			},
			{
				path: '/goods',
				name: 'goods',
				component: 'goods/mgegoods',
				meta: ['商城管理', '商城列表'],
			},
			{
				path: '/addGoods',
				name: 'addGoods',
				component: 'goods/addGoods',
				meta: ['商城管理', '商城列表','添加商品'],
			},
			{
				path: '/editGoods',
				name: 'editGoods',
				component: 'goods/editGoods',
				meta: ['商城管理', '商城列表','编辑商品'],
			},
			{
				path: '/po',
				name: 'po',
				component: 'orders/mgepo',
				meta: ['订单管理', '订单列表'],
			},
			{
				path: '/operation',
				name: 'operation',
				component: 'operation/index',
				meta: ['运营管理', '运营列表'],
			},
			{
				path: '/finance',
				component: 'finance/finance',
				meta: ['财务管理', '财务等级'],
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: 'login/index'
	},


	{
		path: '*',
		redirect: {
			name: 'index'
		},
	}
]

let getRoutes = function() {
	createRoute(routes);
	return routes
}
//自动生成路由
function createRoute(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i].component) return
		//自动生成component
		let componentFun = import(`../../views/${arr[i].component}.vue`)
		console.log(componentFun);
		arr[i].component = () => componentFun
		//根据数组循环children子页面
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children);
		}
	}
}
//返回调用
export default getRoutes()
