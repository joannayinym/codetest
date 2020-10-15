import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles= makeStyles(()=>({
  backgroundStyle: {
    minHeight: 600,
    background: "repeating-linear-gradient(rgba(0, 0, 0, 0) 7px, rgb(34, 34, 34) 9px, rgb(17, 17, 17) 13px, rgba(0, 0, 0, 0) 13px) rgb(34, 34, 34)",
  }
}));

export default () => {
  const classes = useStyles();
  return <div className={classes.backgroundStyle}></div>;
};
