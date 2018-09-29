import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import {baseUrl} from './env'
// axios 配置
axios.defaults.timeout = 5000000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = baseUrl;
//POST传参序列化
axios.interceptors.request.use((config) => {
	const token=Cookies.get('token');
	if(config.method  === 'post'){
		config.data = qs.stringify(config.data);
	}
	if(token){
		config.headers.Authorization = token;
	}
	return config
}, (error) => {
	return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
	if(!res.data.success){
		if(res.status===200){
			return res;
		}
		return Promise.reject(res);
	}
	return res;
}, (error) => {
	//统一处理服务端返回的异常
	return Promise.reject(error);
});

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	return new Promise((resolve, reject) => {
		if(method == 'fetch' && type == 'POST'){
			axios.post(url,data)
				.then(response => {
					resolve(response.data);
				}, err => {
					reject(err);
				})
				.catch((error) => {
					reject(error)
				})
		}else{
			axios.get(url, {
					params: data
				})
				.then(response => {
					resolve(response.data);
				}, err => {
					reject(err);
				})
				.catch((error) => {
					reject(error)
				})
		}
	})
}