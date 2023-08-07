const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAY = 24 * HOURS;

const formattingTime = (target: number) => {
  const now = Date.now();
  const diff = now - target;

  if (diff < HOURS) {
    return new Date(diff).getMinutes();
  } else if (diff < DAY) {
    return new Date(diff).getHours();
  } else {
    return new Date(diff).getDay();
  }
};
