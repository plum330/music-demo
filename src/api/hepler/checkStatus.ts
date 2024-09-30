import Taro from "@tarojs/taro";

// 检查状态码
export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			Taro.showToast({
        title: "请求失败！请您稍后重试",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 401:
      Taro.showToast({
        title: "登录失效！请您重新登录",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 403:
      Taro.showToast({
        title: "当前账号无权限访问！",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 404:
      Taro.showToast({
        title: "你所访问的资源不存在！",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 405:
      Taro.showToast({
        title: "请求方式错误！请您稍后重试",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 408:
      Taro.showToast({
        title: "请求超时！请您稍后重试",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 500:
      Taro.showToast({
        title: "服务异常！",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 502:
      Taro.showToast({
        title: "网关错误！",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 503:
      Taro.showToast({
        title: "服务不可用！",
        icon: 'error',
        duration: 1000,
      })
			break;
		case 504:
      Taro.showToast({
        title: "网关超时！",
        icon: 'error',
        duration: 1000,
      })
			break;
		default:
      Taro.showToast({
        title: "请求失败！",
        icon: 'error',
        duration: 1000,
      })
	}
};
