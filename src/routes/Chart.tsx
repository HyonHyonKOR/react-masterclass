import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinPriceFlow } from "./api";
import ReactApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

interface ICoinId {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["priceFlow", coinId],
    queryFn: () => fetchCoinPriceFlow(coinId),
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "sales",
              data:
                Array.isArray(data) && data.length > 0
                  ? data?.map((price) => Number(price.close))
                  : [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories:
                Array.isArray(data) && data.length > 0
                  ? data?.map((price) =>
                      new Date(price.time_close * 1000).toUTCString()
                    )
                  : [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#61dbfb"], stops: [0, 100] },
            },
            colors: ["green"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
