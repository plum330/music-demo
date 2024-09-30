import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosCanceler } from "@/api/hepler/axiosCancel";
import Taro from "@tarojs/taro";
import { checkStatus } from "@/api/hepler/checkStatus";
import { ResultData } from "@/api/interface";
import mpAdapter from "axios-miniprogram-adapter";

const axiosCanceler = new AxiosCanceler();

type config = {
    baseURL: string,
    timeout: number, // 10s
    withCredentials: boolean // 跨域时允许携带凭证
}

class RequestHttp {
    cfg: config;
    service: AxiosInstance;
    // 类构造函数
    public constructor(c: config = {
      baseURL: "http://localhost:3000",
      timeout: 0,
      withCredentials: false,
    }) {
      // 默认配置
      this.cfg = {
        baseURL: c.baseURL ? c.baseURL : '',
        timeout: c.timeout ? c.timeout : 10000,
        withCredentials: c.withCredentials ? c.withCredentials : true,
      }
      // axios适配器兼容小程序(TypeError: adapter is not a function)
      axios.defaults.adapter = mpAdapter;
      // 实例化
      this.service = axios.create(this.cfg);
      // 请求拦截器(请求中间件)
      this.service.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          // 保存请求，防止重复请求
          axiosCanceler.addPending(config);
          return {
            ...config,
            // headers: {
            //   ...config.headers,
            // }
          };
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        }
      );

      // 响应拦截器(响应中间件)
      this.service.interceptors.response.use(
        (response: AxiosResponse) => {
          const {data, config} = response;
          // 请求结束，删除请求
          axiosCanceler.removePending(config);
          if (data.code && data.code !== 200) {
            Taro.showToast({
              title: data.msg,
              icon: 'error',
              duration: 1000,
            })
            return Promise.reject(data);
          }
            return data;
        },
        async (error: AxiosError) => {
          const {response} = error;
          if (error.message.indexOf('timeout') !== -1) {
            Taro.showToast({
              title: "请求超时，稍后重试",
              icon: 'error',
              duration: 1000,
            })
          }
          if (response) checkStatus(response.status);
            return Promise.reject(error)
        }
     );
   }

    // 常用请求方法封装

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, {params, ..._object});
  }

  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}

	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

const http = new RequestHttp();
export default http;
