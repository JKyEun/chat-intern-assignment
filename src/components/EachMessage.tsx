import React, { MouseEvent } from 'react';
import { setDayFormat, setTimeFormat } from '../utils/util';

export default function EachMessage({
  id,
  userId,
  photoUrl,
  userName,
  content,
  createdAt,
  isFirst,
  onImgClick,
}: {
  id: number;
  userId: number;
  photoUrl: string;
  userName: string;
  content: string;
  createdAt: string;
  isFirst: boolean;
  onImgClick: () => void;
}) {
  const copyMessage = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const parentTarget = target.parentElement;
    try {
      await navigator.clipboard.writeText(parentTarget!.innerText);
      alert('메세지가 클립보드에 복사되었습니다');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isFirst && (
        <div className="today">
          <span>{setDayFormat(createdAt)}</span>
        </div>
      )}
      <div key={id} className={userId === 1 ? 'message opponent' : 'message'}>
        <div onClick={onImgClick} className="profile-img">
          <img src={photoUrl} alt="프로필 사진" />
        </div>
        <div className="right-side">
          <div className="name">{userName}</div>
          <div onClick={copyMessage} className="message-box">
            {content.split('\\n').map((contentEl, idx) => (
              <div key={contentEl + idx.toString()}>{contentEl}</div>
            ))}
          </div>
        </div>
        <div className="time">
          <div>{setTimeFormat(createdAt)}</div>
        </div>
      </div>
    </>
  );
}
