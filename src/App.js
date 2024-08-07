import styled, { keyframes } from "styled-components";

function App() {
  const Wrapper = styled.div`
    display: flex;
  `;

  const rotate = keyframes`
0%{
  transform: rotate(0deg);
  border-radius: 0px;
}
50%{
  transform: rotate(180deg);
  border-radius: 100px;
}
100%{
  transform: rotate(360deg);
  border-radius: 0px;
}
`;

  const Emoji = styled.span`
    font-size: 36px;
  `;

  const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotate} 1s linear infinite;
    ${Emoji} {
      font-size: 36px;
      transition: all 1s ease-in;
      &:hover {
        font-size: 80px;
      }
      &:active {
        opacity: 0;
      }
    }
  `;

  return (
    <Wrapper as="header">
      <Box>
        <Emoji as="a">😉</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
