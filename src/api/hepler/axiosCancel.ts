// 存储请求标识对应的取消函数

import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";

let pendingMap = new Map<string, Canceler>();

// 构建请求对应的唯一标识(字符串拼接)
const getPendingUrl = (config: AxiosRequestConfig) => {
    return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')
}

export class AxiosCanceler {
    // 删除取消前一次相同请求
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url);
            // 存在cancel并执行
            cancel && cancel();
            // 从内存中删除
            pendingMap.delete(url);
        }
    }
    addPending(config: AxiosRequestConfig) {
        // 检查&取消相同请求
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken = config.cancelToken ||
        new axios.CancelToken(cancel => {
            if (!pendingMap.has(url)) {
                pendingMap.set(url, cancel);
            }
        });
    }

    removeAllPending() {
        pendingMap.clear()
    }

    reset(): void {
        pendingMap = new Map<string, Canceler>();
    }
}