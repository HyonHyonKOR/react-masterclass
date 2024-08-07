import styled from "styled-components";

function App() {
  const Father = styled.div`
    display: flex;
  `;

  const Box = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
  `;

  const Circle = styled(Box)`
    border-radius: 50%;
  `;

  return (
    <Father>
      <Circle bgColor="tomato"></Circle>
      <Box bgColor="whitesmoke"></Box>
    </Father>
  );
}

export default App;
