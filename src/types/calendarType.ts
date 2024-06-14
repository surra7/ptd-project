import { Dispatch, SetStateAction } from 'react';

export interface PostType {
  created_at: string;
  d_day: number | null;
  feeling_status: number;
  goal: string | null;
  id: number;
  memo: string | null;
  todo_date: string;
  todo_progress: number;
  updated_at: string;
  user: number;
}

export interface SetOptionsProps {
  startDate: string;
  lastDate: string;
  currentYear: number;
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
}

export interface SelectBoxProps {
  type: string;
  possibleList: number[];
  currentProps: number;
  setCurrentProps: (props: number) => void;
}
