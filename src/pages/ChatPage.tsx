import React from 'react';
import '../style/chatPage.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ChatPage() {
  return (
    <div className="chat-page">
      <div className="chat">
        <div className="header">
          <div className="back">
            <ChevronLeftIcon />
          </div>
          <div className="opponent">
            <div>이미지</div>
            <span>주선자</span>
          </div>
          <div className="filler"> </div>
        </div>
        <div className="content">
          <div className="message">
            <div className="profile-img"></div>
            <div>
              <div className="name"></div>
              <div className="message-box"></div>
            </div>
            <div className="time">오후 3:25</div>
          </div>
        </div>
        <div className="send-area">
          <div className="plus-btn">
            <AddIcon color="action" />
          </div>
          <form className="send-form">
            <input className="send-input" type="text" />
            <button type="submit" className="send-btn">
              <ArrowUpwardIcon color="inherit" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
