export type ChatLog = {
  created_at: string;
  id: number;
  msg: {
    content: string;
    mtype: string;
  };
  photo_url: string;
  user_id: number;
  user_name: string;
};

export type OpponentProfile = { photo: string; userName: string };
