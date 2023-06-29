import React, { useRef, useState } from 'react';
import '../style/chatPage.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useQuery } from 'react-query';
import { getChat } from '../apis/chat';
import Loading from '../components/Loading';
import { ChatLog, OpponentProfile } from '../types/chat';
import EachMessage from '../components/EachMessage';
import useFilterAndSort from '../hooks/useFilterAndSort';
import useScrollDown from '../hooks/useScrollDown';
import SendArea from '../components/SendArea';
import ProfileImgModal from '../components/ProfileImgModal';

export default function ChatPage() {
  const { data, isLoading } = useQuery('chat', getChat);
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);
  const opponent: ChatLog = data?.find((el: ChatLog) => el.user_id === 2);
  const opponentProfile: OpponentProfile = opponent
    ? {
        photo: opponent.photo_url,
        userName: opponent.user_name,
      }
    : { photo: '', userName: '' };
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  let prevDate = 0;

  const onImgClick = () => {
    setModalOpen(true);
  };

  useFilterAndSort(data, setChatLog);
  useScrollDown(contentRef, chatLog);

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
        </div>
        <div ref={contentRef} className="content">
          {chatLog?.map(el => {
            const curDate = new Date(el.created_at).getDate();
            const isFirst = curDate !== prevDate;
            prevDate = curDate;
            return (
              <EachMessage
                key={el.id}
                id={el.id}
                userId={el.user_id}
                photoUrl={el.photo_url}
                userName={el.user_name}
                content={el.msg.content}
                createdAt={el.created_at}
                isFirst={isFirst}
                onImgClick={onImgClick}
              />
            );
          })}
        </div>
        <SendArea setChatLog={setChatLog} />
        <ProfileImgModal isModalOpen={isModalOpen} opponentProfile={opponentProfile} setModalOpen={setModalOpen} />
      </div>
    </div>
  );
}
