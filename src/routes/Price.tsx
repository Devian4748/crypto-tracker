import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 3rem 2rem;
  max-width: 50rem;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`;

const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MainPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;
  font-size: 1.7rem;
  font-weight: 500;

  span {
    &:nth-child(1) {
      color: ${props => props.theme.ftColor};
    }
    &:nth-child(2) {
      color: ${props => props.theme.accentColor};
    }
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    gap: 1.5rem;
    flex-direction: row;
  }
`;

const SubPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;
  font-size: 1.5rem;
  font-weight: 500;

  span {
    &:nth-child(1) {
      color: ${props => props.theme.ftColor};
    }
    &:nth-child(2) {
      color: ${props => props.theme.accentColor};
    }
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    gap: 1.5rem;
    flex-direction: row;
    width: 100%;
    span {
      width: 50%;
      text-align: right;
    }
  }
`;

export interface IPriceParam {
  priceInfo: {
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
  };
}

const Price = () => {
  const { state } = useLocation<IPriceParam>();

  const oneHourAmt = state?.priceInfo?.quotes?.USD?.percent_change_1h ?? 0;
  const oneDayAmt = state?.priceInfo?.quotes?.USD?.percent_change_24h ?? 0;
  const oneWeekAmt = state?.priceInfo?.quotes?.USD?.percent_change_7d ?? 0;
  const oneMonthAmt = state?.priceInfo?.quotes?.USD?.percent_change_30d ?? 0;
  const oneYearAmt = state?.priceInfo?.quotes?.USD?.percent_change_1y ?? 0;

  return (
    <Container>
      <PriceWrapper>
        <MainPrice>
          <span>$ {state?.priceInfo?.quotes?.USD?.price.toFixed(2)}</span>
          <span>{`(${oneDayAmt >= 0 ? '+' : ''}${oneDayAmt}`}%)</span>
        </MainPrice>
        <SubPrice>
          <span>1h</span>
          <span>{`${oneHourAmt >= 0 ? '+' : ''}${oneHourAmt}`}%</span>
        </SubPrice>
        <SubPrice>
          <span>24h</span>
          <span>{`${oneDayAmt >= 0 ? '+' : ''}${oneDayAmt}`}%</span>
        </SubPrice>
        <SubPrice>
          <span>Week</span>
          <span>{`${oneWeekAmt >= 0 ? '+' : ''}${oneWeekAmt}`}%</span>
        </SubPrice>
        <SubPrice>
          <span>Month</span>
          <span>{`${oneMonthAmt >= 0 ? '+' : ''}${oneMonthAmt}`}%</span>
        </SubPrice>
        <SubPrice>
          <span>Year</span>
          <span>{`${oneYearAmt >= 0 ? '+' : ''}${oneYearAmt}`}%</span>
        </SubPrice>
      </PriceWrapper>
    </Container>
  );
};
export default Price;
