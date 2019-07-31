<template>
	<div class="picmain">
	<div class="loginmain">
		<div class="login">
		<div class="logo"><img src="../assets/logo.png"></div>
  <el-input placeholder="请输入账号" v-model="uname" class="uname">
    <template slot="prepend">账号</template>
  </el-input>
  <el-input type="password" placeholder="请输入密码" v-model="upwd" class="upwd">
    <template slot="prepend">密码</template>
  </el-input>
  <div class="btngroup">
  <el-button type="primary" round @click="login">登录</el-button>
  <!-- <el-button type="info" round @click="referch">重置</el-button> -->
  </div>
  </div>
</div>
</div>
</template>

<script>
export default {
       data(){
       	return{
       		 uname:"",
       		 upwd:""
       	}
       },
       methods:{
       	// referch(){
       	// 	this.uname=""
       	// 	this.upwd=""
       	// },
       	login(){
       		this.axios({
       			url:"/api/OAuth/authenticate?userMobile="+this.uname+"&userPassword="+this.upwd,
       		}).then((res)=>{
       			this.$message({
       			message:"登录成功",
       			type:"success"
       		})
       			console.log(res.data)
       			this.$router.push("/index")
       			this.$store.state.uid=res.data.profile.userUid
       			this.$store.state.token=res.data.access_token
       			this.$store.state.tokenType=res.data.token_type
       			console.log(this.$store.state.uid)
       		}).catch((res)=>{
       			this.$message({
       				message:"账号或密码错误",
       			    type:"error"
       			})
       		})
       	},
       	windowwid(){
       		var h=window.innerHeight
       		var main=document.getElementsByClassName("picmain")
       		main[0].style.cssText="height:"+h+"px;"
       	}
       },
       mounted(){
       	sessionStorage.clear()
       	this.windowwid()
       }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
   .uname,.upwd{
   	margin: auto;
   	width: 400px;
   }
   .picmain{
   	background: url(../assets/背景.jpg);
   }
   .loginmain{
   	display: flex;
   	width: 750px;
   	height: 250px;
   	 flex-direction: row;
   	 position: absolute;
   	 left: 50%;
   	 top:30%;
   	 transform: translate(-50%,-30%);
   }
   .login{
   		display: flex;
   		flex-direction: column;
   		border: 1px solid;
   		width: 100%;
   		height: 100%;
   		box-shadow: 0px 0px 2px 2px yellow
   }
   .logo{
   	 margin: auto;
   }
   .btngroup{
   	margin: auto;
   }
</style>