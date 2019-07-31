<template>
	<div>
		<div class="addpic" @click="addblock">
			<img src="../../assets/个人页  添加  加关注.png">
		</div>
		<div class="stumain">
			<div class="table">
				<el-table :data="arr" border style="width=80%;">
					<el-table-column prop="userName" label="姓名" width="120">
					</el-table-column>
					<el-table-column prop="userSex" label="性别" width="120">
					</el-table-column>
					<el-table-column prop="userMobile" label="电话" width="120">
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="delopen(scope.row)">删除</el-button>
							<el-button type="text" size="small" @click="madifyteach(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--编辑信息-->
			<div class="page">
				<el-pagination small layout="prev, pager, next" :total="page" :page-size="10" @current-change="fy">
				</el-pagination>
			</div>
			<el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-input v-model="tname" placeholder="姓名"></el-input>
				<p></p>
				<div>
					<el-radio v-model="tsex" label="1">男</el-radio>
					<el-radio v-model="tsex" label="2">女</el-radio>
				</div>
				<p></p>
				<el-input v-model="tphone" placeholder="电话"></el-input>
				<p></p>
				<span slot="footer" class="dialog-footer">
			    <el-button  @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="check">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
		<!--新增老师-->
		<el-dialog title="添加信息" :visible.sync="addvalue" width="30%" :before-close="handleClose">
			<el-input v-model="addname" placeholder="姓名"></el-input>
			<p></p>
			<div>
				<el-radio v-model="addsex" label="1">男</el-radio>
				<el-radio v-model="addsex" label="2">女</el-radio>
			</div>
			<p></p>
			<el-input v-model="addphone" placeholder="电话"></el-input>
			<p></p>
			<el-input v-model="addpwd" placeholder="密码"></el-input>
			<span slot="footer" class="dialog-footer">
			    <el-button  @click="addvalue = false">取 消</el-button>
			    <el-button type="primary" @click="addteacher">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				dialogVisible: false,
				addvalue: false,
				tname: "", //修改绑定的用户名
				tphone: "", //修改绑定的电话
				tsex: "1", //修改绑定的性别
				uid:"",//修改的用户id
				addname: "", //添加绑定的用户名
				addphone: "", //添加绑定的电话
				addsex: "1", //添加绑定的性别
				addpwd: "", //添加绑定的密码
				arrs: [], //获取接口的所有数据
				arr: [], //渲染到界面的数据
				pageing:1//表示当前页
			}
		},
		methods: {
			checkinfo(res){   //判断弹出框方法
				if(res.data.code == 1) {
							this.$message({
								message: res.data.message,
								type: "success"
							})
						} else if(res.data.code == 0) {
							this.$message({
								message: res.data.message,
								type: "info"
							})
						} else if(res.data.code == -1) {
							this.$message({
								message: res.data.message,
								type: "error"
							})
						} else {
							this.$message({
								message: res.data.message,
								type: "error"
							})
						}
			},
			delopen(tid) {  //弹出删除弹框
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
						callback:this.del(tid)
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			del(tid){ //删除方法
				this.axios({
					url:"api/User/RemoveTeacher",
					method:"post",
					datatype:"josn",
					params:{
						"uid":tid.userUid
					},
					headers: {
//							"contentType": 'application/json; charset=UTF-8',
							"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
						}
				}).then((res)=>{
					console.log(res.data.code)
					this.checkinfo(res)
					this.info()
				}).catch((res)=>{
					console.log(res.data)
				})
			},
			info() {   //获取老师信息方法
				this.axios({
					url: "api/User/GetTeachers",
					async: true,
					headers: {
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					console.log(res.data)
					this.arrs = res.data
					this.test()
					this.page = Math.ceil(this.arrs.length / 7) * 10
				})
			},
			test() {
				this.arr.splice(0, 7)
				if(this.arrs.length==(this.pageing-1)*7){
					this.pageing=this.pageing-1
				}
				var num = 0;
				if(this.arrs.length > this.pageing*7) { //判断如果
					num = this.pageing*7
				} else {
					num = this.arrs.length
				}
				for(var i =(this.pageing-1)*7; i < num; i++) { //页面加载初始显示num条数据
					this.arr.push(this.arrs[i])
				}
			},
			fy(index) {
				var num = 0
				this.arr.splice(0, 7)
				this.pageing=index
				if(Math.ceil(this.arrs.length / 7) > index) { //判断总页数是否大于当前页 大于则表示后面还有数据则Num等于当前页乘以数量
					num = index * 7
				} else { //否则等于数组长度
					num = this.arrs.length
				}
				for(var i = (index - 1) * 7; i < num; i++) { //替换数据
					this.arr.push(this.arrs[i])
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			madifyteach(row) {     //弹出修改信息弹框
				this.dialogVisible = true
				if(row.userSex == "男") {
					this.tsex = "1"
				} else {
					this.tsex = "2"
				}
				this.tname = row.userName
				this.tphone = row.userMobile
				this.uid=row.userUid
			},
			check(){       //确认修改信息方法
				if(this.tphone.length!=11){
					this.$message({
						message:"手机号为11位",
						type:"error"
					})
					return
				}
				if(this.tname == "" || this.tphone == "") {
					this.$message({
						message: "信息未填写完整",
						type: "error"
					})
					return
				}
				var sex=""
				if(this.tsex==1){
					sex="男"
				}else{
					sex="女"
				}
				this.axios({//确认修改信息方法
					url:"api/User/ModifyTeacher",
					method:"post",
					data:{
						"UserUid":this.uid, //要修改的用户标识符
						"UserName":this.tname, //修改名称
						"UserMobile":this.tphone, //要修改的手机号，11位手机号
						"UserSex":sex, //要修改的性别，男|女
					},
					headers: {
							"contentType": 'application/json; charset=UTF-8',
							"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
						}
				}).then((res)=>{
					this.checkinfo(res)
					this.info()
					this.dialogVisible=false
				})
			},
			addblock(){  //弹出弹框
				this.addname="",
				this.addphone = ""
				this.addpwd = ""
				this.addsex="1"
				this.addvalue = true
			},
			addteacher() {   //添加老师信息方法
				if(this.addname == "" || this.addphone == "" || this.addpwd == "") {
					this.$message({
						message: "信息未填写完整",
						type: "error"
					})
				} else {
					if(this.addsex == 1) {
						this.addsex = "男"
					} else {
						this.addsex = "女"
					}
					this.axios({ //添加老师信息方法
						url: "/api/User/AddTeacher",
						method: "post",
						datatype: "json",
						data: {
							"UserName": this.addname, //用户名
							"UserMobile": this.addphone, //手机号
							"UserSex": this.addsex, //性别
							"UserPassword": this.addpwd, //密码
						},
						headers: {
							"contentType": 'application/json; charset=UTF-8',
							"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
						}
						//          		transformRequest:[function(data){
						//						var msg=""
						//						for(let it in data){
						//							msg+=encodeURIComponent(it)+"="+encodeURIComponent(data[it])+"&"
						//						}77
						//						return msg;
						//					}]
					}).then((res) => {
						this.checkinfo(res)
						this.addvalue = false
						this.info()
					}).catch((res) => {
						console.log(res)
					})
				}
			}
		},
		created() {
			this.info()
		}
		//		mounted(){
		//			console.log(this.arrs)
		//			this.test()
		//			this.page=Math.ceil(this.arrs.length/7)*10  //页面加载总页数计算
		//		}
	}
</script>

<style scoped>
	.addpic {
		width: 95%;
		margin: auto;
		text-align: center;
		border: thin solid #A4A4A4;
		margin-bottom: 1rem;
		cursor: pointer;
		border-radius: 1rem;
	}
	
	.stumain {
		width: 100%;
		display: flex;
		flex-flow: wrap;
	}
	
	.infolist {
		width: 90%;
		margin: auto;
		margin-bottom: 50px;
	}
	
	.table {
		margin: auto
	}
	
	.page {
		width: 85%;
		display: flex;
		position: fixed;
		bottom: 50px;
	}
	
	.el-pagination {
		margin: auto;
	}
</style>