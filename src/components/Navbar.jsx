import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Avatar from '@mui/material/Avatar';
import { logout } from '../redux/slice/userSlice';
import { profileLogout } from '../redux/slice/profileSlice';

const Header = () => {
  const user = useSelector((state) => state?.user?.currentUser?.user);
  const dispatch = useDispatch();

  const history = useNavigate();

  const logoutPro = () => {
    dispatch(logout());
    dispatch(profileLogout());
    localStorage.removeItem('Authorization');
    history('/login');
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className='header'>
      <div className='root'>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}>
            <Avatar style={{ backgroundColor: '#1976D2' }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}>
                <Paper elevation={3} sx={{ marginRight: '16pxx' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}>
                      <MenuItem>{user?.name}</MenuItem>
                      <MenuItem onClick={() => logoutPro()}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
};

export default Header;
