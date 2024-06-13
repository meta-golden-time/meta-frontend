import { MONTHS, DAYS } from './DateConstants.jsx';

const date = new Date();

export function getWeekDays() {
  const dayInAWeek = new Date().getDay();
  const days = DAYS.slice(dayInAWeek, DAYS.length).concat(
    DAYS.slice(0, dayInAWeek)
  );
  return days;
}

export function getDayMonthFromDate() {
  const month = MONTHS[date.getMonth()].slice(0, 3);
  const day = date.getUTCDate();

  return day + ' ' + month;
}

export function transformDateFormat() {
  const date = new Date();
  const options = {
    timeZone: 'Asia/Seoul', // 한국 시간대 설정
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  };
  
  // 한국 시간대로 변환된 날짜와 시간 문자열 생성
  const year = date.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Seoul' });
  const month = date.toLocaleString('en-US', { month: '2-digit', timeZone: 'Asia/Seoul' });
  const day = date.toLocaleString('en-US', { day: '2-digit', timeZone: 'Asia/Seoul' });
  const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZone: 'Asia/Seoul' });
  
  const newFormatDate = `${year}-${month}-${day} ${time}`;
  return newFormatDate;
}

export function getUTCDatetime() {
  const date = new Date();
  const kstTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Seoul', // 한국 시간대 설정
  });

  const kstDateString = date.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul', // 한국 시간대 설정
  });

  const kstDate = kstDateString.concat(' ', kstTime);
  return kstDate;
}

export function getUTCTime() {
  const utcTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });

  return utcTime;
}
