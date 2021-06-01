/*eslint-disable*/
import React,{useState,useEffect} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login-page'
  }

  return (
    <List className={classes.list}>
      
      <ListItem className={classes.listItem}>
        <Button
          href="/profile"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} />{" "} Profil
        </Button>
        <Button
          //href="/profile"
          color="transparent"
          onClick={logout}
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} />{" "} Çıkıs
        </Button>
      </ListItem>
      
        
      
     
    </List>
  );
}
