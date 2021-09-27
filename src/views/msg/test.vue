<template>
	 <button @click="testAxios">TestAxios</button>
</template>

<script>
	import Axios from 'axios'
	
	    export default {
	        methods: {
	            testAxios() {
	                const url = 'https://www.baidu.com/'
	
	                Axios.get(url).then(response => {
	                    if (response.data) {
	                        console.log(response.data)
	                    }
	                }).catch(err => {
	                    alert('请求失败')
	                })
	            }
	        }
	    }
</script>

<style>
</style>
