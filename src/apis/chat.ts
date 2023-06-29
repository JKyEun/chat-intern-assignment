import api from './index';

export const getChat = async () => {
  try {
    const res = await api.get('/test_data');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
