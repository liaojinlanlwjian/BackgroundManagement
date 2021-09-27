<template>
	<div style="display: flex;">
		<div style="height: 600px;">
			<el-steps direction="vertical" :active="activeIndex - 0" finish-status="success" align-center>
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品轮播" description="商品在详情页的轮播图"></el-step>
				<el-step title="Done"></el-step>
			</el-steps>
		</div>
		<div style="width: 78%; height: 600px;">
			<el-tabs type="border-card" v-model="activeIndex">
				<el-tab-pane name="0">
					<span slot="label"><i class="el-icon-date"></i> 基本信息</span>
					<el-form :model="msgForm" :rules="addFormRules" ref="msgForm" label-width="100px"
						label-position="top">
						<el-form-item label="当前时间为:">
							<el-tag type="info">{{this.msgForm.currentDate}}</el-tag>
						</el-form-item>
						<el-form-item label="商品id" prop="id">
							<el-input v-model="msgForm.id"></el-input>
						</el-form-item>
						<el-form-item label="商品名称" prop="name">
							<el-input v-model="msgForm.name"></el-input>
						</el-form-item>
						<el-form-item label="商品进货价格" prop="starsale">
							<el-input v-model="msgForm.starsale"></el-input>
						</el-form-item>
						<el-form-item label="商品售卖价格" prop="sale">
							<el-input v-model="msgForm.sale"></el-input>
						</el-form-item>
						<el-form-item label="分类:"  prop="type">
							<el-select v-model="msgForm.type" placeholder="请选择分类">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品数量" prop="save">
							<el-input v-model="msgForm.save" type="number"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="next('msgForm')">下一步</el-button>
						</el-form-item>

					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品参数">
					<el-form :model="paramForm" :rules="paramFormRules" ref="paramForm" label-width="100px"
						label-position="top">
						<el-form-item label="是否免配送费" prop="delivery">
							<el-switch v-model="paramForm.delivery"></el-switch>
						</el-form-item>
						<el-form-item label="是否上架" prop="shangjia">
							<el-switch v-model="paramForm.shangjia"></el-switch>
						</el-form-item>
						  <el-form-item label="是否有颜色" prop="color">
						    <el-checkbox-group v-model="paramForm.color">
						      <el-checkbox label="黑色" name="color"></el-checkbox>
						      <el-checkbox label="白色" name="color"></el-checkbox>
						      <el-checkbox label="蓝色" name="color"></el-checkbox>
						      <el-checkbox label="绿色" name="color"></el-checkbox>
						    </el-checkbox-group>
						  </el-form-item>
						<el-form-item label="是否有大小" prop="size">
						  <el-checkbox-group v-model="paramForm.size">
						    <el-checkbox label="37" name="size"></el-checkbox>
						    <el-checkbox label="38" name="size"></el-checkbox>
						    <el-checkbox label="39" name="size"></el-checkbox>
						    <el-checkbox label="40" name="size"></el-checkbox>
						    <el-checkbox label="41" name="size"></el-checkbox>
						    <el-checkbox label="42" name="size"></el-checkbox>
						  </el-checkbox-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="stepup">上一步</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="next_shuxin('paramForm')">下一步</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品详情页">
					<el-form :model="xqyForm" :rules="xqyFormRules" ref="xqyForm" label-width="100px"
						label-position="top">
						<el-form-item>
							<el-tag type="success">上传详情页</el-tag>
						</el-form-item>
						<el-form-item label="详情页链接:" prop="detail_src">
							<el-input v-model="xqyForm.detail_src"></el-input>
						</el-form-item>
						<img :src="xqyForm.detail_src" width="200" height="200" />
						<el-form-item>
							<el-button type="primary" @click="stepup_cshu">上一步</el-button>
							<el-button type="primary" @click="next_pic('xqyForm')">下一步</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品图片">
					<el-form :model="picForm" :rules="picFormRules" ref="picForm" label-width="100px"
						label-position="top">
						<el-form-item>
							<el-tag type="success">上传商品主页面</el-tag>
						</el-form-item>
						<el-form-item label="主页面链接:" prop="image_src">
							<el-input v-model="picForm.image_src"></el-input>
						</el-form-item>
						<img :src="picForm.image_src" width="200" height="200" />
						<el-form-item>
							<el-button type="primary" @click="stepup_xqy">上一步</el-button>
							<el-button type="primary" @click="next_lunbo('picForm')">下一步</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品轮播">
					<el-form :model="lunboForm" :rules="addFormRules" ref="addFormRef" label-width="100px"
						label-position="top">
						<el-form-item>
							<el-tag type="success">上传商品轮播图</el-tag>
						</el-form-item>
						<el-form-item label="数量:">
							<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
						</el-form-item>
						<el-row :gutter="20">
							<el-col :span="8" v-for="(o,index) in num" :key="index">
								<el-form-item label="lunbo:">
									<el-input v-model="data[index]" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="lunbo:">
									<img :src="data[index]" width="100" height="120" />
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item>
							<el-button type="primary" @click="stepup_pic">上一步</el-button>
							<el-button type="primary" @click="done">完成</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>

	</div>
</template>

<script>
	import {
		getGoods,
		delGoods,
		addGoods,
		putGoods
	} from '../../comoon/api/goods.js'
	export default {
		methods: {
			done() {
				if(this.data.length==0){
					this.$message({
						message: 'What the hell are you doing?',
						type: 'error'
					});
				}
				else if(this.data.length != 0){
					let that = this;
					that.activeIndex = '5';
					that.form = {
						...that.msgForm,
						...that.paramForm,
						...that.xqyForm,
						...that.picForm
					};
					that.form['src'] = that.data;
					console.log(that.form);
					addGoods(that.form).then(response => {
						that.$message({
							message: '添加成功，宝贝',
							type: 'success'
						});
					}, response => {
						that.$message.error('已经添加过啦，不能重复添加哦');
					})
					setTimeout(function() {
						that.$router.push('/goods')
					}, 1200)
				}
				

			},
			next_lunbo(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.activeIndex = '4';
						this.form = {
							...this.msgForm,
							...this.paramForm,
							...this.xqyForm,
							...this.picForm
						};
					} else {
						return false;
					}
				});
				
			},
			next_pic(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.activeIndex = '3';
						this.form = {
							...this.msgForm,
							...this.paramForm,
							...this.xqyForm
						};
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			next_shuxin(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.activeIndex = '2';
				this.form = {
					...this.msgForm,
					...this.paramForm
				};
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				
			},
			stepup_pic() {
				this.activeIndex = '3';
			},
			stepup_xqy() {
				this.activeIndex = '2';
			},
			stepup_cshu() {
				this.activeIndex = '1';
			},
			stepup() {
				this.activeIndex = '0';
			},
			next(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.activeIndex = '1';
						this.form = {
							...this.msgForm
						};
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
				    this.msgForm.currentDate = date.getFullYear() + "-" + month + "-" + strDate;
					this.msgForm.currentMonth = month;
			},
		},
		mounted() {
			this.getTime();
		},
		data() {
			return {
				data: [],
				num: 1,
				feilei: '',
				activeIndex: '0',
				// 添加商品的表单数据对象
				form: {},
				lunboForm: {},
				picForm: {
					image_src: '',
				},
				xqyForm: {
					detail_src: '',
				},
				paramForm: {
					delivery: false,
					shangjia:false,
					color:[],
					size:[]
				},
				msgForm: {
					id: '',
					type: '',
					name: '',
					save: '',
					sale: '',
					starsale:'',
					currentDate:'',
					currentMonth:'',
				},
				// 添加商品表单的验证规则对象
				addFormRules: {
					name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请输入商品分类',
						trigger: 'change'
					}],
					id: [{
						required: true,
						message: '请输入商品id',
						trigger: 'blur'
					}],
					starsale: [{
						required: true,
						message: '请输入商品进货价格',
						trigger: 'blur'
					}],
					sale: [{
						required: true,
						message: '请输入商品售卖价格',
						trigger: 'blur'
					}],
					save: [{
						required: true,
						message: '请输入商品数量',
						trigger: 'blur'
					}]
				},
				paramFormRules: {
	
				},
				xqyFormRules:{
					detail_src: [{
						required: true,
						message: '请输入商品详情页',
						trigger: 'blur'
					}],
				},
				picFormRules:{
					image_src: [{
						required: true,
						message: '请输入商品主页面',
						trigger: 'blur'
					}],
				},
				options: [{
					value: '手机',
					label: '手机'
				}, {
					value: '女装',
					label: '女装'
				}, {
					value: '美妆',
					label: '美妆'
				}, {
					value: '电脑',
					label: '电脑'
				}, {
					value: '包包',
					label: '包包'
				}],
			}
		}
	}
</script>

<style>
</style>
