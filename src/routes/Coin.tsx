import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 0;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface PriceData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Coin = () => {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as RouteState;
  const [coinInfo, setCoinInfo] = useState<InfoData[]>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const coinData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins`)
      ).json();
      const priceData = await (
        await fetch(
          `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
        )
      ).json();
      setCoinInfo(coinData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
      {loading ? <Loader>"Loading..."</Loader> : null}
    </Container>
  );
};
export default Coin;
