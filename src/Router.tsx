import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouter {
  isDarkMode: boolean;
  onToggle: () => void;
}

const Router = ({ isDarkMode, onToggle }: IRouter) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/crypto-tracker/:coinId'>
          <Coin />
        </Route>
        <Route path='/crypto-tracker/'>
          <Coins isDarkMode={isDarkMode} onToggle={onToggle} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
