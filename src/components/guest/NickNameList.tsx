import { useRouter } from 'next/navigation';

export default function NickNameList() {
  const router = useRouter();
  const nickNames = [
    {
      nickName: '닉네임1',
      userId: '1',
    },
    {
      nickName: '닉네임2',
      userId: '2',
    },
    {
      nickName: '닉네임3',
      userId: '3',
    },
    {
      nickName: '닉네임4',
      userId: '4',
    },
    {
      nickName: '닉네임5',
      userId: '5',
    },
    {
      nickName: '닉네임6',
      userId: '6',
    },
    {
      nickName: '닉네임7',
      userId: '7',
    },
    {
      nickName: '닉네임8',
      userId: '8',
    },
    {
      nickName: '닉네임9',
      userId: '9',
    },
    {
      nickName: '닉네임10',
      userId: '10',
    },
    {
      nickName: '닉네임11',
      userId: '11',
    },
    {
      nickName: '닉네임12',
      userId: '12',
    },
  ];

  return (
    <ul className="w-full h-[31.25rem] border-b border-black-200 overflow-auto scroll-bar">
      {nickNames.map((nickName, index) => {
        return (
          <li
            onClick={() => router.push(`/guest/friends/${nickName.userId}`)}
            key={index}
            className="h-[3.6875rem] border-b-[0.5px] border-black-200 text-lg flex items-center pl-[0.8125rem] cursor-pointer active:bg-primary-200 active:text-white">
            {nickName.nickName}
          </li>
        );
      })}
    </ul>
  );
}
