function receiveCurrentTime() {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  return { hours, minutes };
}

export default receiveCurrentTime;
