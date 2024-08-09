import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
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
  const [coinInfo, setCoinInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const coinDataList = await (
        await fetch(`https://api.coinpaprika.com/v1/coins`)
      ).json();
      const priceDataList = await (
        await fetch(
          `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
        )
      ).json();
      const coinData: InfoData = coinDataList
        .slice(0, 100)
        .find((item: InfoData) => (item.id = `${coinId}`));
      setCoinInfo(coinData);

      console.log(priceDataList);
      const priceData: PriceData = priceDataList[0];
      console.log(priceData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
      {loading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Type:</span>
              <span>{coinInfo?.type}</span>
            </OverviewItem>
          </Overview>
          <Description>
            {state?.name} is a {coinInfo?.type}.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Impedit fugit maxime, culpa unde sint
            delectus quo enim veniam magnam amet commodi dicta sunt cum
            excepturi dolore, est nam, ab nulla? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Atque, unde beatae sed assumenda autem
            ratione omnis. Voluptatum, eos quaerat veniam consectetur aliquam
            amet aliquid nesciunt, placeat nobis voluptates inventore autem!
          </Description>
          <Overview>
            <OverviewItem>
              <span>Max Price:</span>
              <span>{priceInfo?.high}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Low Price:</span>
              <span>{priceInfo?.low}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <Outlet />
    </Container>
  );
};
export default Coin;
