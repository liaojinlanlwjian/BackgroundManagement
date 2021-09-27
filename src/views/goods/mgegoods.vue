<template>
	<div>
		<div>
			<el-row :gutter="20">
				<el-col :span="21">
					<div class="grid-content bg-purple">
						<div class="demo-input-suffix">
							<el-input placeholder="请输入内容" v-model="keyUser" prefix-icon="el-icon-search">
							</el-input>
						</div>
						</el-button>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple">
						<el-button type="primary" @click="handleAdd">添加<i
								class="el-icon-circle-plus el-icon--right"></i>
						</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div>


			<el-table :data="searchUserinfo(keyUser).slice((currentPage-1)*pagesize,currentPage*pagesize)"
				style="width: 100%">
				<el-table-column label="id" width="100">
					<template slot-scope="scope">
						<i class="el-icon-position"></i>
						<span style="margin-left: 10px">{{ scope.$index +1 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="名称" width="350%">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p>名称: {{ scope.row.name }}</p>
							<p>价格: {{ scope.row.sale }}</p>
							<div slot="reference" class="name-wrapper">
								<el-tag size="small" type="success">{{ scope.row.name }}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="价格" width="140">
					<template slot-scope="scope">
						<span>{{ scope.row.sale }}</span>
					</template>
				</el-table-column>
				<el-table-column label="进货" width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.save }}</span>
					</template>
				</el-table-column>
				<el-table-column label="库存" width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.Nowsave }}</span>
					</template>
				</el-table-column>
				<el-table-column label="是否上架" width="80" align="center">
					<template slot-scope="scope">
						<el-switch disabled v-model="scope.row.shangjia"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="是否免配送费" width="120" align="center">
					<template slot-scope="scope">
						<el-switch disabled v-model="scope.row.delivery"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="图片" width="160">
					<template slot-scope="scope">
						<img :src="scope.row.image_src" width="100" height="120" />
					</template>
				</el-table-column>
				<el-table-column label="操作"  width="160">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="mini" type="danger"
							@click="handleDelete(scope.$index, scope.row,dialogFormVisible1 = true)">删除</el-button>
						<el-dialog title="确定要删除此项数据么？" :visible.sync="dialogFormVisible1">
							<el-form :model="form">
								<el-form-item label="id:" :label-width="formLabelWidth">
									<el-input v-model="form.id" autocomplete="off" disabled="disabled"></el-input>
								</el-form-item>
								<el-form-item label="name:" :label-width="formLabelWidth">
									<el-input v-model="form.name" autocomplete="off" disabled="disabled"></el-input>
								</el-form-item>
								<el-form-item label="sale:" :label-width="formLabelWidth">
									<el-input v-model="form.sale" autocomplete="off" disabled="disabled"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button type="primary" plain @click="dialogFormVisible1 = false">取 消</el-button>
								<el-button type="warning" plain @click="con_Del(dialogFormVisible1 = false)">确 定
								</el-button>
							</div>
						</el-dialog>
					</template>
				</el-table-column>
			</el-table>
		</div>
		  <div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage1"
		      :page-size="100"
		      layout="total, prev, pager, next"
		      :total="1221">
		    </el-pagination>
		  </div>
	</div>
</template>

<script>
	import qs from 'qs'
	import {
		getGoods,
		delGoods,
		addGoods,
		putGoods
	} from '../../comoon/api/goods.js'
	export default {
		data() {
			return {
				lengthh:'',
				currentPage1: 5,
				data: [],
				src:[],
				num: 1,
				currentPage: 1, //初始页
				pagesize: 4,
				tableData: [],
				dialogFormVisible: false,
				dialogFormVisible1: false,
				dialogFormVisible2: false,
				keyUser: "",
				form: {
					value_se:'',
					name: '',
					sale: '',
					img_src: '',
					detail_src: '',
					index: '',
					id: '',
				},
				formLabelWidth: '60px',
				formLabelWidthh: '20px',
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
		},
		mounted() {
			this.getdata();
			// let obj = {
			// methods: 'query_stu',
			// name: 'chenchen'
			// };
			// console.log(obj);
			// console.log(JSON.stringify(obj));//JSON.stringify 把javascript的对象序列化成JSON字符串
			// let add = JSON.stringify(obj);
			// console.log(JSON.parse(add));//JSON.prase 则将字符串转成对象
			// console.log(qs.stringify(obj));//qs.stringify()作用是将对象或者数组序列化成URL的格式
		},
		created() {
			this.$parent.showNav = true;
		},
		methods: {
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleEdit(index, row) {
				this.$router.push({path: "/editGoods", query: {data: row}})
				// console.log(row);
				// this.form = {
				// 	name: row.name,
				// 	sale: row.sale,
				// 	img_src: row.image_src,
				// 	id: row.id,
				// 	detail_src: row.detail_src,
				// 	value_se:row.type
				// };
				// this.src = row.src;
			},
			con_Edit() {
				let str = this.src;
				let params = {
					type:this.form.value_se,
					image_src: this.form.img_src,
					name: this.form.name,
					sale: this.form.sale,
					detail_src: this.form.detail_src,
					src:str
				};
				putGoods(this.form.id, params).then(response => {
					this.getdata();

					this.$message({
						message: '修改成功，宝贝',
						type: 'success',

					});
				}, response => {
					this.$message.error('已经修改过啦，不能重复修改哦');
				})

			},
			handleAdd() {
				this.$router.push('/addGoods');
				// this.form = {
				// 	name: "",
				// 	sale: "",
				// 	img_src: "",
				// };
				// this.num = 0;
			},
			con_Add() {
				let str = this.data;
				let params = {
					type:this.form.value_se,
					image_src: this.form.img_src,
					id: this.form.id,
					name: this.form.name,
					sale: this.form.sale,
					src:str//单条数据的就用qs 如果不是则不用  就像params中包含有数组啊 对象啊 这种的
				};
				addGoods(params).then(response => {
					this.getdata();
					this.form = {
						name: "",
						sale: "",
						img_src: "",
					};
					this.num = 0;
					this.$message({
						message: '添加成功，宝贝',
						type: 'success'
					});
				}, response => {
					this.$message.error('已经添加过啦，不能重复添加哦');
				})
			},
			handleDelete(index, row) {
				this.form = {
					id: row.id,
					name: row.name,
					sale: row.sale,
					index: index + 4
				}
			},
			con_Del() {
				let params = {
					id: this.form.id
				};
				delGoods(this.form.id).then(response => {
					this.getdata();
					this.$message({
						message: '删除成功，宝贝',
						type: 'success'
					});
				}, response => {
					this.$message.error('删除失败');
				})
			},
			getdata() {
				getGoods().then(response => {
					this.tableData = response;
					this.lengthh = response.length;
				}, response => {
					console.log("error");
				})
			},
			searchUserinfo(keyUser) {
				return this.tableData.filter((user) => {
					/* 返回一个新的数组 */
					if (user.name.includes(keyUser)) {
						return user
					}
				})
			}

		}
	}
</script>
<style type="text/css" scoped="scoped">
	.el-row {
		height: 55px;
	}

	.demo-input-suffix {
		width: 400px;
	}
</style>
