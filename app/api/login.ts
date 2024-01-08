import fetcherAPI from '@/app/api/index';


const userApi = {
  login: async (data) => {
    return await fetcherAPI.post('/v1/login', data);
  },
  register: async (data) => {
    return await fetcherAPI.post('/v1/register', data);
  },

};


export default userApi;