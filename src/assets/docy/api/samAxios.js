// const axios = require('axios'); Uncaught ReferenceError: require is not defined

// axios 配置和实例创建
(function() {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return;
  }
  // 创建 axios 实例 window.axios
  const axiosInstance = window.axios.create({
    baseURL: 'http://localhost:8090/api/noauth',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    // withCredentials: true // 按需开启
  });

  // 可选：添加请求拦截器
  axiosInstance.interceptors.request.use(
    function(reqConfig) {
      reqConfig.method = reqConfig.method?.toLowerCase()
      console.log("SendReq:"+JSON.stringify(reqConfig))
      return reqConfig;
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 可选：添加响应拦截器
  axiosInstance.interceptors.response.use(
    function(response) {
      console.log("RecResult:"+JSON.stringify(response.data))
      const { code, msg, data} = response.data || {};
      // 如果业务状态码为200，返回数据
      if (code === 200) {
        return data !== undefined ? data : response.data;
      } 
      else {
        // 业务状态码非200，返回错误
        console.error('业务错误:', code, msg);
        const error = new Error(msg || '请求失败');
        error.code = code;
        return Promise.reject(error);
      } 
    },
    function(error) {
      // 处理HTTP错误
      console.error('响应错误:', error.message);      
      // 可以根据状态码进行更精细的错误处理
      if (error.response) {
        const { status, data } = error.response;
        console.error(`HTTP错误 ${status}:`, data);        
        const customError = new Error(data?.message || `HTTP错误: ${status}`);
        customError.status = status;
        customError.data = data;
        return Promise.reject(customError);
      } else if (error.request) {
        const networkError = new Error('网络错误: 无法连接到服务器');
        networkError.isNetworkError = true;
        return Promise.reject(networkError);
      } else {
        return Promise.reject(error);
      }
    }
  );
  // 挂载到window对象
  window.api = axiosInstance;
  console.log('samAxios实例已创建并挂载到window.api');
})();