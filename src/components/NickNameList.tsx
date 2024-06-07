export default function NickNameList() {
  const nickNames = [
    '닉네임 1',
    '닉네임 2',
    '닉네임 3',
    '닉네임 4',
    '닉네임 5',
    '닉네임 6',
    '닉네임 7',
    '닉네임 8',
    '닉네임 9',
    '닉네임 10',
    '닉네임 11',
    '닉네임 12',
  ];

  return (
    <ul className="w-full h-[31.25rem] border-b border-black-200 overflow-auto scroll-bar">
      {nickNames.map((nickName, index) => {
        return (
          <li
            key={index}
            className="h-[3.6875rem] border-b-[0.5px] border-black-200 text-lg flex items-center pl-[0.8125rem] cursor-pointer active:bg-primary-200 active:text-white">
            {nickName}
          </li>
        );
      })}
    </ul>
  );
}
