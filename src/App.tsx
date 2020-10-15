import React, { createContext, useState, useEffect } from "react";
import jsonp from "jsonp";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./Pages/Layout";

export type FlickrItem = {
  title: string;
  link: string;
  media: {
    m: string;
  };
  date_taken: string;
  published: string;
  tags: string;
  author: string;
};

export type FlickrFeed = {
  title: string;
  link: string;
  description: string;
  modified: string;
  generator: string;
  items: FlickrItem[];
};

interface IContextState {
  pending: boolean;
  setKeyword: (keyword: string) => void;
  feeds: FlickrItem[];
  keyword: string;
  error: any;
}

export const SearchContext = createContext<IContextState>({
  pending: false,
  setKeyword: (keywords: string) => {},
  feeds: [],
  keyword: "",
  error: undefined,
});

function App() {
  const [pending, setPending] = useState(false);
  const [feeds, setFeeds] = useState<any>([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(undefined);

  const handleSearch = async () => {
    setFeeds([]);
    if (keyword.length > 2) {
      setPending(true);
      await jsonp(
        `https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${keyword}`,
        { name: "jsonFlickrFeed" },
        (error: any, data: FlickrFeed) => {
          if (error) {
            console.log("error:: ", error);
            setError(error);
            setPending(false);
          } else {
            console.log("data:: ", data);
            setFeeds(data.items);
            setPending(false);
          }
        }
      );
    }
  };

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  return (
    <SearchContext.Provider
      value={{
        pending,
        setKeyword,
        error,
        feeds,
        keyword,
      }}
    >
      <Router>
        <Layout />
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
