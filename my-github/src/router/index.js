import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/index'
import bztest from '@/components/test/bztest'
import pytest from '@/components/test/pytest'
import cktest from '@/components/test/cktest'
import ckcjtab from '@/components/test/ckcjtab'
import ckcjtb from '@/components/test/ckcjtb'
import classmanager from '@/components/manager/classmanager'
import stuinfomanager from '@/components/manager/stuinfomanager'
import teainfomanager from '@/components/manager/teainfomanager'
import updatepwd from '@/components/manager/updatepwd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/", //登录路由
      component:Login
    },
    {
    	path:"/index",//首页路由
    	component:Index,
    	children:[
    	{
    		path:"updatepwd",//修改密码路由
    		name:"updatepwd",
    		component:updatepwd
    	},
    	{
    		path:"bztest",//布置试卷路由
    		name:"bztest",
    		component:bztest
    	},
    	{
    		path:"pytest",//批阅试卷路由
    		name:"pytest",
    		component:pytest
    	},
    	{
    		path:"cktest",//查看试卷路由
    		name:"cktest",
    		component:cktest
    	},
    	{
    		path:"ckcjtab",//查看成绩表格
    		name:"ckcjtab",
    		component:ckcjtab
    	},
    	{
    		path:"ckcjtb",//查看成绩图表
    		name:"ckcjtb",
    		component:ckcjtb
    	},
    	{
    		path:"classmanager",//班级管理
    		name:"classmanager",
    		component:classmanager
    	},
    	{
    		path:"stuinfomanager",//学生信息管理
    		name:"stuinfomanager",
    		component:stuinfomanager
    	},
    	{
    		path:"teainfomanager",//老师信息管理
    		name:"teainfomanager",
    		component:teainfomanager
    	}
    	]
    }
  ]
})
