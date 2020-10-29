import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import withListLoading from "./ListLoading";
import NesSearchForm from "./NewsSearchForm";
import { MdToday, MdSearch } from "react-icons/md";
export default function API() {
  const apiKey = "eFUXYJoZlOUOjJ3aelzNqy4uAeZPM13W";
  const ListLoading = withListLoading(List);
  const [currentAPI, setCurrentAPI] = useState("popular");
  const [popularIconColor, setPopularIconColor] = useState("rgb(182, 130, 61)");
  const [searchIconColor, setSearchIconColor] = useState("");
  const [keyword, setKeyword] = useState("");
  const [appState, setAppState] = useState({
    loading: false,
    newsList: null,
  });
  const [apiUrl, setApiUrl] = useState(
    `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${apiKey}`
  );

  useEffect(() => {
    setAppState({ loading: true });
    axios.get(apiUrl).then((news) => {
      let allNews = news.data.results;
      if (currentAPI === "search") {
        allNews = news.data.response.docs;
      }
      setAppState({ loading: false, newsList: allNews });
    });
  }, [apiUrl, currentAPI]);
  function searchNews(filter) {
    setCurrentAPI("search");
    setKeyword(filter);
    if(!filter.replace(/\s/g, '').length){
       showPopularNews()
    }
    setApiUrl(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${filter}&api-key=${apiKey}`
    );
    setPopularIconColor("");
    setSearchIconColor("rgb(182, 130, 61)");
  }
  function showPopularNews() {
    setCurrentAPI("popular");
    setApiUrl(
      `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${apiKey}`
    );
    setPopularIconColor("rgb(182, 130, 61)");
    setSearchIconColor("");
  }

  return (
    <div>
      <NesSearchForm searchNews={searchNews} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flexEnd",
        }}
      >
        <MdToday
          style={{
            margin: 20,
            display: "flex",
            height: "100%",
            fontSize: 50,
            paddingLeft: 5,
            color: popularIconColor,
          }}
          onClick={() => showPopularNews()}
        />
        <MdSearch
          style={{
            margin: 20,
            display: "flex",
            height: "100%",
            fontSize: 50,
            paddingLeft: 5,
            color: searchIconColor,
          }}
          onClick={() => searchNews("")}
        />
      </div>

      <ListLoading
        currentAPI={currentAPI}
        keyword={keyword}
        isLoading={appState.loading}
        newsList={appState.newsList}
      />
    </div>
  );
}
