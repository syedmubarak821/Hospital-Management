import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const useStyle = makeStyles({
  itemstyle: {
    marginRight: "24px",
    textDecoration:' none',
    color: 'white',
    fontSize: '15px'
  },
});

const NavItem = (prop) => {
  const classes = useStyle();
  return (
    <div>
      <Link to={prop.link} className={classes.itemstyle}>{prop.item}</Link>
    </div>
  );
};

export default NavItem;
