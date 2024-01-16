import { OpenAITTS, OpenAITTSPayload } from '@lobehub/tts';
import { OPENAI_API_KEY, OPENAI_API_URL } from '@/util/const';

export default function ttsFunc(input) {
  // 初始化 TTS 实例
  const tts = new OpenAITTS({
    OPENAI_API_KEY: OPENAI_API_KEY,
    OPENAI_PROXY_URL: OPENAI_API_URL + 'v1/',
  });
  const fetchTTS = async () => {
    try {
      const payload: OpenAITTSPayload = {
        input: input,
        options: {
          model: 'tts-1',
          voice: 'alloy',
        },
      };

      const response = await tts.create(payload);
      const audioBlob = new Blob([await response.arrayBuffer()], { type: 'audio/mp3' });
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      return null;
    }
  };

  if (input) {
    return fetchTTS().then();
  }
  return '';
}