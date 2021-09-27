<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-table :data="props.row.spend" style="width: 100%" show-summary :summary-method="getSummaries">
						<el-table-column label="购买时间" width="110" prop="time">
						</el-table-column>
						<el-table-column label="购买者" width="130" prop="user">
						</el-table-column>
						<el-table-column label="购买货物" align="center" width="460" prop="type">
						</el-table-column>
						<el-table-column label="货物原价" align="center" width="130" prop="spend">
						</el-table-column>
						<el-table-column label="购买优惠" align="center" width="200" prop="youhuiquan">
						</el-table-column>
						<el-table-column label="实际交易金额(元)" align="center" width="140" prop="nowsale">
						</el-table-column>
					</el-table>

				</template>
			</el-table-column>

			<el-table-column label="用户 ID" prop="id" width="80">
			</el-table-column>
			<el-table-column label="开号时间" prop="time">
			</el-table-column>
			<el-table-column label="账号用户名" width="120" prop="name">
			</el-table-column>
			<el-table-column label="用户头像" width="160" prop="src">
				<template slot-scope="scope">
					<img :src="scope.row.src" width="100" height="100">
				</template>
			</el-table-column>
			<el-table-column label="email" width="180" prop="email">
			</el-table-column>
			<el-table-column label="电话号码" prop="tel">
			</el-table-column>
			<el-table-column label="会员状态" prop="member" fit="true">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleGive(scope.$index, scope.row)">赠送</el-button>
					<el-button size="mini" type="info" @click="mycoupons(scope.$index, scope.row)">优惠券</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="'赠送优惠券给:' + name" :visible.sync="dialogFormVisible">

			<el-checkbox-group v-model="checkList">
				<el-card v-for="(item,index) in couponsList" :key="index" style="margin-top: 15px;">
					<el-checkbox :label="item.type">
						<el-descriptions title="用户信息">
							<el-descriptions-item label="用户名">可使用价值为：<el-tag type="success">{{item.value}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="手机号">剩余数量为：<el-tag type="warning">{{item.num}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="居住地">截止时间为：<el-tag type="danger">{{item.time}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="备注">
								使用类型为：<el-tag size="small">{{item.type}}</el-tag>
							</el-descriptions-item>
						</el-descriptions>
					</el-checkbox>
				</el-card>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button @click="check">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog :title="name + '的优惠券'" :visible.sync="dialogFormVisible2">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="未使用" name="未使用">
					<el-card v-for="(item,index) in usercouponsList" :key="index" style="margin-top: 15px;">
						<el-descriptions title="用户信息">
							<el-descriptions-item label="用户名">可使用价值为：<el-tag type="success">{{item.value}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="手机号">剩余数量为：<el-tag type="warning">{{item.num}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="居住地">截止时间为：<el-tag type="danger">{{item.time}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="备注">
								使用类型为：<el-tag size="small">{{item.type}}</el-tag>
							</el-descriptions-item>
						</el-descriptions>
					</el-card>
				</el-tab-pane>
				<el-tab-pane label="已使用" name="已使用">
					
					<el-card v-for="(item,index) in usercouponsList" :key="index" style="margin-top: 15px;">
						<el-badge value="已使用" type="info" class="item">
						<el-descriptions title="用户信息">
							<el-descriptions-item label="用户名">可使用价值为：<el-tag type="success">{{item.value}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="手机号">剩余数量为：<el-tag type="warning">{{item.num-1}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="居住地">截止时间为：<el-tag type="danger">{{item.time}}</el-tag>
							</el-descriptions-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<el-descriptions-item label="备注">
								使用类型为：<el-tag size="small">{{item.type}}</el-tag>
							</el-descriptions-item>
						</el-descriptions>
						</el-badge>
					</el-card>
				</el-tab-pane>
			</el-tabs>

		</el-dialog>
	</div>
</template>
<script>
	import {
		getUser
	} from '../../comoon/api/login.js'
	import {
		getCoupons,
		getCoupons_type,
		addUserCoupons,
		patchCoupons,
		getCoupons_name,
		getCoupons_name_status
	} from '../../comoon/api/coupons.js'
	export default {
		methods: {
			check() {
				getCoupons_type(this.checkList).then(res => {
					this.giveList = res;
					let params = {
						name: this.name,
						num: 1,
						time: this.giveList[0].time,
						type: this.giveList[0].type,
						value: this.giveList[0].value,
						status: this.status
					};
					addUserCoupons(params).then(res => {
						this.dialogFormVisible = false;
						this.$message({
							message: '赠送成功，宝',
							type: 'success',
						});

						let paramss = {
							num: this.giveList[0].num - 1
						}
						patchCoupons(this.giveList[0].id, paramss);
						this.getdata();

					}, res => {
						console.log("error");
					})
				}, res => {
					console.log("error");
				})
			},
			getdata() {
				getUser().then(res => {
					this.tableData = res;
				}, res => {
					console.log("error");
				})
			},
			handleGive(index, row) {
				this.dialogFormVisible = true;
				this.name = row.name;
				this.getcoupons();
			},
			handleClick(tab, event) {
				getCoupons_name_status(this.name,this.activeName).then(res => {
					this.usercouponsList = res;
				}, res => {
					console.log("error");
				})
			},
			mycoupons(index, row) {
				this.name = row.name;
				this.dialogFormVisible2 = true;
				getCoupons_name_status(this.name,this.activeName).then(res => {
					this.usercouponsList = res;
				}, res => {
					console.log("error");
				})
			},
			getcoupons() {
				getCoupons().then(res => {
					this.couponsList = res;
				}, res => {
					console.log("error");
				});
			},
			handleDelete(index, row) {},
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if (column.property == 'spend'||column.property == 'nowsale') {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index];

					}
				});
				return sums
			},
		},
		mounted() {
			this.getdata();
		},
		data() {
			return {
				type: '已使用',
				activeName: '未使用',
				usercouponsList: [],
				giveList: [],
				tableData: [],
				couponsList: [],
				money: 10000,
				checkList: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				name: '',
				status: '未使用'
			}
		}
	}
</script>

<style>
	.el-button--danger {
		color: #FFFFFF;
		background-color: #99e1e5;
		border: 1px solid #99e1e5;
	}

	.el-button--info {
		color: #FFFFFF;
		background-color: #7e6bc4;
		border: 1px solid #7e6bc4;
	}
</style>
