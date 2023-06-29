import React from 'react';
import { setTimeFormat } from '../utils/util';

export default function EachMessage({
  id,
  userId,
  photoUrl,
  userName,
  content,
  createdAt,
  onImgClick,
}: {
  id: number;
  userId: number;
  photoUrl: string;
  userName: string;
  content: string;
  createdAt: string;
  onImgClick: () => void;
}) {
  return (
    <div key={id} className={userId === 1 ? 'message opponent' : 'message'}>
      <div onClick={onImgClick} className="profile-img">
        <img src={photoUrl} alt="프로필 사진" />
      </div>
      <div className="right-side">
        <div className="name">{userName}</div>
        <div className="message-box">
          {content.split('\\n').map((contentEl, idx) => (
            <div key={contentEl + idx.toString()}>{contentEl}</div>
          ))}
        </div>
      </div>
      <div className="time">
        <div>{setTimeFormat(createdAt)}</div>
      </div>
    </div>
  );
}
