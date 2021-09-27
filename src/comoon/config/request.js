import axios from 'axios' //封装http交互库
import qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import router from './router'

//请求地址
axios.defaults.baseURL = 'http://localhost:3000'
//设置超时时间
// post请求头

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withcredentials = true

//请求拦截(请求发出前处理请求)
axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器（处理响应数据）
axios.interceptors.response.use(
  (res) => {
    const ret = res.data
    return res
  },
  (error) => {
    Message({
      showClose: true,
      message: error.message,
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error);
  }
);

// 封装get方法
function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

// 封装post方法
function post_noqs(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}
// qs.stringify qs.stringify()作用是将对象或者数组序列化成URL的格式
// qs.qrase 则是反过来
//qs.parse qs.stringify是用来处理url的，JSON.parse JSON.stringify是处理json的
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url,qs.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}
// 封装post方法 对内方法
function del(url) {
  return new Promise((resolve, reject) => {
     //axios  method (url,data)
     //axios.put(url, params) //封装请求  统一处理 default host  请求拦截 响应拦截
    axios.delete(url).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

function put_noqs(url, params) {
  //Promise 是es6  resolve//成功  reject、//失败 async  ...
  return new Promise((resolve, reject) => {
     //axios  method (url,data)
     //axios.put(url, params) //封装请求  统一处理 default host  请求拦截 响应拦截
    axios.put(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}
// 封装post方法
function put(url, params) {
  //Promise 是es6  resolve//成功  reject、//失败 async  ...
  return new Promise((resolve, reject) => {
     //axios  method (url,data)
     //axios.put(url, params) //封装请求  统一处理 default host  请求拦截 响应拦截
    axios.put(url, qs.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}
function patch(url, params) {
  //Promise 是es6  resolve//成功  reject、//失败 async  ...
  return new Promise((resolve, reject) => {
     //axios  method (url,data)
     //axios.put(url, params) //封装请求  统一处理 default host  请求拦截 响应拦截
    axios.patch(url, qs.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}
function patch_noqs(url, params) {
  //Promise 是es6  resolve//成功  reject、//失败 async  ...
  return new Promise((resolve, reject) => {
     //axios  method (url,data)
     //axios.put(url, params) //封装请求  统一处理 default host  请求拦截 响应拦截
    axios.patch(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}
//对外接口 url：代表请求地址  method：请求方法，data：请求参数据
//调用方法：request({'http://www.baidu.com',get,[{wd:'123456'}]});
export function request({url,method,data}) {
  if (method == 'get') {
    return get(url);
  } else if (method == 'post_noqs') {
    return post_noqs(url, data);
  }else if (method == 'put_noqs') {
    return put_noqs(url, data);
  }else if (method == 'patch_noqs') {
    return patch_noqs(url, data);
  }else if (method == 'post') {
    return post(url, data);
  }
  else if (method == 'delete') {
    return del(url);
  }else if (method == 'put') {
    return put(url, data);
  }
  else if (method == 'patch') {
    return patch(url, data);
  }
}
//默认的外部接口
export default request
