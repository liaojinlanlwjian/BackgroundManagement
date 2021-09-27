<template>
	<div>
		<el-container style="height: 738px; background-color: #f7f7f8;">
			<el-aside :style="lineProgress">
				<div
					style="width: 100%; height: 61px;text-align: center;border-bottom: 1px solid #f5f5f5;background-color: #6a2c70;">
					<span ref="mange"
						style="font-size: 16px;  font-family: 微软雅黑体; line-height: 61px;color: #fff;">管理后台</span>
				</div>
				<el-menu v-for="(o,i) in list" :key="o.id">
					<el-menu-item>
						<i :class="o.icon"></i>
						<router-link style="color: #000;text-decoration: none;" :to="o.url">{{o.title}}</router-link>
					</el-menu-item>
				</el-menu>

				<el-menu @select="handleSelect" text-color="#000" :default-active="$route.path">
					<el-submenu v-for="(item,i) in menuList" :key="item.id" ref="coco" :index="item.id  + ''">
						<template slot="title"><i :class="item.icon"></i>{{item.title}}
						</template>
						<el-menu-item v-for="(sub,s) in item.submenu" :key="sub.id" :index="sub.url">
							{{sub.title}}{{sub.url}}
						</el-menu-item>

					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header style="font-size: 12px;display: flex;background-color: #f6f6f6;">
					<div class="grid-content bg-purple" style="line-height: 60px; margin-right: 10px; font-size: 18px;"
						@click="Retraction()">
						<i ref="on" size="medium" class="el-icon-d-arrow-left"></i>
					</div>
					<div style="width: 1300px;">
						<el-breadcrumb separator="/" style="line-height: 60px;">
							<el-breadcrumb-item :to="{path:'/index'}">首页</el-breadcrumb-item>
							<el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">
								{{item}}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div style="width: 170px; display: flex;">
						<div style="line-height: 58px;">
							<el-dropdown>
								<i class="el-icon-setting" style="margin-right: 15px"></i>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="logout()">注销</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span>{{name}}</span>
						</div>

						<div style=" line-height: 90px;margin-left: 18px;">
							<el-avatar :src="src"></el-avatar>
						</div>
					</div>




				</el-header>

				<el-main style="margin-top: 20px;">
					<router-view />
				</el-main>
			</el-container>
		</el-container>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>
<style scoped="scoped">
	.el-header {
		box-shadow: 5px 0px 5px #888888;
		color: #333;
	}

	.el-aside {
		color: #333;
		transition: width 0.5s linear 0.2s;
	}
</style>
<script>
	import {
		menusearch,
		menusearch_ljl_lwj,
		menusearch_other,
		getHeadshot
	} from '../comoon/api/menu.js'
	import axios from "axios"
	export default {
		data() {
			return {
				linePercentage: 200,
				heiPercentage: 738,
				baccolor: '#fff',
				retraction: true,
				dialogVisible: false,
				sum: [1, 2],
				name: '',
				src: '',
				list: [{
						id: 1,
						title: '首页',
						url: '/index',
						icon: 'el-icon-s-home',
					},
					{
						id: 2,
						title: '个人中心',
						url: '/userInfo',
						icon: 'el-icon-s-opportunity',
					},
				],
				menuList: [],
				activeIndex: '/index/index',
			}
		},
		computed: {
			lineProgress() {
				const style = {}
				style.width = this.linePercentage + 'px';
				style.height = this.heiPercentage + 'px';
				style.backgroundColor = this.baccolor;

				return style
			}
		},
		mounted: function() {

			// this.name = localStorage.getItem('name'); //获取会员真实用户名
			this.name = this.$cookies.get('name1');
			this.getdata();
			this.getMenu();
			//权限判定是否已登录，没有登录跳转到登录页面；
			if (this.name == null) {
				this.$router.push({
					'path': '/login'
				}); //跳转到登录页面
			}
		},
		methods: {
			Retraction() {
				if (this.$data.retraction == true) {
					this.$data.linePercentage = '41';
					this.$data.retraction = !this.$data.retraction;
					this.$refs.on.className = 'el-icon-d-arrow-right';
					this.$refs.mange.style.fontSize = '8px';
				} else {
					this.$data.linePercentage = '200';
					this.$data.retraction = !this.$data.retraction;
					this.$refs.on.className = 'el-icon-d-arrow-left';
					this.$refs.mange.style.fontSize = '16px';
				}
			},
			handleSelect(key, keyPath) {
				this.$router.push(key);
				//   this.$router.push({path: '/home'});
			},
			//关闭对话框按钮
			handleClose() {
				this.dialogVisible = false;
			},
			getMenu() {
				if (this.name == 'admin')
					menusearch().then(response => {
						this.menuList = response;
					}, response => {
						console.log("error");
					})

				else if (this.name == 'ljl' || this.name == 'lwj')
					menusearch_ljl_lwj().then(response => {
						this.menuList = response;
					}, response => {
						console.log("error");
					})
				else
					menusearch_other().then(response => {
						this.menuList = response;
					}, response => {
						console.log("error");
					})

			},
			getdata() {
				getHeadshot().then(response => {
					this.src = response[0].src;
				}, response => {
					console.log("error");
				})
			},
			logout() {
				//console.log("aaaa");
				//localStorage.clear();//清除全部本地存储
				// localStorage.clearitem('name');//指定删除本地存储信息
				this.$confirm('确认注销登录？')
					.then(_ => {
						//localStorage.setItem('name', ''); //重新赋值name为空
						this.$cookies.remove('name1');
						this.$router.push({
							'path': '/login'
						}); //跳转到登录页面
					})
					.catch(_ => {});


			}
		},

	};
</script>
