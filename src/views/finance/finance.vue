<template>
	<div>
		<div class="block">
			<span class="demonstration">请选择日期</span>
			<el-date-picker v-model="value1" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
				value-format="yyyy-MM-dd">
			</el-date-picker>

			<el-button type="info" @click="searchMsg">搜索</el-button>
		</div>
		<div style="margin-top: 40px;">
			<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="(item,index) in month" :label="item.lable" :name="item.name" :key="index">
					<el-row :gutter="40">
						<el-col :span="span_spend" v-show="show_spend">
							  <el-alert
							    :title="item.msg_spend"
								:closable="false"
								center
							    type="info"
							    effect="dark">
							  </el-alert>
							<template>
								<el-table :data="spendList" show-summary :summary-method="getSummaries" stripe
									style="width: 100%" border
									:default-sort = "{prop: 'date', order: 'descending'}"
									>
									<el-table-column prop="currentDate" sortable label="买入日期" width="120">
									</el-table-column>
									<el-table-column prop="name" label="商品名称" :width="name_width">
										<template slot-scope="scope">
											<el-popover placement="top-start" title="商品名称" width="200" trigger="hover"
												:content="scope.row.name">
												<el-button slot="reference">{{scope.row.name}}</el-button>
											</el-popover>
										</template>
									</el-table-column>
									<el-table-column prop="starsale" :width="starsale_width" align="center"
										label="购入单价">
									</el-table-column>
									<el-table-column prop="sale" label="出售单价" align="center" :width="sale_width">
									</el-table-column>
									<el-table-column prop="save" align="center" :width="sale_width" label="购入数量">
									</el-table-column>
									<el-table-column prop="count" width="100" label="购入支出">
										<template slot-scope="scope">
											<span>{{ scope.row.save*scope.row.starsale }}</span>
										</template>
									</el-table-column>
								</el-table>
								        <div style="text-align:right;line-height:30px;margin-right:119px;">
								          合计：<span  >{{sums}}</span>
								        </div>
							</template>
						</el-col>
						<el-col :span="span_income" v-show="show_income">
							    <el-alert
							      :title="item.msg_income"
							      type="success"
								  :closable="false"
								  center
							      effect="dark">
							    </el-alert>
							<template>
								<el-table :data="incomeList" border show-summary :summary-method="getSummaries" stripe
									style="width: 100%"
									 :default-sort = "{prop: 'date', order: 'descending'}"
									>
									<el-table-column prop="time" sortable label="购买时间" width="120">
									</el-table-column>
									<el-table-column prop="goods[0].name" label="物品名称" :width="goods_width">
										<template slot-scope="scope">
											<el-popover placement="top-start" title="商品名称" width="200" trigger="hover"
												:content="scope.row.goods[0].name">
												<el-button slot="reference">{{scope.row.goods[0].name}}</el-button>
											</el-popover>
										</template>
									</el-table-column>
									<el-table-column prop="goods[0].sale" align="center" label="购买价格"
										:width="sale_width">
									</el-table-column>
									<el-table-column prop="goods[0].step" align="center" label="购买数量"
										:width="sale_width">
									</el-table-column>
									<el-table-column label="总计">
										<template slot-scope="scope">
											<span>{{ scope.row.goods[0].step*scope.row.goods[0].sale }}</span>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import {
		getGoods_currentMonth,
		getGoods_currentDate,
		getBuyList,
		getBuyList_time,
		getGoods,
		getBuy
	} from '../../comoon/api/goods.js'
	export default {
		data() {
			return {
				name_width: 125,
				goods_width: 215,
				sale_width: 95,
				starsale_width: 95,
				span_spend: 12,
				span_income: 12,
				show_income: true,
				show_spend: true,
				spendList: [],
				incomeList: [],
				value1: '',
				activeName: '01',
				month: [{
						lable: '一月',
						name: '01',
						msg_spend:'一月支出',
						msg_income:'一月收入'
					},
					{
						lable: '二月',
						name: '02',
						msg_spend:'二月支出',
						msg_income:'二月收入'
					},
					{
						lable: '三月',
						name: '03',
						msg_spend:'三月支出',
						msg_income:'三月收入'
					},
					{
						lable: '四月',
						name: '04',
						msg_spend:'四月支出',
						msg_income:'四月收入'
					},
					{
						lable: '五月',
						name: '05',
						msg_spend:'五月支出',
						msg_income:'五月收入'
					},
					{
						lable: '六月',
						name: '06',
						msg_spend:'六月支出',
						msg_income:'六月收入'
					},
					{
						lable: '七月',
						name: '07',
						msg_spend:'七月支出',
						msg_income:'七月收入'
					},
					{
						lable: '八月',
						name: '08',
						msg_spend:'八月支出',
						msg_income:'八月收入'
					},
					{
						lable: '九月',
						name: '09',
						msg_spend:'九月支出',
						msg_income:'九月收入'
					},
					{
						lable: '十月',
						name: '10',
						msg_spend:'十月支出',
						msg_income:'十月收入'
					},
					{
						lable: '十一月',
						name: '11',
						msg_spend:'十一月支出',
						msg_income:'十一月收入'
					},
					{
						lable: '十二月',
						name: '12',
						msg_spend:'十二月支出',
						msg_income:'十二月收入'
					},
					{
						lable: '总支出',
						name: '13',
						msg_spend:'全年总支出',
					},
					{
						lable: '总收入',
						name: '14',
						msg_income:'全年总收入'
					},
					{
						lable: '利润',
						name: '15',
						msg_spend:'总支出',
						msg_income:'总收入'
					},
				]
			};
		},
		 computed: {
		   //表格中的金额合计总价格
		    sumMoney(){
						return this.spendList.map(
							row=>row.starsale*row.save).reduce(
							(acc, cur) => (parseFloat(cur) + acc), 0)
		      },
		      //所有费用合计
		    sums:function () {
						return parseFloat(this.freight)+parseFloat(this.other) +this.sumMoney
							},
		  },
		methods: {
			//通过回去时间选择返回的值，之后用slice切割字符串得到对应的月份，便可进行跳转
			searchMsg() {
				this.activeName = this.value1.slice(5,7);
				getGoods_currentDate(this.value1).then(res => {
					this.spendList = res;
				}, res => {
					console.log("error");
				});
				getBuyList_time(this.value1).then(res => {
					this.incomeList = res;
				}, res => {
					console.log("error");
				});
			},
			//通过月份来获取所点击的花费数组并且接收
			getSpend_currentmonth() {
				getGoods_currentMonth(this.activeName).then(res => {
					this.spendList = res
				}, res => {
					console.log("error");
				})
			},
			//通过月份来获取所点击的收入数组并且接收
			getIncome_currentmonth() {
				getBuyList(this.activeName).then(res => {
					this.incomeList = res
				}, res => {
					console.log("error");
				})
			},
			handleClick() {
				if (this.activeName == '13') {
					this.show_spend = true
					this.show_income = false
					this.span_spend = 28
					this.starsale_width = 220
					this.name_width = 320
					this.sale_width = 220
					getGoods().then(res => {
						this.spendList = res;
					}, res => {
						console.log("error");
					})
				} else {
					this.show_spend = true
					this.show_income = true
					this.span_income = 12
					this.span_spend = 12
					this.starsale_width = 95
					this.name_width = 95
					this.sale_width = 95
					this.getSpend_currentmonth();
					this.getIncome_currentmonth();
				}
				if (this.activeName == '14') {
					this.show_spend = false
					this.span_income = 28
					this.show_income = true
					this.starsale_width = 220
					this.goods_width = 520
					this.sale_width = 220
					getBuy().then(res => {
						this.incomeList = res;
					}, res => {
						console.log("error");
					})
				} else {
					this.goods_width = 215
				}
				if (this.activeName == '15') {
					this.show_spend = false
					this.show_income = false
				}
			},
			getSummaries(param) {
				const {
					columns,
					data
				} = param
				const sums = []
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计'
					} else if (index == 2 || index == 3 || index == 5 || index == 4) {
						const values = data.map(item => Number(item[column.property]))
						if (!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr)
								if (!isNaN(value)) { 
									return prev + curr;
								} else {
									return prev;
								}
							}, 0)
						} else {
							sums[index] = '--'
						}
					} else {
						sums[index] = ''
					}
				})
				return sums
			},

		}
	};
</script>

<style>
</style>
