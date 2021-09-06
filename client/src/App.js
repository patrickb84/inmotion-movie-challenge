import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/style.scss';

import Home from './views/Home';
import NavBar from './components/NavBar';
import MovieIndex from './views/Movie.Index';
import MovieCreate from './views/Movie.Create';
import MovieDelete from './views/Movie.Delete';
import MovieDetail from './views/Movie.Detail';
import MovieEdit from './views/Movie.Edit';
import HTTPStatus404 from './views/HTTPStatus404';
import HTTPStatus500 from './views/HTTPStatus500';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='mt-5 pt-3 container-fluid'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/movies'>
            <MovieIndex />
          </Route>
          <Route path='/movies/create'>
            <MovieCreate />
          </Route>
          <Route exact path='/movies/:id'>
            <MovieDetail />
          </Route>
          <Route path='/movies/edit/:id'>
            <MovieEdit />
          </Route>
          <Route path='/movies/delete/:id'>
            <MovieDelete />
          </Route>
          <Route path='/error/404' component={HTTPStatus404} />
          <Route path='/error/500' component={HTTPStatus500} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
