'use client';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input } from 'antd';
import userApi from '@/app/api/login';


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
};

interface ApiResponse {
  code: number;
  data: {
    token: string;
  };
  message: string;
}

export default function Register() {

  const router = useRouter();
  const onFinish = async (values: FieldType) => {
    // setShouldFetch(true);
    const res: ApiResponse = await userApi.register(values);
    if (res.code === 200) {
      localStorage.setItem('token', res.data.token);
      router.push('/');
    }
  };
  return (
    <div className='h-screen w-full flex justify-center items-center '>

      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
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


        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='flex '>
          <Button type='primary' htmlType='submit'>
            注册
          </Button>


        </Form.Item>
      </Form>
    </div>
  );

}