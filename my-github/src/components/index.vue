<template>
	<!--布局-->
		<el-container id="main">
		  <el-aside width="auto">
	<el-menu
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#374850"
      text-color="white"
      :collapse="value" @select="tabadd" 
      :default-active="$route.path">
       <div class="lpic"><img src="../assets/logo.png" ></div>
     <el-submenu index="1">
			    <template slot="title">
			      <i class="el-icon-location"></i>
			      <span slot="title">试卷管理</span>
			    </template>
			    <el-menu-item-group>
			      <el-menu-item index="/index/bztest">布置试卷</el-menu-item>
			       <el-menu-item index="/index/cktest">查看试卷</el-menu-item>
			      <el-menu-item index="/index/pytest">批阅试卷</el-menu-item>
			    </el-menu-item-group>
			     <el-menu-item index="/index" style="display: none;">首页</el-menu-item>
			  </el-submenu>
			  <el-submenu index="2">
			    <template slot="title">
			     <i class="el-icon-menu"></i>
			      <span slot="title">基础数据</span>
			    </template>
			    <el-menu-item-group>
			    	<el-menu-item index="/index/updatepwd">修改密码</el-menu-item>
			      <el-menu-item index="/index/ckcjtab">查看成绩表格</el-menu-item>
			      <el-menu-item index="/index/ckcjtb">查看成绩图表</el-menu-item>
			       <el-menu-item index="/index/classmanager">班级管理</el-menu-item>
			       <el-menu-item index="/index/stuinfomanager">学生信息管理</el-menu-item>
			        <el-menu-item index="/index/teainfomanager">老师信息管理</el-menu-item>
			    </el-menu-item-group>
			  </el-submenu>
			</el-menu>
		  </el-aside>
		  <el-container>
		    <el-header>
		 <div class="head">
		    	<span class='el-icon-d-arrow-left' @click="trsfor"></span>
		    <div class="list">
			<ul>
				<!--<li><font size="4" color=#87CEEB>WEB前端开发</font></li>-->
				<li>合作公司</li>
				<li>视频中心</li>
				<li>面试真题</li>
				<li>技术文章</li>
				<li>技术测试</li>
				<li>问答</li>
			</ul>
			  </div>
			  <div class="back">
				<span @click="back">退出系统</span>
				<div class="pic">
					<img src="../assets/管理员.png">
				</div>
				<p class="pname">用户名</p>
			</div>
		</div>
		    </el-header>
		    <el-main>
      	 <el-tabs v-model="editableTabsValue2" type="card" @tab-remove="removeTab">
				  <el-tab-pane
				    v-for="(item, index) in editableTabs"
				    :key="item.name"
				    :label="item.title"
				    :name="item.name"
				    :closable="index==0?false:true"
				  >
				  </el-tab-pane>
				</el-tabs>
				       <router-view></router-view>
		    </el-main>
		  </el-container>
		</el-container>
</template>

<script>
	export default {
    data() {
      return {
        value: true,
        editableTabsValue2: '0',
        editableTabs: [
        {	
        	title:"首页",
        	path:"/index",
        	name:"0"
        }
        ]
       }
    },
    methods:{
    	windowwid(){
       		var h=window.innerHeight
       		var main=document.getElementById("main")
       		main.style.cssText="height:"+h+"px;"
       },
    	tabadd(path){
    		var ev=ev||event
    		var index=this.findindex(ev.target.innerHTML)
    		if(index<0){	
    		var contentmain=document.getElementsByClassName("el-main")
    		var content=document.getElementsByClassName("el-tabs__item")
    		var wid=0
    		for(var i=0;i<content.length;i++){
    			  wid+=content[i].offsetWidth
    		}
    		if(wid>contentmain[0].offsetWidth-200){  //判断长度不够可以再加
    			this.$message({
    				message:"标签不能再多了",
    				type:"warning"
    			})	
    		}else{
    			let newTabName =Number(this.editableTabs[this.editableTabs.length-1].name)+1+""
		    	var a={title:ev.target.innerHTML,path:path,name:newTabName}
		    	this.editableTabsValue2 = newTabName;
    			this.editableTabs.push(a)
    			console.log(this.editableTabs[1].title)
    			var str="["
    			for(var i=0;i<this.editableTabs.length;i++){
    				str+="{title:'"+this.editableTabs[i].title+"',path:'"+this.editableTabs[i].path+"',name:'"+this.editableTabs[i].name+"'},"
    			}
    			str=str.substring(0,str.lastIndexOf(","))
    			str+="]"
    			sessionStorage.arr=str
    			sessionStorage.path=this.editableTabs[this.removeindex(this.editableTabsValue2)].path
    			sessionStorage.nvalue=this.editableTabsValue2
    		}
    		}else{
    			this.editableTabsValue2=this.editableTabs[index].name
    		}
     },
     trsfor(){
     	//图片伸缩
     	this.value=!this.value
     	var s=document.getElementsByClassName("el-icon-d-arrow-left")
     	if(!this.value){
     		s[0].classList.add("trsfor")
     	}else{
     		s[0].classList.remove("trsfor")
     	}
     },
     back(){
     	this.$message({
     		message:"系统已退出",
     		type:"warning"
     	})
     	this.$router.push("/")
     },
     findindex(name){ //查找元素是缶已存在
     	var index=0
     	for(var i=0;i<this.editableTabs.length;i++){
     		 if(this.editableTabs[i].title==name){
     		 	index=i
     		 	break
     		 }else{
     		 	index=-1
     		 }
     	}
     	return index
     },
     removeTab(tab) {
     	   var index=this.removeindex(tab)
     	   if(index==-1)return  //判断没有就返回
     	   if(this.editableTabs[index].name!=this.editableTabsValue2){ //判断如果删除tab在显示tab的左侧则只删除不跳转路由
     	   	  this.editableTabs.splice(index,1)
     	   }else{                                                     //判断如果删除tab在显示tab的右侧则既删除跳转路由
     	   	this.editableTabs.splice(index,1)
     	   	this.$router.push(this.editableTabs[index-1].path)
            this.editableTabsValue2=this.editableTabs[index-1].name
     	   }
           var arr=[]
           arr=eval("("+sessionStorage.getItem('arr')+")")
           arr.splice(index,1)
           sessionStorage.clear()
           var str="["
           for(var i=0;i<arr.length;i++){
    			for(var i=0;i<this.editableTabs.length;i++){
    				str+="{title:'"+this.editableTabs[i].title+"',path:'"+this.editableTabs[i].path+"',name:'"+this.editableTabs[i].name+"'},"
    			}
    			str=str.substring(0,str.lastIndexOf(","))
    			str+="]"
           }
           sessionStorage.arr=str
           sessionStorage.path=this.editableTabs[index-1].path
  		   sessionStorage.nvalue=this.editableTabsValue2
      },
      removeindex(tname){  //查找下标
     	var index=0
     	for(var i=0;i<this.editableTabs.length;i++){
     		 if(this.editableTabs[i].name==tname){
     		 	index=i
     		 	break
     		 }else{
     		 	index=-1
     		 }
     	}
     	return index
     }
    },
    watch:{
    	editableTabsValue2:{  //监听元素变化
    		deep:false,
    		handler(n,old){
       	    var index=this.removeindex(n)
       		var path=this.editableTabs[index].path  //获取新路由
    		this.$router.push(path) //跳转到新路由
    	   sessionStorage.path=path
  		   sessionStorage.nvalue=this.editableTabs[index].name
    	}
    		
    	}
    },
    mounted(){
    	console.log(this.$store.state.uid)
    	this.windowwid()
      	if(sessionStorage.arr!=undefined){
      		this.editableTabs=eval("("+sessionStorage.getItem('arr')+")")
      	}
      	this.$router.push(sessionStorage.getItem("path"));
      	this.editableTabsValue2=sessionStorage.getItem("nvalue")
 }
  };
  
</script>

<style scoped>
	*{
		padding: 0px;
	}
	/*收缩图标*/
	.head .el-icon-d-arrow-left{
	   font-size: xx-large;
	   color: white;
	   margin-top: auto;
	   margin-bottom: auto;
	}
	/*头部*/
	.head{
		display: flex;
		height: 100%;
		width: 100%;
		border-bottom: thin solid;
		margin: 0px;
		box-shadow: 1px 1px 1px 1px #A4A4A4;
		background: #4CAF50;
	}
.is-vertical{
		padding: 0px;
	}
	/*头部列表*/
	.list li{
		list-style: none;
		float: left;
		margin-left: 30px;
		font-size: 1rem;
		color: WHITE;
        text-align: center;
	}
	.list{
		margin-right: auto;
		flex: 1;
	}
.back{
	display: flex;
	color: white;
	font-size: .8rem;
	cursor: pointer;
	margin-right: 1.5rem;
}
.pic{
	margin: auto;
	margin-left: 40px;
	margin-right: 20px;
}
.pic img{
	border-radius:50% ;
}
span,.pname{
	margin: auto;
}
.trsfor{
	transform: rotateZ(180deg);
}
/*控制收缩*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    overflow: hidden!important;
  }
  .lpic{
  	border-bottom:thin solid;
  	padding-top: 6px;
  	box-shadow: 1px 1px 1px 1px #A4A4A4;
  	background: #4CAF50;
  }
  .lpic img{
  	 margin-left:10px ;
  }
  .el-menu-vertical-demo{
  	border: none;
  }
  .el-aside{
    overflow: hidden;
  	height: 100%;
  	border-right: thin solid;
  	background-color:#374850;
  }
  .el-main{
  	margin-top: 1rem;
  }
</style>
<style>
	body{
		margin: 0px;
		padding: 0px;
	}
</style>