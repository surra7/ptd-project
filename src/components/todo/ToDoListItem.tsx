import { TodoType } from '@/app/todolist/page';
import { BsThreeDots } from 'react-icons/bs';

interface Props {
  todos: TodoType[];
  openModal(index: number): void;
}

function ToDoListItem({ todos, openModal }: Props) {
  return (
    <>
      {todos.map(todo => (
        <div className="flex items-center" key={todo.id}>
          <label className="flex w-full h-[2.625rem] items-center py-[0.765rem] pl-[0.765rem]">
            <input type="checkbox" name="잠자기" value={1} className="w-[1.25rem] h-[1.25rem] z-10" />
            <span className="flex w-full h-auto pl-[1.5rem] items-center justify-between">
              <p className="text-Gray  font-medium">{todo.text}</p>
            </span>
          </label>
          <BsThreeDots
            className="w-[50px] text-borderGray text-[1.25rem] px-[0.625rem] cursor-pointer"
            onClick={() => openModal(todo.id)}
          />
        </div>
      ))}
    </>
  );
}

export default ToDoListItem;
