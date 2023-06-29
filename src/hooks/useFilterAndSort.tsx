import { Dispatch, SetStateAction, useEffect } from 'react';
import { ChatLog } from '../types/chat';

export default function useFilterAndSort(data: ChatLog[], setChatLog: Dispatch<SetStateAction<ChatLog[]>>) {
  useEffect(() => {
    const sortedById = data?.sort((a: ChatLog, b: ChatLog) => Number(new Date(a.id)) - Number(new Date(b.id)));
    const sortedChatLog = sortedById?.sort(
      (a: ChatLog, b: ChatLog) => Number(new Date(a.created_at)) - Number(new Date(b.created_at))
    );
    const filteredChatLog = sortedChatLog?.filter((el: ChatLog) => el.msg.mtype === 'text');
    setChatLog(filteredChatLog);
  }, [data]);
}
