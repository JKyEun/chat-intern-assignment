import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import '../style/chatPage.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useQuery } from 'react-query';
import { getChat } from '../apis/chat';
import Loading from '../components/Loading';
import { ChatLog } from '../types/chat';
import EachMessage from '../components/EachMessage';
import useOutsideClick from '../hooks/useOutsideClick';

export default function ChatPage() {
  const { data, isLoading } = useQuery('chat', getChat);
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);
  const opponent = data?.find((el: ChatLog) => el.user_id === 2);
  const opponentProfile: { photo: string; userName: string } = opponent
    ? {
        photo: opponent.photo_url,
        userName: opponent.user_name,
      }
    : { photo: '', userName: '' };
  const [inputData, setInputData] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(isModalOpen, modalRef, setModalOpen);

  const onImgClick = () => {
    setModalOpen(true);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const onMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputData === '') return;

    const newMessage = {
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
    setChatLog(cur => [...cur, newMessage]);
    setInputData('');
  };

  useEffect(() => {
    const sortedById = data?.sort((a: ChatLog, b: ChatLog) => Number(new Date(a.id)) - Number(new Date(b.id)));
    const sortedChatLog = sortedById?.sort(
      (a: ChatLog, b: ChatLog) => Number(new Date(a.created_at)) - Number(new Date(b.created_at))
    );
    const filteredChatLog = sortedChatLog?.filter((el: ChatLog) => el.msg.mtype === 'text');
    setChatLog(filteredChatLog);
  }, [data]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = contentRef.current?.scrollHeight;
  }, [chatLog]);

  if (isLoading) return <Loading />;

  return (
    <div className="chat-page">
      <div className="chat">
        <div className="header">
          <div className="back">
            <ChevronLeftIcon />
          </div>
          <div className="opponent">
            <div onClick={onImgClick}>
              <img src={opponentProfile.photo} alt="상대방 프로필 이미지" />
            </div>
            <span>{opponentProfile.userName}</span>
          </div>
          <div className="filler"> </div>
        </div>
        <div ref={contentRef} className="content">
          {chatLog?.map(el => (
            <EachMessage
              key={el.id}
              id={el.id}
              userId={el.user_id}
              photoUrl={el.photo_url}
              userName={el.user_name}
              content={el.msg.content}
              createdAt={el.created_at}
              onImgClick={onImgClick}
            />
          ))}
        </div>
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
        {isModalOpen && (
          <div className="outside-modal">
            <div ref={modalRef} className="modal">
              <img src={opponentProfile.photo} alt="상대방 프로필 이미지" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
