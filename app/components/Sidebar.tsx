'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { message, Tooltip, Form } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import useLogin from '@/util/useLogin';
import Session_Modal from '@/app/components/Session_Modal';
import Setting from '@/app/components/Setting';
import sessionApi from '@/app/api/session';


const SessionLink = ({ item, isActive, onDelete }) => (
  <div className='flex justify-between items-center text-base'>
    <Link href={`/session/${item.ID}`} key={item.ID} className={`p-2 rounded-lg ${isActive ? 'bg-gray-700' : ''}`}>
      {item.Scene}
    </Link>
    <DeleteOutlined className='cursor-pointer' onClick={() => onDelete(item.ID)} />
  </div>

);

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useLogin();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {

    let isMounted = true; // 标记组件是否挂载

    getSessionsList().then(r => {
      if (isMounted) {
        console.log(r);
        setSessionList(r || []); // 防止r为null或undefined
      }
    });

    // 清理函数
    return () => {
      isMounted = false; // 组件卸载时更新标记
    };
  }, []);

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
    const { data, code } = await sessionApi.createSession(values);
    if (code === 200) {
      message.success('创建成功');
    }
    router.push(`/session/${data.ID}`);
    closeCreateSessionModal(); // 关闭模态框
  };
  const deleteSession = async (id) => {
    const { code } = await sessionApi.deleteSession(id);
    if (code === 200) {
      message.success('删除成功');
      const { data, code } = await sessionApi.getSession();
      if (code === 200) {
        setSessionList(data);
      }
    }
  };
  const getSessionsList = async () => {
    const { data, code } = await sessionApi.getSession();
    if (code === 200) {
      return data;
    }
  };

  if (isLoggedIn) {
    return (
      <section>
        <div className='h-full w-[250px] bg-gray-800 text-white flex flex-col justify-between '>
          <div>
            <div className='flex items-center  justify-between p-5 text-lg'>
              <div className='bg-gray-800 cursor-pointer  text-white ' onClick={() => router.push('/')}>aTalk</div>
              <Tooltip title='创建新对话' placement='right' arrow={false}>
                <PlusSquareOutlined className='cursor-pointer  ' onClick={openCreateSessionModal} />
              </Tooltip>

            </div>
            <Session_Modal open={isModalVisible}
                           onFinish={handleFormFinish}
                           onCancel={closeCreateSessionModal}
                           form={form} />

            <nav className='flex flex-col p-4'>
              {/* 导航项 */}
              {sessionList.length > 0 ? (
                sessionList.map((item) => (
                  <SessionLink
                    key={item.ID}
                    item={item}
                    isActive={pathname === `/session/${item.id}`}
                    onDelete={deleteSession}
                  />
                ))
              ) : (
                <p>No sessions available.</p> // 提供空状态的反馈
              )}
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
