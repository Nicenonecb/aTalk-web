'use client';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoginAPI from '@/app/api/login';


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
export default function Login() {
  const [shouldFetch, setShouldFetch] = useState(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    const res = await LoginAPI.login(values);
    if (res.code === 200) {
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      router.push('/');
    }
  };
  return (
    <div className='h-screen w-full flex justify-center items-center '>
      <section className='flex  flex-col items-center justify-center h-[120px] '>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='账户名/邮箱'
            name='username'
            rules={[{ required: true, message: '请输入!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name='remember'
            valuePropName='checked'
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='flex '>
            <Button type='primary' htmlType='submit'>
              登陆
            </Button>

            <Button type='text' onClick={() => router.push('/register')}> 没有账户？请注册</Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}