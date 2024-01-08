import { useState, useEffect } from 'react';

// 一个自定义Hook来检查用户是否登录
function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}

export default useLogin;
