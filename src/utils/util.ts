export const setTimeFormat = (time: string) => {
  const newTime = new Date(time);
  let amOrPm = '오전';
  let hour = newTime.getHours();
  const minute = newTime.getMinutes();

  if (hour >= 12) {
    amOrPm = '오후';
    if (hour !== 12) {
      hour -= 12;
    }
  }

  if (hour === 0) {
    hour = 12;
  }

  return `${amOrPm} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};
