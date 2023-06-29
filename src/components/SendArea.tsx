import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ChatLog } from '../types/chat';

export default function SendArea({ setChatLog }: { setChatLog: Dispatch<SetStateAction<ChatLog[]>> }) {
  const [inputData, setInputData] = useState<string>('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const onMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputData === '') return;

    const newMessage: ChatLog = {
      created_at: new Date().toString(),
      id: +new Date(),
      user_id: 1,
      user_name: '소개녀',
      photo_url: '',
      msg: {
        mtype: 'text',
        content: inputData,
      },
    };
    setChatLog((cur: ChatLog[]) => [...cur, newMessage]);
    setInputData('');
  };

  return (
    <div className="send-area">
      <div className="plus-btn">
        <AddIcon color="action" />
      </div>
      <form onSubmit={onMessageSubmit} className="send-form">
        <input
          onChange={onInputChange}
          value={inputData}
          className="send-input"
          placeholder="메세지를 입력해주세요"
          type="text"
        />
        {inputData.length > 0 && (
          <button type="submit" className="send-btn">
            <ArrowUpwardIcon color="inherit" />
          </button>
        )}
      </form>
    </div>
  );
}
