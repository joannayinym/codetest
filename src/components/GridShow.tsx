import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme, Button,Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FlickrItem, SearchContext } from "../App";
import MagniferDialog from "./MagniferDialog";

const useStyles = makeStyles((theme: Theme) => ({
  gridWrapper: {
    position: "relative",
    width: "100%",
    height: "0px",
    paddingBottom: "100%",
    zIndex: 2,
  },
  topLayer: {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    zIndex: 9,
    bottom: 0,
    left: 0,
    width: "calc(100% - 20px)",
    height: "auto",
    padding: "10px",
    overflow: "hidden",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "opacity 0.2s ease-in-out 0s",
    "&>button": {
      color: "rgb(100, 181, 246)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: "12px",
      fontWeight: 700,
    },
    "&>p": {
      color: "rgb(100, 181, 246)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: "12px",
      fontWeight: 700,
    },
    "&>a": {
      color: "rgb(100, 181, 246)",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: "12px",
      fontWeight: 700,
      textDecoration: "none",
    },
    "&>a:visited": { color: "rgb(100, 181, 246)", textDecoration: "none" },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      "&>button>span": {
        transform: "scale(1.2)",
        transitionDuration: "500ms",
        transitionProperty: "transform",
      },
    },
  },
  tagButton: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    "& > button": {
      margin: "2px",
      padding: "2px 4px",
      fontSize: "0.65em",
      minWidth: "50px",
    },
    "& > button a": {
      textDecoration: "none",
      color: "rgb(0, 0, 0)",
    },
  },
  magniferButton: {
    display: "initial",
    "& > button": {
      margin: "2px",
      padding: "2px 4px",
      fontSize: "0.65em",
      minWidth: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  },
  dateStyle: {
    color: "white",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: "12px",
    fontWeight: 700,
  },
}));
interface IProps {
  value: FlickrItem;
 
}
const GridShow = (props: IProps) => {
  const [showPicture, setShowPicture] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const { setKeyword } = useContext(SearchContext);
  const { title, link, media, published, tags } = props.value;
  const classes = useStyles();

  const clickHandler = () => {
    setShowPicture(!showPicture);
  };

  const searchHandler = (tag: string) => {
    setKeyword(tag);
  };

  const magniferHandler = () => {
    setShowBackDrop(true);
  };
  const closeHandler = () => {
    setShowBackDrop(false);
  };
  return (
    <div
      className={classes.gridWrapper}
      style={{ background: `url(${media.m}) center center/cover no-repeat` }}      
    >
      <div className={classes.magniferButton}>
        <Button 
          variant="contained"
          color="default"
          onClick={magniferHandler}
        >magnifer
        </Button>
      </div>
    {showBackDrop ? <MagniferDialog img={media.m.replace("_m.", "_b.")} onClose={closeHandler} /> : null}
    <div className={classes.topLayer}>
        {showPicture ? (
          <>
            <Typography>{title.split(" ")[0]}</Typography>
            <Typography variant="inherit" className={classes.dateStyle}>
              {new Date(published).toDateString()}
            </Typography>
            <div className={classes.tagButton}>
              {tags
                .split(" ")
                .slice(0, 10)
                .map((tag, index) => (
                  <Button
                    variant="contained"
                    key={index}
                    color="default"
                    onClick={() => searchHandler(tag)}
                    >
                    <Link to={`/search/${tag}`}>
                      {tag}
                    </Link>
                  </Button>

                ))}
                </div>
              <a href={link} target="_blank">
                Full Size Image
              </a>
              
          </>
        ) : null}
        <Button color="primary" onClick={clickHandler}>
          {showPicture ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default GridShow;
