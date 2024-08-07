import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          type="text"
          placeholder="username"
          onChange={onchange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
