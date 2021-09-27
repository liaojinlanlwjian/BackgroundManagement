<template>
	<div>
		<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
			style="width: 100%">
			<el-table-column label="Enroll Date" prop="time">
			</el-table-column>
			<el-table-column label="Name" prop="name">
			</el-table-column>
			<el-table-column label="Work" prop="work">
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row,dialog = true)">Edit</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,dialog = true)">Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-drawer :title="title" :before-close="handleClose" size="42%" :visible.sync="dialog" direction="rtl"
			custom-class="demo-drawer" ref="drawer">
			<div class="demo-drawer__content">
				<el-form :model="form">
					<el-form-item label="用户名" :label-width="formLabelWidth">
						<el-input v-model="form.name" :disabled="disabled" @change="handlerChange ,(change = false)" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth">
						<el-input v-model="form.psd" :disabled="disabled"  @change="handlerChange ,(change = false)"  autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="mail" :label-width="formLabelWidth">
						<el-input v-model="form.mail" :disabled="disabled"  @change="handlerChange,(change = false)" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="工作" :label-width="formLabelWidth">
						<el-input v-model="form.work" :disabled="disabled" @change="handlerChange ,(change = false)"  autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="号码" :label-width="formLabelWidth">
						<el-input v-model="form.tel" :disabled="disabled" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="菜单权限" :label-width="formLabelWidth">
						<el-button   @click="checked">点我打开</el-button>
					</el-form-item>
				</el-form>
				<div class="demo-drawer__footer" style="margin-left: 180px;">
					<el-button @click="colseForm">取 消</el-button>
					<el-button :type="type" :disabled="change" @click="token ? submitForm() : delForm()">确 定</el-button>
				</div>
			</div>
			   <el-drawer
			     size="42%"
			     title="修改菜单权限"
				 direction="ltr"
			     :append-to-body="true"
			     :visible.sync="innerDrawer">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户为：<el-tag type="success">{{caidanname}}</el-tag>
				<el-card class="box-card" style="margin-top: 30px;">
				  <div slot="header" class="clearfix">
				    <span>选择菜单</span>
				    <el-button style="float: right; padding: 3px 0" type="text" @click="caidan">sure</el-button>
				  </div>
					<el-tree :data="menu" 
					icon-class="el-icon-coordinate"
					show-checkbox 
					:highlight-current="true"
					node-key="id"
					default-expand-all
					:default-checked-keys="checkedNode" 
					:props="defaultProps"></el-tree>
				</el-card>
			   </el-drawer>
		</el-drawer>
	</div>
</template>

<script>
	import {
		getUser,
		patchUser,
		delUser
	} from '../../comoon/api/system.js'
	import { menusearch } from '../../comoon/api/menu.js'
	export default {
		data() {
			return {
   checkAll: false,
				caidanname:'',
				innerDrawer: false,
				change:true,
				token:'',
				type:'',
				title:'Edit me !',
				disabled:false,
				tableData: [],
				search: '',
				dialog: false,
				gridData: [],
				form: {
					name: '',
					psd: '',
					tel: '',
					work: '',
					mail: '',
					id: ''
				},
				menu:[],
				checkedNode:[1,2,3,4,5],
				formLabelWidth: '100px',
				timer: null,
				 defaultProps: {
				          children: 'submenu',
				          label: 'title'
				        }
			}
		},

		mounted() {
			this.getdata();
			this.getMenu();
		},
		methods: {
			checked(){
				this.getMenu()
				this.innerDrawer = true;
			},
			getLeafKeys(){
				if(!node.submenu){
					return arr.push(1,2,3,4,5)
				}
				
				node.submenu.forEach(item=>
				this.getLeafKeys(item.arr)
				)
			},
			itemIndeterminate(item) {
			  // console.log(item);
			},
			//点击所当前所有元素
			handleCheckedCitiesChange(value) {
			  console.log(value);
			},
			caidan(){
				this.innerDrawer = false;
				this.dialog = false;
				this.$message({
					message: '设置成功，尊贵的管理员',
					type: 'success'
				});
			},

			handlerChange(){
				this.$message({
				          message: '还没做如何修改哦！',
				          type: 'warning'
				        });
			},
			getMenu(){
				menusearch().then(response=>{
					this.menu = response;
					this.getLeafKeys(this.menu,this.checkedNode)
				},response=>{
					console.log("error");
				})
			},
			getdata() {
				getUser().then(response => {
					this.tableData = response;
				}, response => {
					console.log("error");
				})
			},
			handleClose(done) {
				this.dialog = false;
			},
			colseForm() {
				this.dialog = false;
			},
			submitForm() {
				let params = {
					name: this.form.name,
					psd: this.form.psd,
					mail: this.form.mail,
					work: this.form.work,
					tel: this.form.tel,
				};
				patchUser(this.form.id, params).then(response => {
					this.$message({
						message: '修改成功，尊贵的管理员',
						type: 'success'
					});
					this.dialog = false;
					this.getdata();
				}, response => {
					this.$message.error('修改失败，尊贵的管理员');
				})


			},
			delForm(){
				delUser(this.form.id).then(response=>{
					this.$message({
						message: '删除成功，尊贵的管理员',
						type: 'success'
					});
					this.dialog = false;
					this.getdata();
				},response=>{
					this.$message.error('删除失败，尊贵的管理员');
				})
			},
			handleEdit(index, row) {
				this.caidanname = row.name,
				this.change = true,
				this.token = true,
				this.type = 'success',
				this.title = 'Edit me !!!',
				this.disabled = false,
				this.form.id = row.id;
				this.form.name = row.name;
				this.form.psd = row.psd;
				this.form.mail = row.mail;
				this.form.tel = row.tel;
				this.form.work = row.work;
			},
			handleDelete(index, row) {
				this.change = false,
				this.token = false,
				this.type = 'danger',
				this.title = 'Kill me !!!',
				this.disabled = true,
				this.form.id = row.id;
				this.form.name = row.name;
				this.form.psd = row.psd;
				this.form.mail = row.mail;
				this.form.tel = row.tel;
				this.form.work = row.work;
			}
		}
	}
</script>

<style>
</style>
