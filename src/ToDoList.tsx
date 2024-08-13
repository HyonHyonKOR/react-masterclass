import React, { useState } from "react";
import { useForm } from "react-hook-form";

// const ToDoList = () => {
//   const [toDo, setTodo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { value },
//     } = event;
//     setToDoError("");
//     setTodo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={toDo} onChange={onChange} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// };

interface FormData {
  [key: string]: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("you need to input id", {
            required: true,
            minLength: {
              value: 5,
              message: "your id is too short",
            },
          })}
        />
        <input {...register("pw1", { required: true })} />
        <input {...register("pw2", { required: true })} />
        <input
          {...register("email", {
            required: "you need to input email",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("mobile", { required: true })} />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
