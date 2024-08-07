import styled from "styled-components";

function App() {
  const Father = styled.div`
    display: flex;
  `;

  const Input = styled.input.attrs({ required: true })`
    background-color: tomato;
  `;

  return (
    <Father as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
