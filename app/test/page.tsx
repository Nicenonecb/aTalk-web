'use client';
import { useOpenAISTT } from '@lobehub/tts/react';
import { Icon, StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { Button, Input } from 'antd';
import { Mic, StopCircle } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

// import { OPENAI_BASE_URL } from '@/core/const/api';

export default function Test() {
  const api: any =
    {
      OPENAI_API_KEY: {
        label: 'OPENAI_API_KEY',
        value: 'sk-rwQ9gJHBE988E149123eT3BLBKFJ07c441Fb11914E3c8af1',
      },
      OPENAI_PROXY_URL: {
        label: 'OPENAI_PROXY_URL',
        value: 'https://apic.ohmygpt.com/',
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

  return (
    // <StoryBook levaStore={store}>
    <Flexbox gap={8}>
      {isRecording ? (
        <Button block icon={<Icon icon={StopCircle} />} onClick={stop}>
          Stop {formattedTime}
        </Button>
      ) : isLoading ? (
        <Button block loading>
          Recognition...
        </Button>
      ) : (
        <Button block icon={<Icon icon={Mic} />} onClick={start} type={'primary'}>
          Recognition
        </Button>
      )}
      <Input.TextArea placeholder={'Recognition result...'} value={text} />
      {url && <audio controls src={url} />}
    </Flexbox>
    // </StoryBook>
  );
};