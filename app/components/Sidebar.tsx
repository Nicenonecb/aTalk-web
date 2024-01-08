'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Dropdown, ConfigProvider, message, Tooltip, Form } from 'antd';
import { SettingOutlined, LogoutOutlined, UserOutlined, PlusSquareOutlined } from '@ant-design/icons';
import useLogin from '@/util/useLogin';
import Session_Modal from '@/app/components/Session_Modal';
import Setting from '@/app/components/Setting';
import sessionApi from '@/app/api/session';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = useLogin();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 打开对话框的函数
  const openCreateSessionModal = () => {
    setIsModalVisible(true);
  };

  // 关闭对话框的函数
  const closeCreateSessionModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormFinish = async (values) => {
    // 处理表单数据
    console.log(values);
    const { data, code } = await sessionApi.createSession(values);
    if (code === 200) {
      message.success('创建成功');
      console.log(data, '1');
      // router.push(`/session/${data.id}`);

    }
    closeCreateSessionModal(); // 关闭模态框
  };


  if (isLoggedIn) {
    return (
      <section>


        <div className='h-full w-[250px] bg-gray-800 text-white flex flex-col justify-between '>


          <div>
            <div className='flex items-center  justify-between p-5'>
              <div className='bg-gray-800 cursor-pointer  text-white'>aTalk</div>
              <Tooltip title='创建新对话' placement='right' arrow={false}>
                <PlusSquareOutlined className='cursor-pointer' onClick={openCreateSessionModal} />
              </Tooltip>

            </div>
            <Session_Modal open={isModalVisible}
                           onFinish={handleFormFinish}
                           onCancel={closeCreateSessionModal}
                           form={form} />


            <nav className='flex flex-col p-4'>
              {/* 导航项 */}
              <Link href='/' className={`p-2 ${pathname === '/' ? 'bg-gray-700' : ''}`}>
                首页
              </Link>
              <Link href='/login' className={`p-2 ${pathname === '/login' ? 'bg-gray-700' : ''}`}>
                词汇
              </Link>
              <Link href='/contact' className={`p-2 ${pathname === '/contact' ? 'bg-gray-700' : ''}`}>
                学习计划
              </Link>

            </nav>
          </div>

          <Setting></Setting>


        </div>
      </section>
    );
  } else {
    return null;
  }
}
