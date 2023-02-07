import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { Avatar, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme)=>{return{
  nav: {
    // backgroundColor: "#0AB8B7",
    backgroundColor: "#2A5D84",
  },
  avatar: {
    // backgroundColor: "#8db3c4",
    backgroundColor: "black",
    color: "black",
    width: theme.spacing(40)
  },
  avspace: {
    flexGrow: "1",
  },
  space: {
    height: '4rem',
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}});

const Navbar = (props) => {
  const navitems = props.navitem;
  const classes = useStyles();
  return (
    <div className={classes.space}>
      <AppBar className={classes.nav} elevation={0} height='100px'>
        <ToolBar>
          <div className={classes.avspace}>
            <Avatar className={classes.avatar} variant="square">
              <Link to="/" className={classes.link}>Hospital Managment System</Link>
            </Avatar>
          </div>

          {navitems.map((oitem) => {
            let { item, link, id } = oitem;
            return (
              <>
                <NavItem key={id} item={item} link={link} />
              </>
            );
          })}
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default Navbar;
