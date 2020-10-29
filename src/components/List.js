import React from "react";
import { nanoid } from "nanoid";
export default function List(props) {
  const { newsList } = props;
  const { currentAPI } = props;
  const { keyword } = props;
  if (!newsList || newsList.length === 0)
    return <h4 className="newsTitle">Sorry, No News Available...</h4>;
  let searchedNews = <div></div>;
  const popularNews = (
    
    <ul>
      <h1>Most Popular News</h1>
      {newsList.map((news) => {
        let imgUrl =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png";
        try {
          if (news.media !== undefined) {
            if (news.media[0].subtype === "photo") {
              imgUrl = news.media[0]["media-metadata"][2].url;
            }
          }
        } catch (e) {
        
        }
        return (
          <li key={news.abstract} className="newsItem">
            <p className="newsSection">{news.section}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsLink"
            >
              <h4 className="newsTitle">{news.title} </h4>
            </a>
            <p className="newsAbstract">{news.abstract}</p>
            <p className="newsPublished">{news.published_date}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsLink"
            >
              <img src={imgUrl} alt="news" className="newsImg" />
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
  if (currentAPI === "search") {
    searchedNews = (
      <ul>
        <h3>News related to "{keyword}"</h3>
        {newsList.map((news) => {
          return (
            <li key={"news-" + nanoid()} className="newsItem">
              <p className="newsSection">{news.type_of_material}</p>
              <p className="newsPublished">{news.pub_date}</p>

              <p className="newsAbstract">{news.abstract}</p>
              <a
                href={news.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="newsLink"
              >
                <h4 className="newsTitle">&gt; See full content </h4>
              </a>
              <div className="newsDetails">
                <p className="newsSource">Source: {news.source}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  return currentAPI === "search" ? searchedNews : popularNews;
}
