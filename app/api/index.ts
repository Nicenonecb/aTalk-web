import qs from 'qs';


import { useRouter } from 'next/navigation';

/**
 * @param {string} url - 请求的 URL
 * @param {object} [options] - 可选的 fetch 参数
 * @returns {Promise} - 返回一个处理响应的 Promise
 */


function fetcher(url, options = {}) {
  // const router = useRouter();
  const token = localStorage.getItem('token');
  // 设置默认的 fetch 选项
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },

    ...options,
  };
  //如果是本地开发环境，添加前缀
  if (process.env.NODE_ENV === 'development') {
    url = `http://127.0.0.1:8080${url}`;
  }

  // 根据请求类型处理 URL 和 Body
  if (options.method === 'GET' && options.body) {
    url = `${url}?${qs.stringify(options.body)}`;
  } else if (options.method === 'POST' && options.body) {
    defaultOptions.body = JSON.stringify(options.body);
  }

  // 发起 fetch 请求
  return fetch(url, defaultOptions)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        return data;
      } else if (data.code === 401) {
        window.location.href = '/login';
        throw new Error(data.message);
      }
    })
    .catch(error => {
      throw error;
    });
}

// 创建特定的 GET 和 POST 方法
const fetcherAPI = {
  get(url, data) {
    return fetcher(url, { method: 'GET', body: data });
  },
  post(url, data) {
    return fetcher(url, { method: 'POST', body: data });
  },
  delete(url, data) {
    return fetcher(url, { method: 'DELETE', body: data });
  },
  put(url, data) {
    return fetcher(url, { method: 'PUT', body: data });
  },
};

export default fetcherAPI;

