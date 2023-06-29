import React, { Dispatch, SetStateAction, useRef } from 'react';
import { OpponentProfile } from '../types/chat';
import useOutsideClick from '../hooks/useOutsideClick';

export default function ProfileImgModal({
  isModalOpen,
  opponentProfile,
  setModalOpen,
}: {
  isModalOpen: boolean;
  opponentProfile: OpponentProfile;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(isModalOpen, modalRef, setModalOpen);

  return isModalOpen ? (
    <div className="outside-modal">
      <div ref={modalRef} className="modal">
        <img src={opponentProfile.photo} alt="상대방 프로필 이미지" />
      </div>
    </div>
  ) : null;
}
