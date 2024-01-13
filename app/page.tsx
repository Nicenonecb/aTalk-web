'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Col, Row, Button } from 'antd';
import { TranslationOutlined, SoundOutlined, HeartOutlined } from '@ant-design/icons';

export default function Home() {
  const [login, setLogin] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const audioChunksRef = useRef([]);

  const router = useRouter();

  useEffect(() => {
    checkToken();

  }, []);

  //检查ls中是否有token
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
    } else {
      router.push('/login');
    }
  };


  return (
    <>

      <div className='bg-black min-h-screen w-full  p-4 text-white flex flex-col justify-between'>
        {/* 聊天气泡 */}
        <div className='space-y-2 flex flex-col gap-5'>
          {/* 接收的消息 */}
          <div className='flex items-center space-x-2 '>
            <div className='w-[800px] rounded-lg border border-gray-600 p-4'>
              <p>Hello, welcome to the Facebook front-end developer interview. Can you briefly introduce yourself?</p>
              <div className='flex gap-5 text-base'>
                <SoundOutlined />
                <TranslationOutlined />


                <HeartOutlined />
              </div>

            </div>
          </div>
          {/* 发送的消息 */}
          <div className='flex items-center justify-end space-x-2'>
            <div className='w-[800px] rounded-lg border border-gray-600 p-4'>
              <p>Hi, my name is Elidi. I have been working as a front-end developer for 3 years and have experience in
                HTML, CSS, and JavaScript.</p>
            </div>
            {/*<div className='rounded-full bg-gray-600 p-2'>*/}
            {/*  /!* 这里可以放置用户头像 *!/*/}
            {/*</div>*/}
          </div>
        </div>


        <div className='flex items-center'>
          <input
            type='text'
            placeholder='Type your message...'
            className='flex-1 rounded p-2 bg-gray-800'
          />
          <button className='ml-2 rounded bg-yellow-500 p-2'>
            <svg className='w-6 h-6 text-black' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                 viewBox='0 0 24 24' stroke='currentColor'>
              <path d='M5 13l4 4L19 7'></path>
            </svg>
          </button>
        </div>
      </div>


    </>
  );
}
