import { OpenAITTS, OpenAITTSPayload } from '@lobehub/tts';

export default function ttsFunc(input) {
  // 初始化 TTS 实例
  const tts = new OpenAITTS({
    OPENAI_API_KEY: 'sk-rwQ9gJHBE988E149123eT3BLBKFJ07c441Fb11914E3c8af1',
    OPENAI_PROXY_URL: 'https://apic.ohmygpt.com/v1/',
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
      console.log(URL.createObjectURL(audioBlob));
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