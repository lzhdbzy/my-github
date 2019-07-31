<template>
	<div>
		<button @click="test">测试</button>
	</div>
</template>

<script>
	export default{
		methods:{
			test(){
				this.axios({
					url:"api/User/ModifyPassword?uid=BEFCF397BC3F4697825FB0BEEE2E1B0B&oldPassword=123456&newPassword=123456",
					headers:{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcGkiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYyNzEyIiwiaWQiOiIyIiwibmFtZSI6IueuoeeQhuWRmCIsInBob25lX251bWJlciI6IjEzMTg5ODk4OTg5IiwibmJmIjoxNTUxMDYzMDQwLCJleHAiOjE1NTEwNjQyNDAsImlhdCI6MTU1MTA2MzA0MH0.5UbY1B7XFK6G8PL-LQ5kPco86GbKDRByTISpNJJRqqU"}
				}).then((res)=>{
					alert("213")
				}).catch((res)=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
</style>