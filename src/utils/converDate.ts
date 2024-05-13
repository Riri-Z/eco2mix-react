export function timeStampTotimeStampPlusTwo(timeStamp: number) {
  const date = new Date(timeStamp);
  date.setHours(date.getHours() + 2);

  return date.getTime();
}
