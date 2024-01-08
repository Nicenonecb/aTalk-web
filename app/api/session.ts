import fetcherAPI from '@/app/api/index';


interface Session {
  Name: string;
  Language: string;
  Scene: string;

}

const sessionApi = {
  getSession: async () => {
    return await fetcherAPI.get('/v1/sessions', null);
  },
  createSession: async (data: Session) => {
    return await fetcherAPI.post('/v1/sessions', data);
  },

};


export default sessionApi;