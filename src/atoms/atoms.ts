import { SelectedUser } from '@/types/guestBookType';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface User {
  id: number;
  계정: string;
  닉네임: string;
}

// export const nicknameAtom = atom('nick');
export const nicknameAtom = atomWithStorage('nick', 'nick');
// export const userAtom = atom<User | null>(null);
export const userAtom = atomWithStorage<User | null>('user', null);
// export const accessTokenAtom = atom<string | null>(null);
export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);
// export const refreshTokenAtom = atom<string | null>(null);
export const refreshTokenAtom = atomWithStorage<string | null>('refreshToken', null);
// export const csrfTokenAtom = atom<string | null>(null);
export const csrfTokenAtom = atomWithStorage<string | null>('csrfToken', null);

export const selectedUserAtom = atomWithStorage<SelectedUser | null>('selectedUser', null);
