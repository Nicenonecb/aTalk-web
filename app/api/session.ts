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

  //删除
  deleteSession: async (id: string) => {
    return await fetcherAPI.delete(`/v1/sessions/${id}`, null);
  },
};


export default sessionApi;