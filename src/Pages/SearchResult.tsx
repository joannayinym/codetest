import React, { useContext } from "react";
// import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { SearchContext } from "../App";
import GridShow from "../components/GridShow";
import BackDrop from "../components/BackDrop";

const useStyles = makeStyles((theme: Theme) => ({
  resultWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  grid: {
    [theme.breakpoints.down("lg")]: {
      width: "23%",
    },
    [theme.breakpoints.down("md")]: {
      width: "31%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "48%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    width: "23%",
    padding: "1%",
  },
}));
interface IProps {}

export default (props: IProps) => {
  const { feeds } = useContext(SearchContext);
  const classes = useStyles();
  // let location = useLocation();
  // const params = location.pathname
  //   ? location.pathname.replace("/search/", "")
  //   : "cat";
  // setKeyword(params);

  return (
    <div className={classes.resultWrapper}>
      {feeds.map((feed, index) => (
        <div className={classes.grid} key={index}>
          <GridShow value={feed} />
        </div>
      ))}
    </div>
  );
};
