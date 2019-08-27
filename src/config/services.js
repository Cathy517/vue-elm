import axios from 'axios';

// 创建axios实例
const service = axios.create({
  timeout: 100000, // 请求超时时间
  retry:1,//请求次数
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error(error);
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  (response) => {
    let { status, data } = response
    if (status === 200 || status === 304) {
      return data
    }else{
      Promise.reject(response)
    }
  },
  (error)=>{
    return Promise.reject(error)
  }
)

let httpServer = (opts)=>{
  return new Promise((resolve,reject)=>{
    return service(opts)
      .then((res)=>{
        resolve(res);
      })
      .catch((err)=>{
        reject(err)
      })
  })
};

export default httpServer;
