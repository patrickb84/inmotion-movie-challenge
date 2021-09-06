import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/style.scss';

import Home from './views/Home';
import NavBar from './components/NavBar';

import MovieIndex from './views/Movie/Index';
import MovieCreate from './views/Movie/Create';
import MovieDelete from './views/Movie/Delete';
import MovieDetail from './views/Movie/Detail';
import MovieEdit from './views/Movie/Edit';

import GenreIndex from './views/Genre/Index';
import GenreCreate from './views/Genre/Create';
import GenreDelete from './views/Genre/Delete';
import GenreDetail from './views/Genre/Detail';
import GenreEdit from './views/Genre/Edit';

import ActorIndex from './views/Actor/Index';
import ActorCreate from './views/Actor/Create';
import ActorDelete from './views/Actor/Delete';
import ActorDetail from './views/Actor/Detail';
import ActorEdit from './views/Actor/Edit';

import HTTPStatus404 from './views/HTTPStatus404';
import HTTPStatus500 from './views/HTTPStatus500';

function App() {
  return (
    <Router>
      <NavBar />

      <div className='mt-5 pt-3'>
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
          <Route path='/movies/edit/:id'>
            <MovieEdit />
          </Route>
          <Route path='/movies/delete/:id'>
            <MovieDelete />
          </Route>
          <Route path='/movie/:id'>
            <MovieDetail />
          </Route>

          <Route exact path='/genres'>
            <GenreIndex />
          </Route>
          <Route path='/genres/create'>
            <GenreCreate />
          </Route>
          <Route path='/genres/edit/:id'>
            <GenreEdit />
          </Route>
          <Route path='/genres/delete/:id'>
            <GenreDelete />
          </Route>
          <Route path='/genre/:id'>
            <GenreDetail />
          </Route>

          <Route exact path='/actors'>
            <ActorIndex />
          </Route>
          <Route path='/actors/create'>
            <ActorCreate />
          </Route>
          <Route path='/actors/edit/:id'>
            <ActorEdit />
          </Route>
          <Route path='/actors/delete/:id'>
            <ActorDelete />
          </Route>
          <Route path='/actor/:id'>
            <ActorDetail />
          </Route>

          <Route path='/error/404' component={HTTPStatus404} />
          <Route path='/error/500' component={HTTPStatus500} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
