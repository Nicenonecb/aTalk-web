import React from 'react';
import { Dropdown, ConfigProvider, message } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';


export default function Setting() {
  const items = [
    { label: '设置', key: '1', icon: <SettingOutlined />, onClick: () => message.info('Click on menu item1.') },
    { label: '账户', key: '2', icon: <UserOutlined />, onClick: () => message.info('Click on menu item2.') },
    { label: '退出', key: '3', icon: <LogoutOutlined />, onClick: () => message.info('Click on menu item.3') },
  ];

  return (
    <ConfigProvider theme={{
      token: {
        colorBgElevated: '#00000',
      },
    }}>
      <Dropdown menu={{ items }} placement='top'>
        <p className='p-4 '>yonghu</p>
      </Dropdown>
    </ConfigProvider>
  );
}