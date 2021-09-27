<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="进货时间为:">
				<el-tag type="info">{{ruleForm.currentDate}}</el-tag>
			</el-form-item>
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="进货价格" prop="starsale">
				<el-input v-model="ruleForm.starsale"></el-input>
			</el-form-item>
			
			<el-form-item label="售卖价格" prop="sale">
				<el-input v-model="ruleForm.sale"></el-input>
			</el-form-item>

			<el-form-item label="商品库存" prop="save">
				<el-input v-model="ruleForm.save"></el-input>
			</el-form-item>
			<el-form-item label="分类:" prop="type">
				<el-select v-model="ruleForm.type" placeholder="请选择分类">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<div style="display: flex;">
				<div style="width: 52%;">
					<el-form-item label="是否免配送费" prop="delivery">
						<el-switch v-model="ruleForm.delivery"></el-switch>
					</el-form-item>
					<el-form-item label="是否上架" prop="shangjia">
						<el-switch v-model="ruleForm.shangjia"></el-switch>
					</el-form-item>
					<el-form-item label="颜色属性" prop="color">
						<el-checkbox-group v-model="ruleForm.color">
							<el-checkbox label="黑色" name="color"></el-checkbox>
							<el-checkbox label="白色" name="color"></el-checkbox>
							<el-checkbox label="蓝色" name="color"></el-checkbox>
							<el-checkbox label="绿色" name="color"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="大小属性" prop="size">
						<el-checkbox-group v-model="ruleForm.size">
							<el-checkbox label="37" name="size"></el-checkbox>
							<el-checkbox label="38" name="size"></el-checkbox>
							<el-checkbox label="39" name="size"></el-checkbox>
							<el-checkbox label="40" name="size"></el-checkbox>
							<el-checkbox label="41" name="size"></el-checkbox>
							<el-checkbox label="42" name="size"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</div>
				<div style="width: 22%;">
					<el-form-item label="商品主图片:" prop="image_src">
						<el-input v-model="ruleForm.image_src"></el-input>
					</el-form-item>
					<el-form-item>
						<img :src="ruleForm.image_src" width="100" height="120" />
					</el-form-item>
				</div>
				<div style="width: 21%;">
					<el-form-item label="商品详情页:" prop="detail_src">
						<el-input v-model="ruleForm.detail_src"></el-input>
					</el-form-item>
					<el-form-item>
						<img :src="ruleForm.detail_src" width="100" height="320" />
					</el-form-item>
				</div>
			</div>

			<el-form-item label="商品轮播图:">
				<el-row :gutter="20">
					<el-col :span="8" v-for="(o,index) in ruleForm.src" :key="index">
						<el-form-item label="轮播图:">
							<el-input v-model="ruleForm.src[index]" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<img :src="o" width="100" height="120" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form-item>
			<div style="width: auto; float: right;	">
				<el-button type="primary" @click="submitForm('ruleForm')">修 改</el-button>
				<el-button @click="resetForm">返回</el-button>
			</div>

		</el-form>
	</div>
</template>

<script>
	import {
		getGoods,
		putGoods
	} from '../../comoon/api/goods.js'
	export default {
		data() {
			return {
				src: [],
				ruleForm: {
					id: '',
					type: '',
					name: '',
					save: '',
					starsale:'',
					sale: '',
					delivery: false,
					shangjia: false,
					color: [],
					size: [],
					image_src: '',
					detail_src: '',
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
				rules: {
					name: [{
						required: true,
						message: '请务必输入商品名称',
						trigger: 'blur'
					}, ],
					starsale: [{
						required: true,
						message: '请务必输入商品进货价格',
						trigger: 'blur'
					}],
					sale: [{
						required: true,
						message: '请务必输入商品售卖价格',
						trigger: 'blur'
					}],
					save: [{
						required: true,
						message: '请务必输入商品库存',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请务必选择一项',
						trigger: 'change'
					}],
					image_src: [{
						required: true,
						message: '请务必输入商品主图片',
						trigger: 'change'
					}]
				}
			};
		},
		mounted() {
			this.ruleForm = this.$route.query.data;
		},
		methods: {
			putdata() {
				let that = this;
				putGoods(that.ruleForm.id, that.ruleForm).then(res => {
					that.$message({
						message: '修改成功，宝',
						type: 'success'
					});
					setTimeout(function() {
						that.$router.go(-1);
					}, 1200);
				}, res => {
					console.log("error");
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.putdata();
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$router.go(-1);
			}
		}
	}
</script>

<style>
</style>
