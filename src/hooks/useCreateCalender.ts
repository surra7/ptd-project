// 'yyyy-mm-dd'형식 맞추고 각 달의 1일 위치 정해주기
const getFirstDayOfMonth = (year: number, month: number) => {
  let digit = '';
  if (month < 10) digit = '0';
  return new Date(year + '-' + digit + month + '-' + '01').getDay();
};

const getLastDayOfMonth = (year: number, month: number) => {
  let lastDay = new Date(year, month, 0).getDate();
  return lastDay;
};

const useCreateCalender = (year: number, month: number) => {
  let firstDay = getFirstDayOfMonth(year, month);
  let lastDay = getLastDayOfMonth(year, month);
  let arrCalender = [];
  let newCalender = [];

  // 1일 시작 전에 공백 채우기
  for (let i = 0; i < firstDay; i++) {
    arrCalender.push('');
  }

  // 날짜 넣어주기
  for (let i = 1; i <= lastDay; i++) {
    arrCalender.push(String(i));
  }

  // 마지막 날짜 이후에 공백 채우기
  let remainDay = 7 - (arrCalender.length % 7);
  if (remainDay < 7) {
    for (let i = 0; i < remainDay; i++) {
      arrCalender.push('');
    }
  }

  // 주 단위로 자르기
  for (let i = 0; i < arrCalender.length; i += 7) {
    newCalender.push(arrCalender.slice(i, i + 7));
  }

  return newCalender;
};

export default useCreateCalender;
