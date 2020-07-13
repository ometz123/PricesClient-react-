import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import LoyaltyTwoToneIcon from '@material-ui/icons/LoyaltyTwoTone';
import Red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { useState } from 'react';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function FCMenu() {

  const { user, SetUser } = useContext(UserContext);
  const classes = useStyles();
  const [chatOpen, setChatOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false)

  const [state, setState] = useState({
    //top: false,
    left: false,
    //bottom: false,
    //right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleChat = () => {
  }
  const handleFavorites = () => {

  }
  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem >
          <ListItemIcon ><PersonOutlineTwoToneIcon color="primary" /></ListItemIcon>
          <ListItemText
            primary={<>{user.firstName}&nbsp;{user.lastName}</>}
            secondary={<>{user.rank}<StarTwoToneIcon fontSize="small" htmlColor="#fcaf17" /></>}
          />
        </ListItem>
        <Divider />

        <ListItem button disabled>
          <ListItemIcon onClick={handleChat}><ChatTwoToneIcon htmlColor={green[700]} /></ListItemIcon>
          <ListItemText primary={"Chats"} />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon onClick={handleFavorites}><LoyaltyTwoToneIcon htmlColor={Red['A700']} /></ListItemIcon>
          <ListItemText primary={"Favorites"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button  onClick={() => SetUser({ loggedIn: false })}>
          <ListItemIcon><MeetingRoomIcon htmlColor="black" /></ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment >
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer('left', true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          //anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>




    // <div>
    //   {['left'].map(anchor => (
    //     <React.Fragment key={anchor}>
    //       <Button onClick={toggleDrawer(anchor, true)}><MenuIcon/></Button>
    //       <SwipeableDrawer
    //         anchor={anchor}
    //         open={state[anchor]}
    //         onClose={toggleDrawer(anchor, false)}
    //         onOpen={toggleDrawer(anchor, true)}
    //       >
    //         {list(anchor)}
    //       </SwipeableDrawer>
    //     </React.Fragment>
    //   ))}
    // </div>
  );
}
