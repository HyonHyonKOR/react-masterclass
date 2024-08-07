import styled, { keyframes } from "styled-components";

function App() {
  const Wrapper = styled.div`
    display: flex;
  `;

  const rotate = keyframes`
0%{
  transform: rotate(0deg);
  background-color: blue;
}
50%{
  transform: rotate(180deg);
  background-color: red;
}
100%{
  transform: rotate(360deg);
  background-color: green;
}
`;

  const Box = styled.div`
    height: 10px;
    width: 10px;
    margin-right: 10px;
    background-color: tomato;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
    animation-delay: ${(props) => props.delay}s;
  `;

  return (
    <Wrapper as="header">
      <Box delay={0.2} />
      <Box delay={0.4} />
      <Box delay={0.6} />
    </Wrapper>
  );
}

export default App;
