import React from "react";

export default function List(props) {
  const { newsList } = props;
  if (!newsList || newsList.length === 0)
    return <p>Sorry, No News Available...</p>;
  return (
    <ul>
      <h2>Most Popular News</h2>
      {newsList.map((news) => {
        return (
          <li key={news.id} className="newsItem">
            <p className="newsSection">{news.section}</p>
            <a href={news.url} target="_blank" className="newsLink">
              <h3 className="newsTitle">{news.title} </h3>
            </a>
            <p className="newsPublished">{news.published_date}</p>
            <p className="newsAbstract">{news.abstract}</p>
            <a href={news.url} target="_blank" className="newsLink">
              <img src={news.media[0]["media-metadata"][2].url} alt="news" />
            </a>
            <div className="newsDetails">
              <p className="newsUpdated">Last Updated: {news.updated}</p>
              <p className="newsSource">Source: {news.source}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
