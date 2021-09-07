import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand='md'>
      <LinkContainer to='/'>
        <Navbar.Brand>Movie Library</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='navbar-collapse' />
      <Navbar.Collapse id='navbar-collapse'>
        <Nav className='ms-auto ml-auto'>
          <LinkContainer to='/' exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/movies'>
            <Nav.Link>Movies</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/genres'>
            <Nav.Link>Genres</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/actors'>
            <Nav.Link>Actors</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
