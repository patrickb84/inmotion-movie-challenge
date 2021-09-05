import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/style.scss';

import Movies from './views/Movies';
import Home from './views/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='mt-5 pt-3 container-fluid'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/movies'>
            <Movies />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
