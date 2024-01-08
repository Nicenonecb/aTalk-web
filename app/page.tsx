'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Col, Row } from 'antd';

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

  const startRecording = async () => {
    try {
      // 获取用户媒体设备权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // 创建一个MediaRecorder实例
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      // 收集音频数据
      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // 当录音停止时，将音频数据转换成可播放的音频URL
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = []; // 清空chunks
      };

      // 开始录音
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('录音功能出错：', error);
    }
  };

  // 停止录音
  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <>
      <div className='bg-[#343540]' w-full h-full>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? '停止录音' : '开始录音'}
        </button>
        {audioURL && <audio src={audioURL} controls />}

      </div>

    </>
  );
}
