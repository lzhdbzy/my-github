<template>
	<div class="updatemain">
		<h3>修改密码</h3>
		<div>
			<el-input placeholder="请输入旧密码" v-model="oldpwd">
				<template slot="prepend">旧密码：</template>
			</el-input>
		</div>
		<div>
			<el-input type="password" placeholder="请输入新密码" v-model="newpwd">
				<template slot="prepend">新密码：</template>
			</el-input>
		</div>
		<div>
			<el-input type="password" placeholder="请确认密码" v-model="checkpwd">
				<template slot="prepend">确认密码：</template>
			</el-input>
		</div>
		<div class="btngroup">
			<el-button type="primary" round @click="check">确定</el-button>
			<el-button type="info" round @click="referch">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				oldpwd: '',
				newpwd: '',
				checkpwd: '',
			}
		},
		methods: {
			referch() {
				this.oldpwd = ""
				this.newpwd = ""
				this.checkpwd= ''
				this.$message({
					message:"取消了修改密码",
					type:"warning"
				})
			},
			check() { //确认修改方法
				this.axios({
					url: "api/User/ModifyPassword",
					params: {
						"uid": this.$store.state.uid,
						"oldPassword": this.oldpwd,
						"newPassword": this.newpwd
					},
					headers: {
						"Authorization": this.$store.state.tokenType + " " + this.$store.state.token
					}
				}).then((res) => {
					if(res.data.code == 0) {
						this.$message({
							message: res.data.message,
							type: "warning"
						})
					} else if(res.data.code == 1) {
						this.$message({
							message: res.data.message,
							type: "success",
						})
					} else if(res.data.code == -1) {
						this.$message({
							message: res.data.message,
							type: "error"
						})
					} else {
						this.$message({
							message: res.data.message,
							type: "waring"
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.updatemain {
		width: 50%;
		display: flex;
		flex-flow: column;
		border: 1px solid;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	h3 {
		margin: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	
	/deep/ .el-input-group__prepend {
		width: 70px;
	}
	
	.updatemain div {
		margin: auto;
		margin-bottom: 1rem;
	}
	
	span {
		display: inline-block;
		text-align: right;
	}
</style>