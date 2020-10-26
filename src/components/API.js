import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import withListLoading from "./ListLoading";

export default function API(props) {
  const apiKey = "eFUXYJoZlOUOjJ3aelzNqy4uAeZPM13W";
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    newsList: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${apiKey}`;
    axios.get(apiUrl).then((news) => {
      const allNews = news.data.results;
      console.log(allNews[0].media[0]["media-metadata"][2].url);
      setAppState({ loading: false, newsList: allNews });
    });
  }, [setAppState]);
  return (
    <div>
      <ListLoading isLoading={appState.loading} newsList={appState.newsList} />
    </div>
  );
}
