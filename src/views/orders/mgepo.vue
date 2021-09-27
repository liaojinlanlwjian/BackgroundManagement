<template>
  <el-table
    :data="tableData"
    style="width: 100%"
	:default-sort = "{prop: 'date', order: 'descending'}"
	>
    <el-table-column type="expand">
     <template slot-scope="props">
     	<el-table :data="props.row.goods" style="width: 100%">
     		<el-table-column label="商品 ID" width="80px" prop="id">
     		</el-table-column>
			<el-table-column label="商品图片" prop="image_src" width="110px">
				  <template slot-scope="scope" >
					  <img :src="scope.row.image_src" width="100" height="100">
				      </template>
			</el-table-column>
     		<el-table-column label="商品名称" width="210px" prop="name">
     		</el-table-column>
     		<el-table-column label="商品价格" align="center" width="80px" prop="sale">
     		</el-table-column>
			<el-table-column label="商品颜色" align="center"   width="80px" prop="color">
			</el-table-column>
			<el-table-column label="商品大小" align="center"  width="80px" prop="size">
			</el-table-column>
			<el-table-column label="商品数量" align="center"  width="80px" prop="step">
			</el-table-column>
			<el-table-column label="商品优惠" align="center"   width="200px" prop="youhuiquan">
			</el-table-column>
			<el-table-column label="商品原价" align="center"   width="90px" prop="sale">
			</el-table-column>
			<el-table-column label="优惠后价格" align="center"   width="90px" prop="nowsale">
			</el-table-column>
			<el-table-column label="订单总价" >
				<template slot-scope="scope" >
						<span> ￥ {{ scope.row.step*scope.row.nowsale }}</span>
				    </template>
			</el-table-column>
     	</el-table>
     	
     </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
	  width="80px"
      prop="id">
    </el-table-column>
	<el-table-column
	  label="购买时间"
	  width="120px"
	  sortable
	  prop="time">
	</el-table-column>
	<el-table-column
	  label="购买者账号"
	  width="90px"
	  prop="username">
	</el-table-column>
	<el-table-column
	  label="收件人"
	  width="80px"
	  prop="name">
	</el-table-column>
	<el-table-column
	  label="支付状态"
	  width="85px"
	  prop="status">
	</el-table-column>
    <el-table-column
      label="收货地址"
      prop="address" 
	  fit="true"
	  >
    </el-table-column>
	<el-table-column
	  label="收件人号码"
	  width="180px"
	  prop="tel">
	</el-table-column>
    <el-table-column
      label="发货状态"
	  width="90px"
      prop="goods_status">
    </el-table-column>
	 <el-table-column label="操作">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleEdit(scope.$index, scope.row)">修改发货状态</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.$index, scope.row)">删除该订单</el-button>
	      </template>
	    </el-table-column>
	

	
  </el-table>
</template>
<script>
	import {
		getPo,
		delPo,
		patchPo
	} from '../../comoon/api/po.js'
	import axios from "axios"
	export default {
		data() {
			return {
				tableData: [],
				status: '已发货',
				name: '2'
			}
		},
		mounted() {
			this.getdata();
		},
		created() {
			this.$parent.showNav = true;
		},
		methods: {
			handleEdit(index, row) {
				let params = {
					goods_status: this.status,
				};
				patchPo(row.id, params).then(response => {
					this.getdata();
					this.$message({
						message: '修改成功，宝',
						type: 'success',

					});
				}, response => {
					this.$message.error('已经修改过啦，不能重复修改哦');
				})


			},
			handleDelete(index, row) {
				delPo(row.id).then(response => {
					this.getdata();
					this.$message({
						message: '删除成功，宝贝',
						type: 'success'
					});
				}, response => {
					this.$message.error('已经删除过啦，不能重复删除哦');
				})
			},
			getdata() {
				getPo().then(response => {
					this.tableData = response;
				}, response => {
					console.log("error");
				})
			},
			con_Edit() {
				var name = this.form.name;
				var sale = this.form.sale;


			},
			con_Del() {
				console.log(this.form.name);

			},
		}
	}
</script>
<style type="text/css">
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