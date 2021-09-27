<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6" v-for="(item,i) in cardList" :key="item.num">
				<el-card class="box-card">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-image style="width: 100px; height: 100px; border-radius: 50%;" :src="item.url">
							</el-image>
						</el-col>
						<el-col style="font-size: 14px; color: #CAC6C6;" :span="10">{{item.detail}}</el-col>
						<el-col style="margin-top: 10px; font-size: 18px;" :span="8">{{item.num}}</el-col>
						<el-col :span="8">
							<el-divider></el-divider>
						</el-col>
						<el-col style=" font-size: 14px; color: #CAC6C6;" :span="12"> <i
								:class="item.icon"></i>{{item.time}}</el-col>
					</el-row>
				</el-card>
			</el-col>


		</el-row>

		<el-row style="margin-top: 15px;" :gutter="26">
			<el-col :span="8">
				<el-card class="echart" shadow="hover">
					<div id="main" style="width:900px ;height:500px;"></div>
					<el-divider></el-divider>
					<span style="font-size: 12px;color: #a9a9b3;"> <i class="el-icon-time"></i> Campaign sent 2 days ago
					</span>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card class="echart" shadow="hover">
					<div id="mainn" style="width:1000px ;height:500px;"></div>
					<el-divider></el-divider>
					<span style="font-size: 12px;color: #a9a9b3;"> <i class="el-icon-refresh"></i> Updated 3 minutes ago
					</span>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top: 15px;" :gutter="26">
			<el-col :span="12">
				<el-card class="echart" shadow="hover">
					<div id="mainnn" style="width:900px ;height:500px;">
						<el-image style="width: 580px; height: 200px;" :src="src"></el-image>
						<el-collapse v-model="activeName" accordion>
							<el-collapse-item title="一致性 Consistency" name="1">
								<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
								<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
							</el-collapse-item>
							<el-collapse-item title="反馈 Feedback" name="2">
								<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
								<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
							</el-collapse-item>
							<el-collapse-item title="效率 Efficiency" name="3">
								<div>简化流程：设计简洁直观的操作流程；</div>
								<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
								<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
							</el-collapse-item>
							<el-collapse-item title="可控 Controllability" name="4">
								<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
								<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<el-divider></el-divider>
					<span style="font-size: 12px;color: #a9a9b3;"> <i class="el-icon-time"></i> Campaign sent 2 days ago
					</span>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="echart" shadow="hover">
					<div id="mainnnn" style="width:100% ;height:500px;"></div>
					<el-divider></el-divider>
					<span style="font-size: 12px;color: #a9a9b3;"> <i class="el-icon-refresh"></i> Updated 3 minutes ago
					</span>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	require('echarts/theme/shine'); //引入主题
	import axios from "axios"
	import {
		getuserList
	} from '../../comoon/api/po.js'
	import {
		getGoods,
		getBuy
	} from '../../comoon/api/goods.js'
	export default {
		data() {
			return {
				src: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.qUiRAAs0v4JPXICInJb1gwHaEK?pid=ImgDet&rs=1',
				cardList: [{
						url: 'https://tse1-mm.cn.bing.net/th/id/R-C.9b1c8824e1c590b85168a685d16d7779?rik=IuMLd8zLKULaig&riu=http%3a%2f%2fscimg.jianbihuadq.com%2ftouxiang%2f202004%2f202004012005563.jpg&ehk=6KHNHMUDgb%2f3XKVuFXGi5Lr7OXCA81g%2bTZIbzrdO3aU%3d&risl=&pid=ImgRaw&r=0',
						num: 143,
						detail: 'Numbers',
						icon: 'el-icon-refresh',
						time: 'Updated now'
					},
					{
						url: 'https://tse1-mm.cn.bing.net/th/id/R-C.5be1895658803d0b338ad6398933bdac?rik=VyyHjMHY28ogfg&riu=http%3a%2f%2fwww.gx8899.com%2fuploads%2fallimg%2f2018010908%2ft1f1qmt3iof.jpg&ehk=DlLA7jCKqVZV921rWUHVrAyPgQCqDoIVHk90jAokc%2f0%3d&risl=&pid=ImgRaw&r=0',
						num: '￥ 1,345',
						detail: 'Revenue',
						icon: 'el-icon-goods',
						time: 'Last day '
					},
					{
						url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.HK3eC1Elok3fnSVBSjJiWAAAAA?pid=ImgDet&rs=1',
						num: 546,
						detail: 'Orders',
						icon: 'el-icon-refresh',
						time: 'Updated now'
					},
					{
						url: 'https://pic.qqtn.com/up/2018-8/2018080608473330883.jpg',
						num: '+45K',
						detail: 'Goods',
						icon: 'el-icon-refresh',
						time: 'Updated now'
					},

				],
				activeName: '1',
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getPie();
				this.drawLine();
				this.getLine();
			});
			getuserList().then(res=>{
				this.cardList[0].num = res.length;
			},res=>{
				console.log("error");
			});
			getGoods().then(res=>{
				this.cardList[3].num = res.length;
			},res=>{
				console.log("error");
			});
			getBuy().then(res=>{
				this.cardList[2].num = res.length;
			},res=>{
				console.log("error");
			})
		},
		methods: {
			getLine() {
				var myChartss = echarts.init(document.getElementById('mainnnn'))

				const option2 = {
					title: {
						text: '浏览器占比变化',
						subtext: '纯属虚构',
						top: 10,
						left: 10
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						type: 'scroll',
						bottom: 10,
						data: (function() {
							var list = [];
							for (var i = 1; i <= 28; i++) {
								list.push(i + 2000 + '');
							}
							return list;
						})()
					},
					visualMap: {
						top: 'middle',
						right: 10,
						color: ['red', 'yellow'],
						calculable: true
					},
					radar: {
						indicator: [{
								text: 'IE8-',
								max: 400
							},
							{
								text: 'IE9+',
								max: 400
							},
							{
								text: 'Safari',
								max: 400
							},
							{
								text: 'Firefox',
								max: 400
							},
						]
					},
					series: (function() {
						var series = [];
						for (var i = 1; i <= 28; i++) {
							series.push({
								name: '浏览器（数据纯属虚构）',
								type: 'radar',
								symbol: 'none',
								lineStyle: {
									width: 1
								},
								emphasis: {
									areaStyle: {
										color: 'rgba(0,250,0,0.3)'
									}
								},
								data: [{
									value: [
										(40 - i) * 10,
										(38 - i) * 4 + 60,
										i * 5 + 10,
										i * 9,
										i * i / 2
									],
									name: i + 2000 + ''
								}]
							});
						}
						return series;
					})()
				};
				myChartss.setOption(option2)
			},
			drawLine() {
				var myCharts = echarts.init(document.getElementById('mainn'))
				const option1 = {
					color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
					title: {
						text: '各商品销量对比图'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data: ['电脑', '手机', '女装', '美妆', '男装']
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '22%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '电脑',
							type: 'line',
							stack: '总量',
							smooth: true,
							lineStyle: {
								width: 0
							},
							showSymbol: false,
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(128, 255, 165)'
								}, {
									offset: 1,
									color: 'rgba(1, 191, 236)'
								}])
							},
							emphasis: {
								focus: 'series'
							},
							data: [140, 232, 101, 264, 90, 340, 250]
						},
						{
							name: '手机',
							type: 'line',
							stack: '总量',
							smooth: true,
							lineStyle: {
								width: 0
							},
							showSymbol: false,
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(0, 221, 255)'
								}, {
									offset: 1,
									color: 'rgba(77, 119, 255)'
								}])
							},
							emphasis: {
								focus: 'series'
							},
							data: [120, 282, 111, 234, 220, 340, 310]
						},
						{
							name: '女装',
							type: 'line',
							stack: '总量',
							smooth: true,
							lineStyle: {
								width: 0
							},
							showSymbol: false,
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(55, 162, 255)'
								}, {
									offset: 1,
									color: 'rgba(116, 21, 219)'
								}])
							},
							emphasis: {
								focus: 'series'
							},
							data: [320, 132, 201, 334, 190, 130, 220]
						},
						{
							name: '美妆',
							type: 'line',
							stack: '总量',
							smooth: true,
							lineStyle: {
								width: 0
							},
							showSymbol: false,
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(255, 0, 135)'
								}, {
									offset: 1,
									color: 'rgba(135, 0, 157)'
								}])
							},
							emphasis: {
								focus: 'series'
							},
							data: [220, 402, 231, 134, 190, 230, 120]
						},
						{
							name: '男装',
							type: 'line',
							stack: '总量',
							smooth: true,
							lineStyle: {
								width: 0
							},
							showSymbol: false,
							label: {
								show: true,
								position: 'top'
							},
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(255, 191, 0)'
								}, {
									offset: 1,
									color: 'rgba(224, 62, 76)'
								}])
							},
							emphasis: {
								focus: 'series'
							},
							data: [220, 302, 181, 234, 210, 290, 150]
						}
					]
				};


				myCharts.setOption(option1)
			},
			getdata() {
				axios.post('http://shop.ueoa.net/manage/login', {
					name: "admin",
					password: "123456",
					repassword: "123456"
				}).then(response => {
					console.log(response.data);
				}, response => {
					console.log("error");
				});
			},
			getPie() {
				// 绘制图表
				var myChart = echarts.init(document.getElementById('main'))
				// 指定图表的配置项和数据
				var option = {
					//标题
					title: {
						text: 'Behavior Statistics',
						subtext: 'Last Campaign Performance',
						x: 'left', //标题位置
						// textStyle: { //标题内容的样式
						//   color: '#000',
						//   fontStyle: 'normal',
						//   fontWeight: 100,
						//   fontSize: 16 //主题文字字体大小，默认为18px
						// },
					},

					// stillShowZeroSum: true,
					//鼠标划过时饼状图上显示的数据
					tooltip: {
						trigger: 'item',
						formatter: '{a}<br/>{b}:{c} ({d}%)'
					},
					//图例
					legend: { //图例  标注各种颜色代表的模块
						//orient: 'vertical',//图例的显示方式  默认横向显示
						bottom: 5, //控制图例出现的距离  默认左上角
						left: 'left', //控制图例的位置
						itemWidth: 12, //图例颜色块的宽度和高度
						itemHeight: 12,
						textStyle: { //图例中文字的样式
							color: '#000',
							fontSize: 12
						},
						data: ['Open', 'Bounce ', 'Unsubscribe'] //图例上显示的饼图各模块上的名字
					},
					//饼图中各模块的颜色
					color: ['#ffa534', '#1dc7ea', '#fb404b'],
					// 饼图数据
					series: {
						// name: 'bug分布',
						type: 'pie', //echarts图的类型   pie代表饼图
						radius: '45%', //饼图中饼状部分的大小所占整个父元素的百分比
						center: ['22%', '50%'], //整个饼图在整个父元素中的位置
						// data:''               //饼图数据
						data: [ //每个模块的名字和值
							{
								name: 'Open',
								value: 10
							},
							{
								name: 'Bounce ',
								value: 30
							},
							{
								name: 'Unsubscribe',
								value: 50
							}
						],
						itemStyle: {
							normal: {
								label: {
									show: true, //饼图上是否出现标注文字 标注各模块代表什么  默认是true
									// position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
								},
								labelLine: {
									show: true //官网demo里外部标注上的小细线的显示隐藏    默认显示
								}
							}
						},
					}

				}
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option)
			}
		}
	};
</script>
<style scoped="scoped">
	.box-card {
		height: auto;
	}

	.echart {
		height: auto;
	}
</style>
