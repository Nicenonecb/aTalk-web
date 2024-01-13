import fetcherAPI from '@/app/api/index';


interface Gpt {

}

const gptApi = {
  getGpt: async (data) => {
    return await fetcherAPI.post('/v1/gpt-res', data);
  },
};

export default gptApi;