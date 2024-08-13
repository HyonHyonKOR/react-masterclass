import { IToDo } from "./atoms";

const ToDo = ({ text, category }: IToDo) => {
  return (
    <li>
      {text}
      {category !== "DOING" && <button>Doing</button>}
      {category !== "TO_DO" && <button>To Do</button>}
      {category !== "DONE" && <button>Done</button>}
    </li>
  );
};
export default ToDo;
