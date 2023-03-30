import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import {
  AppBar, Toolbar, IconButton, Button
} from '@mui/material';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to='/blogs'>
          Blogs
        </Button>
        <Button color="inherit" component={Link} to='/users'>
          Users
        </Button>
        {user
          ? (
            <>
              <div>{user.name} logged in</div>
              <Button variant="contained" color="primary" type="button" onClick={() => dispatch(logout())}>
                logout
              </Button>
            </>
          )
          : <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
