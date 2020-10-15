import React, {useState, useContext, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from "react-router";

import { SearchContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    fontSize: "1.3em",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchWapper: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif,',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: "100%",
    background: "repeating-linear-gradient(rgba(0, 0, 0, 0) 7px, rgb(34, 34, 34) 9px, rgb(17, 17, 17) 13px, rgba(0, 0, 0, 0) 13px) rgb(34, 34, 34)",
    alignContent: "center",
  },
  title: {
    fontSize: "2em",
    lineHeight: "1em",
    margin: 0,
    textShadow: "rgb(33, 150, 243) 0px 0px 5px, rgb(33, 150, 243) 0px 0px 15px, rgb(33, 150, 243) 0px 0px 20px, rgb(33, 150, 243) 0px 0px 40px, rgb(63, 81, 181) 0px 0px 60px, rgb(156, 39, 176) 0px 0px 10px, rgb(63, 81, 181) 0px 0px 98px",
    color: "rgb(240, 242, 253)",
    fontWeight: 300,
    fontFamily:" Monoton, cursive",
    textAlign: "center",
    width: "100%",
    marginBottom: 20,
  },
  searchInput: {
    height: "auto",
    backgroundColor: "white",
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    borderRadius:"5px",
    [theme.breakpoints.down("xs")]: {
      width: "96%",
    },
  }
}));

const Search = (props:any)=> {
  const classes = useStyles();
  const { setKeyword } = useContext(SearchContext);
  const [input, setInput] = useState("");
  const inputEl = useRef(null);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const clearInput = () => {
    setInput("");
    console.log("inputEl.current:", inputEl.current);
    inputEl.current.focus();
  };
  const searchHandler = (e:React.FormEvent<HTMLFormElement>) => {
    setKeyword(input);
    props.history.push(`/search/${input}`);
    e.preventDefault();
  };

  return (
    <div className={classes.searchWapper}>
      <div className={classes.title}>
        Joanna's Code Test
      </div>
      <form onSubmit={searchHandler}>
      <div className={classes.searchInput}>
        <IconButton  type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          inputRef={inputEl}
          className={classes.input}
          placeholder="Input Keyword to Search"
          inputProps={{ 'aria-label': 'Input Keyword to Search' }}
          value={input}
          onChange={(e) => changeHandler(e)}
          autoFocus={true}
        />
        <IconButton className={classes.iconButton} aria-label="search" onClick={clearInput}>
          <ClearIcon />
        </IconButton>
        </div>
        </form>
    </div>
  )
} ;

export default withRouter(Search);