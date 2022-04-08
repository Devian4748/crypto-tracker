import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { fetchCoins } from '../api';
import { DarkModeIcon, LightModeIcon } from '../icons';

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

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Coin = styled.li`
  font-size: 2.5rem;
  border-radius: 15px;
  background-color: ${props => props.theme.ftColor};

  a {
    display: flex;
    align-items: center;
    padding: 2rem;
    transition: all 0.2s ease-in;
    color: ${props => props.theme.bgColor};
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 1rem;
`;

const ToggleButton = styled.button<{ isDarkMode: boolean }>`
  border: none;
  border-radius: 25px;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s;
  ${props => {
    if (props.isDarkMode) {
      return css`
        background-color: #000;

        &::after {
          background-color: #fff;
          right: 0;
        }
        svg {
          color: yellow;
        }
      `;
    } else {
      return css`
        background-color: #fff;
        &::after {
          background-color: #000;
          left: 0;
        }
        svg {
          color: orangered;
        }
      `;
    }
  }}

  &::after {
    content: '';
    width: 35px;
    height: 30px;
    position: absolute;
    top: 0;
    border-radius: 50%;
    transition: all 0.3s;
  }
`;

interface ICoins {
  isDarkMode: boolean;
  onToggle: () => void;
}

interface ICoinsList {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = ({ isDarkMode, onToggle }: ICoins) => {
  const { isLoading, data } = useQuery<ICoinsList[]>('allCoins', fetchCoins);

  const onClickThemeModeHandler = () => {
    onToggle();
  };

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <ToggleButton isDarkMode={isDarkMode} onClick={onClickThemeModeHandler}>
          <DarkModeIcon />
          <LightModeIcon />
        </ToggleButton>
      </Header>
      <CoinsList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/crypto-tracker/${coin.id}/chart`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png?rev=10557311`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
};
export default Coins;
