import React, { useState } from "react";

export default function AppMentor() {
  interface Person {
    name: string;
    title: string;
    mentor: {
      name: string;
      title: string;
    };
  }

  const [person, setPerson] = useState<Person>({
    name: "엘리",
    title: "개발자",
    mentor: {
      name: "밥",
      title: "시니어개발자",
    },
  });
  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>
        {person.name}의 멘토는 {person.mentor.name}
      </p>
      <button
        onClick={() => {
          const name = prompt(`what's your mentor's name`);
          if (name !== null)
            setPerson((person) => ({
              ...person,
              mentor: { ...person.mentor, name },
            }));
        }}
      >
        멘토 이름 바꾸기
      </button>
      <button
        onClick={() => {
          const title = prompt(`what's your mentor's title`);
          if (title !== null)
            setPerson((person) => ({
              ...person,
              mentor: { ...person.mentor, title },
            }));
        }}
      >
        멘토 타이틀 바꾸기
      </button>
    </div>
  );
}
