<template>
	<div>
		<el-button type="primary" style="margin-bottom: 20px;" @click="dialogFormVisible2 = true">添加菜单</el-button>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-table :data="props.row.submenu" style="width: 100%">
						<el-table-column label="子级菜单 ID" prop="id">
						</el-table-column>
						<el-table-column label="子级菜单名称" prop="title">
						</el-table-column>
						<el-table-column label="url" prop="url">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" type="warning" icon="el-icon-delete"
									@click="handleDelete(scope.$index, scope.row)"></el-button>
									<el-button size="mini" type="primary"  icon="el-icon-edit" circle></el-button>
							</template>
						</el-table-column>
					</el-table>
					
				</template>
			</el-table-column>
			<el-table-column label="主级菜单 ID" prop="id">
			</el-table-column>
			<el-table-column label="主级菜单名称" prop="title">
			</el-table-column>
			<el-table-column label="icon" prop="icon">
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-circle-plus-outline"
						@click="handleEdit(scope.$index, scope.row,dialogFormVisible2 = true)"></el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete"
						@click="handleDelete(scope.$index, scope.row,dialogFormVisible = true)"></el-button>
						<el-button type="primary" size="mini" icon="el-icon-edit" circle
						 @click="editMenu(scope.$index, scope.row)" ></el-button>
				</template>
				
			</el-table-column>
		</el-table>
		<el-dialog title="添加数据" :visible.sync="dialogFormVisible2">
			<el-form :model="form">
				<el-form-item label="父级菜单名称:" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="父级菜单ID:" :label-width="formLabelWidth">
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="父级菜单icon:" :label-width="formLabelWidth">
					<el-input v-model="form.icon" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图标样式:" :label-width="formLabelWidth">
					<el-button :icon="form.icon" circle></el-button>
				</el-form-item>
				<el-form-item label="子级菜单数量:" :label-width="formLabelWidth">
					<el-input-number size="mini" v-model="num4"></el-input-number>
				</el-form-item>
				<el-row :gutter="20">
				  <el-col :span="8" v-for="o in num4" :key="o" >
					  <el-card class="box-card" style="width: 220px; margin-top: 10px;">
					   <el-form-item label="子级菜单id:" :label-width="formLabelWidth1">
					   	<el-input v-model="sub_form.sub_id" autocomplete="off"></el-input>
					   </el-form-item>
					   <el-form-item label="子级菜单url:" :label-width="formLabelWidth1">
					   	<el-input v-model="sub_form.sub_url" autocomplete="off"></el-input>
					   </el-form-item>
					   <el-form-item label="菜单name:" :label-width="formLabelWidth1">
					   	<el-input v-model="sub_form.sub_name" autocomplete="off"></el-input>
					   </el-form-item>
					  </el-card>
				  </el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="addMenu(dialogFormVisible2 = false)">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog :title="dialogFormtitle" :visible.sync="dialogFormVisible">
		<el-form :model="form1">
			<el-form-item label="菜单名称:" :label-width="formLabelWidth">
				<el-tag type="success">{{form1.name}}</el-tag>
			</el-form-item>
			<el-form-item label="菜单名称:" :label-width="formLabelWidth">
				<el-input v-model="form1.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="菜单图标:" :label-width="formLabelWidth">
				<el-input v-model="form1.icon" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="图标样式:" :label-width="formLabelWidth">
				<el-button :icon="form1.icon" circle></el-button>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="(flow>1) ? submitMenu(dialogFormVisible = false) : delMenu(dialogFormVisible = false)">确 定</el-button>
		</div>
			</el-dialog>
	</div>
</template>

<script>
	import {
		menusearch,
		changeMenu,
		addMenulala,
		delMenulala
	} from '../../comoon/api/menu.js'
	export default {
		data() {
			return {
				flow:2,
				dialogFormtitle:'',
				num4:0,
				tableData: [],
				tableData_two: [],
				dialogFormVisible2: false,
				dialogFormVisible: false,
				formLabelWidth: '100px',
				formLabelWidth1: '90px',
				form: {
					id:'',
					name: '',
					icon:'',
				},
				sub_form:[
					{
					sub_name: '',
					sub_id: '',
					sub_url: '',
				}
				],
				form1: {
					id:'',
					name: '',
					icon:''
				},
			}
		},
		mounted() {
			this.getdata();
		},
		methods: {
			addMenu(){
				console.log(this.form.name);
				console.log(this.num4);
				console.log(this.form.id);
				console.log(this.form.icon);
				console.log(this.sub_form[0].sub_name);
				console.log(this.sub_form[0].sub_id);
				console.log(this.sub_form[0].sub_url);
				console.log(this.sub_form[0]);
				console.log(this.sub_form[1]);
				let params={
					id:this.form.id,
					title:this.form.name,
					icon:this.form.icon,
					submenu:[
					{
						id:this.sub_form.sub_id,
						title:this.sub_form.sub_name,
						url:this.sub_form.sub_url
					}]};
				addMenulala(params).then(response=>{
				this.getdata();
				this.$message({
					message: '添加成功，尊贵的管理员',
					type: 'success'
				});
				
				    // setTimeout(function (){
				    // 	window.location.reload();
				    // }, 1000);
				
			},response=>{
				this.$message.error('添加失败，尊贵的管理员');
			})
			
				
			},
			editMenu(index,row){
				this.dialogFormtitle = '修改主菜单',
				console.log(this.flow);
				this.dialogFormVisible=true;
				this.form1 = {
					name: row.title,
					id: row.id,
				}
			},
			submitMenu(){
				console.log(this.form1.icon);
			let params={
				title:this.form1.name,
				icon:this.form1.icon
			};
			changeMenu(this.form1.id,params).then(response=>{
				this.getdata();
				this.$message({
					message: '修改成功，尊贵的管理员',
					type: 'success'
				});
				setTimeout(function (){
					window.location.reload();
				}, 1000);
			},response=>{
				this.$message.error('修改失败，尊贵的管理员');
			})
			},
			delMenu(){
				console.log(this.form1.id);
			delMenulala(this.form1.id).then(response=>{
				this.getdata();
				this.$message({
					message: '删除成功，尊贵的管理员',
					type: 'success'
				});
				setTimeout(function (){
					window.location.reload();
				}, 1000);
			},response=>{
				this.$message.error('删除失败，尊贵的管理员');
			})
			},
			getdata() {
				menusearch().then(response => {
					this.tableData = response;
				}, response => {
					console.log("error");
				})
			},
			handleEdit(index, row) {
				console.log(index, row);
				this.form = {
					name: row.title,
					id: row.id,
				}
			},
			handleDelete(index, row) {
				this.flow = 0;
				console.log("del");
				this.dialogFormtitle = '确定要删除此消息么？'
				this.form1 = {
					name: row.title,
					id: row.id,
					icon: row.icon,
				}
				console.log(index, row);
			}
		}
	}
</script>

<style>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
