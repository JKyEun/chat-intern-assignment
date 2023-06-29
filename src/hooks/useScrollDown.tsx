import { RefObject, useEffect } from 'react';
import { ChatLog } from '../types/chat';

export default function useScrollDown(ref: RefObject<HTMLDivElement>, chatLog: ChatLog[]) {
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current?.scrollHeight;
  }, [chatLog]);
}
