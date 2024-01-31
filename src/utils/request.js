//对axios进行二次封装,将刚才下载好的axios导入进来
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'

//1.利用axios对象的方法create,去创建一个axios实例
//2.requests就是axios,只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api，不用你手写
    baseURL:'',
    //请求时间超过5秒
    timeout:5000,//(毫秒)
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE3MDY0Mzg4MDAzODUsImV4cCI6MTcwNzA0MzYwMH0.6V-L0HcVpUcRvBQtbznMdTmfFp7tl9ujqxS318X6AwtyQQLXqSNwdSeJ2Uvpd7xz9SrdiDIoabOptQxXQ7J7Gg',
    },
});

//请求拦截器:在发请求之前，请求拦截器可以检测到,可以在请求发出去之前做一些事情
requests.interceptors.request.use(
    (config) => {
        // config 请求的所有信息
        // console.log(config);
        //config是个配置对象，对象里面有一个属性很重要，headers请求头

        return config
    },
    error => {
        // 请求发生错误时的相关处理 抛出错误
        //  //响应失败的返回
        return Promise.reject(error)
    }
)

//响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
requests.interceptors.response.use(response => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情。
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
},error => {
    // 我们可以在这里对异常状态作统一处理
    if (error.response) {
        // 处理请求失败的情况
        // 对不同返回码对相应处理
        return Promise.reject(error.response)
    }
});

//对外暴露requests(axios的二次封装)
export default requests;

