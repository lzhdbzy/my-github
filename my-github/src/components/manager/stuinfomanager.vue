<template>
	<div>
		<el-button class="el-icon-circle-plus-outline" type="primary" plain @click="addStuBtn">添加学生</el-button>
		<el-select v-model="className" class="sClass" filterable default-first-option placeholder="请选择班级" @change="select">
			<el-option v-for="item in classarr" :key="item.className" :label="item.className" :value="item.className">
			</el-option>
		</el-select>
		<el-input v-model="search" size="medium " class="search" prefix-icon="el-icon-search"  placeholder="输入关键字搜索"/>
		<div class="stumain">
			<div class="table">
				<el-table :data="arr.slice((paging-1)*pagingSize,paging*pagingSize)" border style="width=80%;">
					<el-table-column prop="className" label="班级名称" width="120">
					</el-table-column>
					<el-table-column prop="classId" label="班级编号" width="120">
					</el-table-column>
					<el-table-column prop="stuName" label="姓名" width="120">
					</el-table-column>
					<el-table-column prop="stuSex" label="性别" width="120">
					</el-table-column>
					<el-table-column prop="stuAge" label="年龄" width="120">
					</el-table-column>
					<el-table-column label="生日" width="150">
						<template slot-scope="scope">
							<span>{{ scope.row.stuBirthDay.substring(0,10) }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="stuMobile" label="手机号" width="150">
					</el-table-column>
					<el-table-column label="操作" width="180">
						<template slot-scope="scope">
							 <el-button size="mini" type="info" @click="madifystu(scope.row)">编辑</el-button>
						<el-button size="mini"type="danger" @click="delopen(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page">
				<el-pagination small layout="prev, pager, next" :total="arr.length" :page-size="pagingSize" @current-change="fy">
				</el-pagination>
			</div>
			<el-dialog title="修改学生信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-input v-model="uname" placeholder="学生姓名"></el-input>
				<!--<p></p>
				<el-select v-model="addClassId" placeholder="请选择班级编号">
					<el-option v-for="item in classarr" :key="item.classId  " :label="item.className+'('+item.classId+')'" :value="item.classId ">
					</el-option>
				</el-select>-->
				<p></p>
				<el-date-picker v-model="StuBirthDay" type="date" placeholder="选择出生日期">
				</el-date-picker>
				<p></p>
				<el-input v-model="uphone" placeholder="学生电话"></el-input>
				<p></p>
				<el-input v-model="addStuPassword" placeholder="登录密码"></el-input>
				<p></p>
				<el-radio v-model="usex" label="男"></el-radio>
				<el-radio v-model="usex" label="女"></el-radio>
				<span slot="footer" class="dialog-footer">
			    <el-button  @click="cancel('取消了添加')">取 消</el-button>
			    <el-button type="primary" @click="madifycheck">确 定</el-button>
			  </span>
			</el-dialog>
			<el-dialog title="添加学生" :visible.sync="addClassBtn" width="30%" :before-close="handleClose">
				<el-input v-model="uname" placeholder="学生姓名"></el-input>
				<p></p>
				<el-select v-model="addClassId" placeholder="请选择班级编号">
					<el-option v-for="item in classarr" :key="item.classId  " :label="item.className+'('+item.classId+')'" :value="item.classId ">
					</el-option>
				</el-select>
				<p></p>
				<el-date-picker v-model="StuBirthDay" type="date" placeholder="选择出生日期">
				</el-date-picker>
				<p></p>
				<el-input v-model="uphone" placeholder="学生电话"></el-input>
				<p></p>
				<el-input type="password" v-model="addStuPassword" placeholder="登录密码"></el-input>
				<p></p>
				<el-radio v-model="usex" label="男"></el-radio>
				<el-radio v-model="usex" label="女"></el-radio>
				<span slot="footer" class="dialog-footer">
			    <el-button  @click="cancel('取消了添加')">取 消</el-button>
			    <el-button type="primary" @click="addStucheck">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				paging: 1,
				pagingSize: 6,
				dialogVisible: false,
				addClassBtn: false,
				uname: "", //绑定的用户名
				uphone: "", //绑定的用户手机号码
				uage: "", //绑定的用户年龄
				usex: "男", //性别
				classarr: [], //班级选项
				addClassId: "", //班级ID
				StuBirthDay: "", //学生生日
				addStuPassword: "", //登录密码
				arr: [],//渲染到页面的数据
				arrs:[],//储存全部调取过来的数据
				stuId: "",
				className:"",
				search:"",//搜索框
				classId:"",//通过班级ID来查找改班级的学生
			}
		},
		methods: {
			select(content){ //选中班级渲染
				var classid=this.classarr.filter(value=>value.className===content)
				this.classId=classid[0].classId
				this.stuInfo(this.classId)
			},
			fy(index){
				this.paging=index
			},
			stuInfo(classId){
				this.axios({
					url: "api/Student/GetClassStudent",
					params: {
						classId:classId
					},
					headers: {
						//	"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					this.arr = res.data
					this.arrs=this.arr
				})
			},
			checkinfo(res) { //判断弹出框方法
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
			cancel(msg) { //取消按钮弹出提示
				this.dialogVisible = false,
					this.addClassBtn = false,
					this.$message.warning(msg)
			},
			classInfo() { //获取班级信息
				this.axios({
					url: "api/Class/GetAllClass",
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					this.classarr = res.data
					this.className=this.classarr[0].className
					this.classId=this.classarr[0].classId
					this.stuInfo(this.classId)
				})
			},
			addStuBtn() {
				this.addStuPassword = ""
				this.StuBirthDay = ""
				this.uname = ""
				this.uphone = ""
				this.addClassId = ""
				this.addClassBtn = true
			},
			addStucheck() {
				if(this.uname == "" || this.uphone == "" || this.addClassId == "" || this.StuBirthDay == "" || this.addStuPassword == "") {
					this.$message.error("信息未填写完整")
					return
				}
				this.axios({
					url: "api/Student/AddStudent",
					method: "post",
					data: {
						"StuName": this.uname, //学生姓名
						"StuClassId": this.addClassId, //班级编号
						"StuBirthDay": this.StuBirthDay, //生日
						"StuMobile": this.uphone, //手机号
						"StuPassword": this.addStuPassword, //登录密码,
						"StuSex": this.usex //性别
					},
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((msg) => {
					this.checkinfo(msg)
					this.stuInfo(this.classId)
					this.addClassBtn = false
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			madifystu(row) {
				this.dialogVisible = true
				this.uname = row.stuName
				this.uage = row.stuAge
				this.usex = row.stuSex
				this.uphone = row.stuMobile
				this.StuBirthDay = row.stuBirthDay
				this.stuId = row.stuUid
				this.addStuPassword=row.stuPassword
			},
			madifycheck() {
				if(this.uname == "" || this.uphone == "" || this.StuBirthDay == "" || this.addStuPassword == "") {
					this.$message.error("信息未填写完整")
					return
				}
				this.axios({
					url: "api/Student/ModifyStudent",
					method: "put",
					data: {
						"StuUid": this.stuId, // 要修改学生的唯一标识符
						"StuName": this.uname, //要修改的名称
						"StuBirthDay": this.StuBirthDay, //要修改的生日
						"StuMobile": this.uphone, //要修改的手机号
						"StuPassword": this.addStuPassword, //要修改的密码
						"StuSex": this.usex, //要修改的性别
					},
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((msg) => {
					console.log(this.StuBirthDay)
					this.checkinfo(msg)
					this.stuInfo(this.classId)
					this.dialogVisible = false
				})
			},
			delopen(tid) { //弹出删除弹框
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delStuInfo(tid)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			delStuInfo(tid) {
				console.log("未删除前的长度:"+this.arr.length)
				this.axios({
					url: "api/Student/RemoveStudent",
					method: "delete",
					params: {
						uid: tid.stuUid
					},
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((msg) => {
					this.checkinfo(msg)
					if(msg.data.code==1){
						this.arr=this.arr.filter(value=>value.stuUid!=tid.stuUid)
						this.arrs=this.arrs.filter(value=>value.stuUid!=tid.stuUid)
					}
				})
			}
		},
		created() {
			this.classInfo()
		},
		watch:{
			search(n,old){
				this.arr=this.arrs//先等于储存的全部班级数据
				this.arr=this.arr.filter(value=>value.stuName.indexOf(n)!=-1||value.stuMobile.indexOf(n)!=-1||value.stuSex.indexOf(n)!=-1)
			}
		}
	}
</script>

<style scoped>
	.search{
		width: 200px;
		margin-left: 1rem;
	}
	.sClass{
		margin-left: 1rem;
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
		width: 80%;
		display: flex;
		position: fixed;
		bottom: 50px;
	}
	
	
	.el-pagination {
		margin: auto;
	}
	
	.el-icon-circle-plus-outline {
		margin-bottom: 1.5rem;
	}
</style>