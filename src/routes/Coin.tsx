import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { BackIcon } from '../icons';
import Chart from './Chart';
import Price from './Price';

const Title = styled.h1`
  flex: 1 0 auto;
  text-align: center;
  font-size: 5rem;
  font-weight: 500;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  font-size: 2rem;
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 50rem;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span {
    font-size: 1.5rem;
  }
`;
const Description = styled.p`
  margin: 2rem 0;
  font-size: 1.7rem;
  line-height: 1.5;
`;

const Tabs = styled.div`
  margin: 2.5rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const Tab = styled.span<{ isActive: boolean }>`
  font-size: 1.2rem;
  text-transform: uppercase;
  text-align: center;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
  color: ${props =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    color: ${props =>
      props.isActive ? props.theme.accentColor : props.theme.bgColor};

    padding: 0.7rem 0;
    display: block;
  }
`;

const BackButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 35px;
    height: 35px;
  }
`;
interface RouterParams {
  coinId: string;
}

interface RouterState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams<RouterParams>();
  const { state } = useLocation<RouterState>();
  const priceMatch = useRouteMatch('/crypto-tracker/:coinId/price');
  const chartMatch = useRouteMatch('/crypto-tracker/:coinId/chart');
  const history = useHistory();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const isLoading = infoLoading || tickersLoading;

  const onClickBackHandler = () => {
    history.goBack();
  };
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? 'Loading..' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackButton onClick={onClickBackHandler}>
          <BackIcon />
        </BackButton>
        <Title>
          {state?.name ? state.name : isLoading ? 'Loading..' : infoData?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{`$ ${tickersData?.quotes.USD.price.toFixed(4)}`}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/crypto-tracker/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/crypto-tracker/${coinId}/price`,
                  state: { priceInfo: tickersData },
                }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/crypto-tracker/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/crypto-tracker/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};
export default Coin;
