'use client';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, SoundOutlined, TranslationOutlined } from '@ant-design/icons';
import sessionApi from '@/app/api/session';
import ttsFunc from '@/util/ttsFunc';
import { Button } from 'antd';
import { Mic, StopCircle } from 'lucide-react';
import { useOpenAISTT } from '@lobehub/tts/react';
import gptApi from '@/app/api/gpt';
import { OPENAI_API_KEY, OPENAI_API_URL } from '@/util/const';

// import { OPENAI_API_ENDPOINT }
interface SessionContent {
  type: string;
  content: string;
  url?: any;
  isRealtime?: boolean;
}

export default function Sessions({ params }: { params: { id: string } }) {

  const [ttsAudioUrl, setTtsAudioUrl] = useState(null);
  const [sessionContentList, setSessionContentList] = useState([] as SessionContent[]);
  const [ttsText, setTtsText] = useState('');
  // 后面改成从后端获取
  const [language, setLanguage] = useState('en-US');
  const [isTranscriptionComplete, setIsTranscriptionComplete] = useState(false);
  //
  // console.log(OPENAI_API_KEY, OPENAI_API_URL);
  const api: any =
    {
      OPENAI_API_KEY: {
        label: 'OPENAI_API_KEY',
        value: OPENAI_API_KEY,
      },
      OPENAI_PROXY_URL: {
        label: 'OPENAI_PROXY_URL',
        value: process.env.OPENAI_API_URL,
      },
      serviceUrl: '',
    };

  const { locale }: any =
    {
      locale: 'en-US',
    };

  const { text, start, stop, isLoading, isRecording, url, formattedTime } = useOpenAISTT(locale, {
    api,
  });


  useEffect(() => {

    if (!isRecording && text && isTranscriptionComplete && url) {
      console.log(url, 'url');
      setSessionContentList(prevList => {
        const newList = prevList.map(item => {
          if (item.isRealtime) {
            return { ...item, isRealtime: false, url: url }; // 将实时条目转换为常规条目
          }
          return item;
        });
        return newList;
      });
      getGPtRes().then();
      setIsTranscriptionComplete(false);
    }
  }, [isRecording, text, isTranscriptionComplete, isLoading, url]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getFistGPTRes(params.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().then();
  }, [params.id]);
  const getGPtRes = async () => {
    const { data, code } = await gptApi.getGpt({ content: text });
    const gptResUrl = await ttsFunc(data.content);
    if (code === 200) {
      const gptItem = {
        type: 'tutor',
        content: data.content,
        url: gptResUrl,
      };

      setSessionContentList(prevList => [...prevList, gptItem]);
      setTtsText(data.content);
      setTtsAudioUrl(gptResUrl);
    }
  };

// 第一次反馈播放
  useEffect(() => {
    if (ttsAudioUrl) {
      const audio = new Audio(ttsAudioUrl);
      audio.play().catch(error => console.error('Audio play failed', error));
    }
  }, [ttsAudioUrl]);

  //
  // //生成语音文件的url
  // useEffect(() => {
  //   if (ttsText) {
  //     const fetchTTS = async () => {
  //       try {
  //         const audioUrl: Promise<string | null> | '' = await ttsFunc(ttsText);
  //         setTtsAudioUrl(audioUrl);
  //       } catch (error) {
  //         console.error('Error in TTS:', error);
  //       }
  //     };
  //
  //     fetchTTS().then();
  //   }
  // }, [ttsText]);
  const getFistGPTRes = async (id) => {
    const { data, code } = await sessionApi.getSessionDetailById(id);
    if (code === 200) {
      const gptResUrl: Promise<string | null> | '' = await ttsFunc(data.content);
      const gptItem = {
        type: 'tutor',
        content: data.content,
        url: gptResUrl,
      };
      setTtsAudioUrl(gptResUrl);
      setSessionContentList([gptItem]);
      setTtsText(data.content);
    }
  };


  useEffect(() => {
    if (isRecording) {
      setSessionContentList(prevList => {
        const newList = [...prevList];
        const realtimeIndex = newList.findIndex(item => item.isRealtime);
        if (realtimeIndex !== -1) {
          newList[realtimeIndex] = { ...newList[realtimeIndex], content: text } as SessionContent;
        }
        return newList;
      });
    }
  }, [text, isRecording]);

  const handleStop = () => {
    stop(); // 调用原始的 stop 方法
    setIsTranscriptionComplete(true);
  };

  const handleStart = () => {
    start();
    setSessionContentList(prevList => [
      ...prevList,
      { type: 'stu', content: '', isRealtime: true }, // 添加实时 STT 条目
    ]);
  };


  const playAudio = (value) => {
    console.log(OPENAI_API_KEY, OPENAI_API_URL);
    if (value) {
      const audio = new Audio(value);
      audio.play().catch(error => console.error(' play failed', error));
    } else {
      console.error('Invalid audio URL:', value);
    }
  };
  //
  return (

    <div className='bg-black h-screen w-full p-4 text-white flex flex-col justify-between'>
      {/* 聊天气泡 */}
      <div className='space-y-2 flex flex-col gap-5 overflow-auto'>
        {sessionContentList.map((item, index) => (
          <div className={`flex items
-center ${item.type === 'tutor' ? 'justify-start' : 'justify-end'} space-x-2`} key={index}>
            <div className='w-[800px] rounded-lg border border-gray-600 p-4'>
              <p>{item.content}</p>
              <div className='flex gap-5 text-base'>
                <SoundOutlined onClick={() => playAudio(item.url)} />
                <TranslationOutlined />
                <HeartOutlined />
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* 录音控制按钮 */}
      <div className='flex items-center'>
        <div className='flex-1 rounded p-2 bg-gray-800'>
          {isRecording ? (
            <Button block icon={<StopCircle />} onClick={handleStop}>
              Stop {formattedTime}
            </Button>
          ) : isLoading ? (
            <Button block loading>
              Recognition...
            </Button>
          ) : (
            <Button block icon={<Mic />} onClick={handleStart} type='primary'>
              Recognition
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}