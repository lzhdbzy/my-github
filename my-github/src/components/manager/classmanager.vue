<template>
	<div>
		<el-button class="el-icon-circle-plus-outline" type="primary" plain @click="addclass">添加班级</el-button>
		<div class="classmain">
			<div class="list">
				<span class="class">课程</span>
				<ul>
					<li v-for="(value,index) in subject" @click="select">{{value.courseName}}</li>
				</ul>
			</div>
		</div>
		<div class="infolist">
			<el-table :data="Class" style="width: 100%">
				<el-table-column label="班级名称" width="180">
					<template slot-scope="scope">
						<span>{{ scope.row.className }}</span>
					</template>
				</el-table-column>
				<el-table-column label="授课老师" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.userName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="课程" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.courseName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="人数" width="100">
					<template slot-scope="scope">
						<span style="margin-left: 10px;">{{ scope.row.classStudents }}</span>
					</template>
				</el-table-column>
				<el-table-column label="开班时间" width="180">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.classCreateTime.substring(0,10) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						 <el-button size="mini" type="info" @click="madifclass(scope.row)">编辑</el-button>
						<el-button size="mini"type="danger" @click="delopen(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination xxlarge layout="prev, pager, next" :total="page" :page-size="10" @current-change="fy">
			</el-pagination>
		</div>
		<el-dialog title="添加班级" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-input v-model="addclassName" placeholder="班级名称"></el-input>
			<p></p>
			<el-select v-model="addClassCourseId" filterable placeholder="请选择课程编号">
				<el-option v-for="item in subject" :key="item.courseId  " :label="item.courseName+'('+item.courseId+')'" :value="item.courseId ">
				</el-option>
			</el-select>
			<p></p>
			<el-select v-model="addClassTeacherId" filterable placeholder="请选择老师编号">
				<el-option v-for="item in teacher" :key="item.userId" :label="item.userName+'('+item.userId+')'" :value="item.userId">
				</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
			    <el-button  @click="cancel('取消了添加')">取 消</el-button>
			    <el-button type="primary" @click="checkadd()">确 定</el-button>
			  </span>
		</el-dialog>
		<el-dialog title="修改班级" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-input v-model="madclassName" placeholder="班级名称"></el-input>
			<p></p>
			<el-select v-model="madClassCourseId" filterable placeholder="请选择课程编号">
				<el-option v-for="item in subject" :key="item.courseId  " :label="item.courseName+item.courseId" :value="item.courseId ">
				</el-option>
			</el-select>
			<p></p>
			<el-select v-model="madClassTeacherId" filterable placeholder="请选择老师编号">
				<el-option v-for="item in teacher" :key="item.userId" :label="item.userName+ item.userId" :value="item.userId">
				</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
			    <el-button  @click="cancel('取消了修改')">取 消</el-button>
			    <el-button type="primary" @click="madifcheck">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				pageing:1,//表示当前页
				subject: [],//课程信息
				Classmax:[],//全部的班级信息
				Class: [],//一页渲染的班级信息
				teacher:[],//获取老师编号
				dialogVisible:false,
				dialogVisible2:false,
				addClassTeacherId:"",//添加老师编号
				addClassCourseId:"",//添加课程编号
				addclassName:"",//添加班级名称
				madClassTeacherId:"",//修改老师编号
				madClassCourseId:"",//修改课程编号
				madclassName:"",//修改班级名称
				classId:""//班级ID
			};
		},
		methods: {
			filterClass(className){
			var filterArr=this.Classmax.filter(value=>value.courseName===className)
			this.Class.splice(0,this.Class.length)
			   for(var i=0;i<filterArr.length;i++){
			   	   this.Class.push(filterArr[i])
			   }
			},
			test() {
				this.Class.splice(0, 7)
				if(this.Classmax.length==(this.pageing-1)*7){
					this.pageing=this.pageing-1
				}
				var num = 0;
				if(this.Classmax.length > this.pageing*7) { //判断如果班级信息大于页数表示这一页后面还有数据则渲染上一页结束到这一页结束的数据
					num = this.pageing*7
				} else {
					num = this.Classmax.length//否则就等于数组长度
				}
				for(var i =(this.pageing-1)*7; i < num; i++) { //页面加载初始显示num条数据
					this.Class.push(this.Classmax[i])
				}
			},
			fy(index) {
				var num = 0
				this.Class.splice(0, 7)
				this.pageing=index
				if(Math.ceil(this.Classmax.length / 7) > index) { //判断总页数是否大于当前页 大于则表示后面还有数据则Num等于当前页乘以数量
					num = index * 7
				} else { //否则等于数组长度
					num = this.Classmax.length
				}
				for(var i = (index - 1) * 7; i < num; i++) { //替换数据
					this.Class.push(this.Classmax[i])
				}
			},
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
			cancel(msg){ //取消按钮弹出提示
				this.dialogVisible=false,
				this.dialogVisible2=false,
				this.$message.warning(msg)
			},
			handleClose(done) {//弹出框关闭
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			select() {//选中课程
				var ev = ev || event
				var list = document.getElementsByTagName("li")
				for(var i = 0; i < list.length; i++) {
					list[i].classList.remove("colortest")
					list[i].classList.remove("el-icon-success")
				}
				ev.target.classList.add("colortest")
				ev.target.classList.add("el-icon-success")
				this.filterClass(ev.target.innerText)
			},
			teacherInfo(){ //获取老师信息方法
				this.axios({
					url: "api/User/GetTeachers",
					async: true,
					headers: {
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					console.log(res.data)
					this.teacher = res.data
				})
			},
			subjectInfo() {//获取课程信息
				this.axios({
					url: "api/Class/GetAllCourse",
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					this.subject = res.data
				})
			},
			classInfo() { //获取班级信息
				this.axios({
					url: "api/Class/GetAllClass",
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					console.log(res.data)
					this.Classmax = res.data
					this.test()
					this.page = Math.ceil(this.Classmax.length / 7) * 10
				})
			},
			delopen(tid) {  //弹出删除弹框
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delclass(tid)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			delclass(row) {//删除方法
				this.axios({
					url: "api/Class/RemoveClass",
					method: "DELETE",
					params: {
						classId: row.classId
					},
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					console.log(res.data)
					this.checkinfo(res)
					this.classInfo()
				})
			},
			addclass() {//弹出添加框
				this.addClassTeacherId=""
				this.addClassCourseId=""
				this.addclassName=""
                this.dialogVisible=true
			},
			checkadd(){ //确认添加方法对接接口
				if(this.addClassTeacherId==""||this.addClassCourseId==""||this.addclassName==""){
					this.$message.error("信息未填写完整")
					return
				}
				this.axios({
					url: "api/Class/AddClass",
					method: "post",
					data: {
						"ClassName":this.addclassName,//要修改的班级名称
						"ClassCourseId":this.addClassCourseId,//课程编号
						"ClassTeacherId":this.addClassTeacherId,//老师编号
					},
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					this.dialogVisible=false
					this.checkinfo(res)
					this.classInfo()
				})
			},
			madifclass(row){ //弹出修改弹出框
				if(row.courseName=="Web前端开发")this.madClassCourseId=1
				else if(row.courseName==".NET后台开发")this.madClassCourseId=2
				else if(row.courseName=="软件测试")this.madClassCourseId=3
				this.madclassName=row.className
				this.classId=row.classId
				this.dialogVisible2=true
			},
			madifcheck(){ //确认修改方法对接接口
				if(this.madClassCourseId==""||this.madclassName==""||this.madClassTeacherId==""){
					this.$message.error("信息未填写完整")
					return
				}
				this.axios({
					url:"api/Class/ModifyClass",
					method:"put",
					data:{
						"ClassId":this.classId,//要修改的班级主键
						"ClassName":this.madclassName,//要修改的班级名称
						"ClassCourseId":this.madClassCourseId,//课程编号
						"ClassTeacherId":this.madClassTeacherId,//老师编号
					},
					headers: {
						//							"contentType": 'application/json; charset=UTF-8',
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res)=>{
					this.checkinfo(res)
					this.classInfo()
					this.dialogVisible2=false
				})
			}
		},
		created() { //钩子函数调用接口方法
			this.subjectInfo()
			this.classInfo()
			this.teacherInfo()
		}
	}
</script>

<style scoped>
	.el-tag {
		margin-left: 10px;
		cursor: pointer;
	}
	
	.colortest {
		color: skyblue !important;
	}
	
	.classmain {
		width: 80%;
		display: flex;
		margin: auto;
		margin-bottom: 2rem;
	}
	
	.list {
		width: 100%;
		display: flex;
		margin: auto;
	}
	
	.list ul {
		margin: 0px;
		padding: 0px;
	}
	
	.infolist {
		width: 71%;
		display: flex;
		margin: auto;
	}
	
	.el-pagination {
		margin: auto;
		position: fixed;
		bottom: 30px;
		left: 50%;
		transform: translate(-50%);
	}
	
	.class {
		text-align: center;
		width: 150px;
		margin-left: 30px;
		font-size: 1.5rem;
	}
	
	.list li {
		font-size: .75rem;
		float: left;
		list-style: none;
		margin-left: 20px;
		border: thin solid;
		line-height: 40px;
		text-align: center;
		margin-bottom: 5px;
		padding-left: 25px;
		padding-right: 25px;
		cursor: pointer;
	}
</style>