const formatTime = (time: number) => {
  const hours: number = Math.floor(time / 3600);
  const minutes: number | string = Math.floor((time - hours * 3600) / 60);
  const seconds: number | string = time - hours * 3600 - minutes * 60;

  const hoursStr: string = hours < 10 ? '0' + hours : String(hours);
  const minutesStr: string = minutes < 10 ? '0' + minutes : String(minutes);
  const secondStr: string = seconds < 10 ? '0' + seconds : String(seconds);

  return `${hoursStr}:${minutesStr}:${secondStr}`;
};

export { formatTime };
