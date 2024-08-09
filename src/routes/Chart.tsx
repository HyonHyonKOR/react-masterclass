import { useParams } from "react-router-dom";

const Chart = () => {
  const data = useParams();
  console.log(data);
  return <h1>Chart</h1>;
};
export default Chart;
