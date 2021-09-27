<template>
	<div id="app1">
		<div style="width: 280px;height: 280px;position: absolute;top: 30%;left: 15%;">
			<div style="width: 100%; height: 100px; line-height: 100px; color: #fff;">
				<h1 style="font-size: 35px;">Welcome bao!</h1>
			</div>
			<div style="width: 100%; height: 100px;color: #fff;">
				<h3 style="font-size: 22px;">passion 与你同在</h3>
			</div>
		</div>
		<div class="login-container">
			<el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-position="left" label-width="0px"
				class="demo-ruleForm login-page">
				<h3 class="title">系统登录</h3>
				<el-form-item prop="name">
					用户名: <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="pass">
					密码: <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="密码">
					</el-input>
				</el-form-item>

				<el-form-item style="width:100%;">
					<el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" >登录
					</el-button>
				</el-form-item>
				<el-button type="text" @click="dialogFormVisible2 = true">点我注册</el-button>
			</el-form>
			<el-dialog title="用户注册" :visible.sync="dialogFormVisible2">
				<el-form>
					<el-form-item label="用户名:" :label-width="formLabelWidth">
						<el-input v-model="name1" placeholder="三位以上的数字和字母组合" autocomplete="off"></el-input>
					</el-form-item>

					<el-form-item label="密码:" :label-width="formLabelWidth">
						<el-input v-model="pass1" placeholder="三位以上的数字和字母组合" autocomplete="off"></el-input>
					</el-form-item>
	<el-form-item label="src:" :label-width="formLabelWidth">
							<el-input v-model="src" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="img:" :label-width="formLabelWidth">
							<img :src="src" width="100" height="120" />
						</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="con_Del(dialogFormVisible2 = false)">注 册</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>
<style>
	#app1 {
		height: 738px;
		width: 100%;
		;
		background-image: url(../../assets/bg.jpg);
		background-repeat: no-repeat;
		background-position: center;
		background-attachment: fixed;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;

	}

	.login-container {
		width: 100%;
		height: 100%;
	}

	.login-page {
		display: inline-block;
		width: 350px;
		position: absolute;
		left: 64%;
		top: 20%;
		padding: 35px 35px 15px;
border-radius: 41px;
background: #ffffff;
box-shadow:  -5px -5px 10px #666666,
             5px 5px 10px #ffffff;
	}

	label.el-checkbox.rememberme {
		margin: 0px 0px 15px;
		text-align: left;
	}
</style>
<script>
	import {
		getLogin,
		getEnroll
	} from '../../comoon/api/login.js'
	export default {
		data() {

			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			return {
				currentDate:'',
				name1: '',
				pass1: '',
				src:'',
				dialogFormVisible2: false,
				formLabelWidth: '60px',
				ruleForm: {
					name: '',
					pass: '',
				},
				Form: {
					name: '',
					pass: '',
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
				}
			};
		},
		methods: {
			submitForm(formName) {
				//验证
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.Login(); //调用登录方法
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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
				console.log(this.currentDate);
			},
			con_Del() {
				this.getTime();
				let params ={
					id: Math.round(Math.random() * 10000),
					name: this.name1,
					psd: this.pass1,
					src:this.src,
					time:this.currentDate,
				};
				getEnroll(params).then(response => {
					this.$message({
						message: '添加成功，宝贝',
						type: 'success'
					});
				}, response => {
					this.$message.error('注册失败');
				})
			},
			Login() {
				let that = this;
				getLogin(this.ruleForm['name']).then(response=>{
					//判定是否返回数据
					if (that.ruleForm['pass'] == response[0].psd) {
						//console.log(response.data);
						//return;
						that.$cookies.set('name1',response[0]['name'],1000000);
						//有数据代理登录成功
						that.$message({
							message: '登录成功',
							type: 'success',
							duration: 1000
						});
						//延迟1000毫秒
						setTimeout(function() {
							that.$router.push({
								'path': '/index'
							}); //路由跳转用户中心
						}, 1500);

					} else {
						that.$message.error("密码错误");
					}

				}).catch(function(err) {
					console.log(err);
				});
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
