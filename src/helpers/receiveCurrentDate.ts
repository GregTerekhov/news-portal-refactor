function receiveCurrentDate() {
  const today = new Date();
  const days = today.toDateString().slice(0, 3);
  const month = today.toDateString().slice(4).slice(0, 4);
  const number = today.toDateString().slice(8).slice(0, 2);
  const year = today.toDateString().slice(11);
  const dateNow = `${number} ${month} ${year}`;

  return { days, dateNow };
}

export default receiveCurrentDate;
