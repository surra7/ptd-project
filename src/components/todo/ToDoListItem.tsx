import { TodoType } from '@/app/todolist/page';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdCheckbox } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

interface Props {
  todo: TodoType;
  openModal(index: number): void;
  handleComplete(index: number): void;
  isModalOpen?: boolean;
  modalIndex?: number;
}

function ToDoListItem({ todo, openModal, handleComplete, isModalOpen, modalIndex }: Props) {
  return (
    <>
      <div className="flex items-center" >
        <label
          className="flex w-full h-[2.625rem] items-center py-[0.765rem] pl-[0.765rem]"
          onClick={() => handleComplete(todo.id)}>
          {todo.checked ? (
            <IoMdCheckbox className="text-primary-400 w-[1.25rem] h-[1.25rem] z-[1]" />
          ) : (
            <MdCheckBoxOutlineBlank className="w-[1.25rem] h-[1.25rem] z-[1]" />
          )}
          <span className="flex w-full h-auto pl-[1.5rem] items-center justify-between">
            <p className={`${todo.checked ? 'text-black-200' : 'text-black-900'} font-medium`}>{todo.text}</p>
          </span>
        </label>
        <BsThreeDots
          className={`w-[50px] text-primary- ${modalIndex === todo.id && isModalOpen ? 'text-primary-400' : 'text-black-200'} text-[1.25rem] px-[0.625rem] cursor-pointer`}
          onClick={() => openModal(todo.id)}
        />
      </div>
    </>
  );
}

export default ToDoListItem;
