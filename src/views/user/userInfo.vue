<template>
	<div>
		<el-card class="box-card">
		<div style="width: 1000px;height: 600px;display: flex;margin-left: 120px;">
			<div style="width: 300px;height: 100%;">
				<div class="tx" >
					<img :src="src" style="width: 100%; height: 280px;border-radius: 50%;; ">
				</div>
				<div style="width: 100%;height: 300px; line-height: 300px; padding-left: 100px;">
					<el-button  type="success" @click="dialogFormVisible = true">上传头像</el-button>
				</div>
				<el-dialog title="更改头像" :visible.sync="dialogFormVisible">
					<el-form>
						<el-form-item label="src:" :label-width="formLabelWidth">
							<el-input v-model="src" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="img:" :label-width="formLabelWidth">
							<img :src="src" width="100" height="120" />
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="changeImg(dialogFormVisible = false)">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		<div style="width: 500px;height: 100%; margin-left: 200px;">
			<el-form>
				<el-form-item label="姓名:" :label-width="formLabelWidth">
					<el-input v-model="name" autocomplete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="性别:" :label-width="formLabelWidth">
					<template>
					  <el-radio :disabled="disabled" v-model="sex" label="1">男</el-radio>
					  <el-radio :disabled="disabled" v-model="sex" label="2">女</el-radio>
					</template>
				</el-form-item>
				<el-form-item label="邮箱:" :label-width="formLabelWidth">
					<el-input v-model="mail" autocomplete="off" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="生日:" :label-width="formLabelWidth">
					 <el-date-picker
				      v-model="birday"
				      type="date"
					  :disabled="disabled"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
			<el-form-item label="联系:" :label-width="formLabelWidth">
				<el-input v-model="tel" autocomplete="off" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="爱好:" :label-width="formLabelWidth">
				<el-input v-model="like" autocomplete="off" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="职业:" :label-width="formLabelWidth">
				<el-input v-model="work" autocomplete="off" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="能量:" :label-width="formLabelWidth">
				    <el-slider
				      v-model="power"
					  :disabled="disabled"
				      show-input>
				    </el-slider>
			</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="margin-top: 40px;">
				<el-button style="margin-left: 330px;" @click="changeMsg">修 改</el-button>
				<el-button type="primary" @click="saveMsg" :disabled="disabled">确 定</el-button>
			</div>
		</div>
		</div>
		</el-card>
		
	</div>
</template>

<script>
	import axios from "axios"
	export default{
		data(){
			return{
			src:'',
			id:'',
			name:'',
			sex:1,
			mail:'',
			birday:'',
			tel:'',
			like:'',
			work:'',
			power:0,
			disabled:true,
			formLabelWidth: '60px',
			dialogFormVisible: false,
			}
			
		},
		mounted: function() {
			// this.name = localStorage.getItem('name'); //获取会员真实用户名
			this.name = this.$cookies.get('name1');
			this.getdata();
		},
		methods:{
			getdata() {
				axios.get('http://localhost:3000/user/?name=' +this.name).then(response => {
					this.src = response.data[0].src;
					this.id = response.data[0].id;
					this.sex = response.data[0].sex;
					this.mail = response.data[0].mail;
					this.birday = response.data[0].birday;
					this.tel = response.data[0].tel;
					this.like = response.data[0].like;
					this.work = response.data[0].work;
					this.power = response.data[0].power;
				}, response => {
					console.log("error");
				})
			},
			changeMsg(){
				this.disabled=!this.disabled;
			},
			saveMsg(){
				
				axios.patch('http://localhost:3000/user/' + this.id,
				{
					name:this.name,
					sex:this.sex,
					mail:this.mail,
					birday:this.birday,
					tel:this.tel,
					like:this.like,
					work:this.work,
					power:this.power,
				}
				).then(response=>{
					this.disabled=true;
					this.getdata();
					this.$message({
						message: '添加成功，宝贝',
						type: 'success'
					});
				},response=>{
					this.$message.error('已经添加过啦，不能重复添加哦');
				})
			},
			changeImg(){
				console.log(this.src);
				axios.patch('http://localhost:3000/user/' +this.id, {
					src:this.src,
				}).then(response => {
					this.getdata();
					this.$router.go(0);
					this.$message({
						message: '修改成功，宝',
						type: 'success',
						
					});
				}, response => {
					 this.$message.error('修改失败');
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.box-card{
		height: 600px;
		display: flex;
	}
	.tx{
		width: 100%;
		height: 280px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow:  35px 35px 70px #c7c7c7,
		             -35px -35px 70px #ffffff;
	}
</style>
