<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="创建时间" prop="Nowtime">
			</el-table-column>
			<el-table-column label="使用类型" prop="type">
			</el-table-column>
			<el-table-column label="数量" prop="num">
			</el-table-column>
			<el-table-column label="可使用金额" prop="value">
			</el-table-column>
			<el-table-column label="截止时间" prop="time">
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
					<el-button size="mini" type="info" @click="handleAdd">Add</el-button>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" color="#3fc1c9" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="添加优惠券" :visible.sync="dialogFormVisible2">
			<el-form :model="form">
				<el-form-item label="优惠券数量:" :label-width="formLabelWidth">
					<el-input
					  placeholder="请输入内容"
					  v-model="form.Nowtime"
					  :disabled="true">
					</el-input>
				</el-form-item>
				
				<el-form-item label="优惠券使用类型:" :label-width="formLabelWidth">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
							<span style="float: left">{{ item.label }}</span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhushi }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券数量:" :label-width="formLabelWidth">
					<el-input-number v-model="form.num" controls-position="right" :min="1" :max="1000">
					</el-input-number>
				</el-form-item>
				<el-form-item label="优惠券金额:" :label-width="formLabelWidth">
					<el-input v-model="form.value" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="优惠券结束时间:" :label-width="formLabelWidth">
					<el-date-picker v-model="form.time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="(indexxx < 1) ? addcoupons() : editcoupons()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="确定要删除此项优惠券么？" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="优惠券数量:" :label-width="formLabelWidth">
					<el-input
					  placeholder="请输入内容"
					  v-model="form.Nowtime"
					  :disabled="true">
					</el-input>
				</el-form-item>
				<el-form-item label="优惠券使用类型:" :label-width="formLabelWidth">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option v-for="item in cities" :key="item.value" :label="item.label" :disabled="true" :value="item.value">
							<span style="float: left">{{ item.label }}</span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.zhushi }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券数量:" :label-width="formLabelWidth">
					<el-input-number v-model="form.num" :disabled="true" controls-position="right" :min="1" :max="1000">
					</el-input-number>
				</el-form-item>
				<el-form-item label="优惠券金额:" :label-width="formLabelWidth">
					<el-input v-model="form.value" :disabled="true" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="优惠券结束时间:" :label-width="formLabelWidth">
					<el-date-picker v-model="form.time" type="date" :disabled="true" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="delcoupons">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		addCoupons,
		getCoupons,
		putCoupons,
		delCoupons
	} from '../../comoon/api/coupons.js'
	export default {
		data() {
			return {
				formLabelWidth: '120px',
				dialogFormVisible2: false,
				dialogFormVisible: false,
				tableData: [],
				indexxx:0,
				id:'',
				form: {
					type: '',
					num: '',
					time:'',
					value: '',
					Nowtime:'',
					status:'未使用'
				},
				cities: [
				{
					zhushi: 'Meizhuang',
					value: '美妆',
					label: '美妆'
				}, 
				{
					zhushi: 'Nvzhuang',
					value: '女装',
					label: '女装'
				}, 
				{
					zhushi: 'Nanzhuang',
					value: '男装',
					label: '男装'
				}, 
				{
					zhushi: 'Computer',
					value: '电脑',
					label: '电脑'
				}, 
				{
					zhushi: 'Shabidebi',
					value: '猪头',
					label: '猪头'
				},
				],

			};
		},
		mounted() {
			this.getdata();
		},
		methods: {
			handleAdd() {
				this.indexxx = 0;
				this.getTime();
				this.dialogFormVisible2 = true;
				this.form.Nowtime = this.currentDate;
				this.form.type = '';
				this.form.num = 1;
				this.form.value = '';
				this.form.time = '';
			},
			addcoupons() {
				addCoupons(this.form).then(res=>{
					this.dialogFormVisible2 = false;
					this.getdata();
					this.$message({
					          message: '添加成功',
					          type: 'success'
					        });
				},res=>{
					this.$message({
					          message: '添加失败',
					          type: 'error'
					        });
				});
				this.dialogFormVisible2 = false;
			},
			getdata(){
				getCoupons().then(res=>{
					this.tableData = res;
				},res=>{
					console.log("error");
				})
			},
			handleEdit(index, row) {
				this.indexxx = 2;
				this.id = row.id;
				this.dialogFormVisible2 = true;
				this.form.Nowtime = row.Nowtime;
				this.form.type = row.type;
				this.form.num = row.num;
				this.form.value = row.value;
				this.form.time = row.time;
			},
			editcoupons(){
				putCoupons(this.id,this.form).then(res=>{
					this.getdata();
					this.dialogFormVisible2 = false;
					this.$message({
					          message: '修改成功',
					          type: 'success'
					        });
				},res=>{
					this.$message({
					          message: '修改失败',
					          type: 'error'
					        });
				})
			},
			handleDelete(index, row) {
				this.id = row.id;
				this.dialogFormVisible = true;
				this.form.Nowtime = row.Nowtime;
				this.form.type = row.type;
				this.form.num = row.num;
				this.form.value = row.value;
				this.form.time = row.time;
			},
			delcoupons(){
				delCoupons(this.id).then(res=>{
					this.getdata();
					this.dialogFormVisible = false;
					this.$message({
					          message: '修改成功',
					          type: 'success'
					        });
				},res=>{
					this.$message({
					          message: '修改失败',
					          type: 'error'
					        });
				})
			},
			getTime(){
				var date = new Date();
				    var month = date.getMonth() + 1;
				    var strDate = date.getDate();
				    if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				    if (strDate >= 0 && strDate <= 9) {
				        strDate = "0" + strDate;
				    }
				    this.currentDate = date.getFullYear() + "-" + month + "-" + strDate
				            + " " + date.getHours() + ":" + date.getMinutes();
			},
		}
	};
</script>

<style scoped="scoped">
	.el-button {
		color: #FFFFFF;
		background-color: #3fc1c9;
		border: 1px solid #3fc1c9;
	}
	.el-button--danger {
		color: #FFFFFF;
		background-color: #b83b5e;
		border: 1px solid #b83b5e;
	}
	.el-button--info {
		color: #FFFFFF;
		background-color: #aa96da;
		border: 1px solid #aa96da;
	}
</style>
