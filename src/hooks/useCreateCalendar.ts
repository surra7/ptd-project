// 'yyyy-mm-dd'형식 맞추고 각 달의 1일 위치 정해주기
function getFirstDayOfMonth(year: number, month: number) {
  let digit = '';
  if (month < 10) digit = '0';
  return new Date(year + '-' + digit + month + '-' + '01').getDay();
}

function getLastDayOfMonth(year: number, month: number) {
  let lastDay = new Date(year, month, 0).getDate();
  return lastDay;
}

export default function useCreateCalendar(year: number, month: number) {
  let firstDay = getFirstDayOfMonth(year, month);
  let lastDay = getLastDayOfMonth(year, month);
  let arrCalendar = [];
  let newCalendar = [];

  // 1일 시작 전에 공백 채우기
  for (let i = 0; i < firstDay; i++) {
    arrCalendar.push('');
  }

  // 날짜 넣어주기
  for (let i = 1; i <= lastDay; i++) {
    arrCalendar.push(String(i));
  }

  // 마지막 날짜 이후에 공백 채우기
  let remainDay = 7 - (arrCalendar.length % 7);
  if (remainDay < 7) {
    for (let i = 0; i < remainDay; i++) {
      arrCalendar.push('');
    }
  }

  // 주 단위로 자르기
  for (let i = 0; i < arrCalendar.length; i += 7) {
    newCalendar.push(arrCalendar.slice(i, i + 7));
  }

  return newCalendar;
}
